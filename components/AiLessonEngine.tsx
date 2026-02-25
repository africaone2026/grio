'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AiEngineState, AiResponse, SessionMode } from '@/lib/types';
import {
  generateLessonIntro,
  generateExplanation,
  generateExample,
  generateQuestion,
  evaluateAnswer,
  generateRevisionPoints,
  generateFollowUpResponse,
  generateSocraticHint,
} from '@/lib/api';
import { useSpeech } from '@/hooks/useSpeech';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import type { AvatarState } from '@/components/AnimatedAvatar';

interface AiLessonEngineProps {
  subject: string;
  topic: string;
  mode: SessionMode;
  isPaused: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onComplete: (score?: number, totalQuestions?: number) => void;
}

interface QuizState {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  responses: AiResponse[];
  selectedAnswer: number | null;
  showingFeedback: boolean;
}

const QUIZ_TOTAL = 3;
const REVISION_TOTAL = 3;

function getGlowColor(type: string | undefined): string {
  switch (type) {
    case 'example':
      return 'blue';
    case 'question':
      return 'amber';
    case 'feedback':
    case 'completed':
    case 'score':
      return 'emerald';
    default:
      return 'teal';
  }
}

function getResponseLabel(type: string): string {
  switch (type) {
    case 'intro': return 'Lesson Introduction';
    case 'explanation': return 'Explanation';
    case 'example': return 'Worked Example';
    case 'question': return 'Practice Question';
    case 'feedback': return 'Feedback';
    case 'score': return 'Results';
    case 'revision': return 'Key Points';
    case 'completed': return 'Session Complete';
    default: return 'GRIO';
  }
}

function getCardStyle(type: string): string {
  switch (type) {
    case 'feedback':
    case 'score':
      return 'bg-teal-900/20 border-teal-500/30';
    case 'example':
      return 'bg-blue-900/20 border-blue-500/30';
    case 'completed':
      return 'bg-emerald-900/20 border-emerald-500/30';
    default:
      return 'bg-slate-800/60 border-slate-600/40';
  }
}

export default function AiLessonEngine({
  subject,
  topic,
  mode,
  isPaused,
  isMuted,
  onToggleMute,
  onComplete,
}: AiLessonEngineProps) {
  const [engineState, setEngineState] = useState<AiEngineState>('idle');
  const [currentResponse, setCurrentResponse] = useState<AiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpResponse, setFollowUpResponse] = useState<AiResponse | null>(null);
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    totalQuestions: QUIZ_TOTAL,
    score: 0,
    responses: [],
    selectedAnswer: null,
    showingFeedback: false,
  });
  const [revisionPoints, setRevisionPoints] = useState<string[]>([]);
  const [revisionQuestionIndex, setRevisionQuestionIndex] = useState(0);
  const [revisionPhase, setRevisionPhase] = useState<'points' | 'questions'>('points');
  const [revisionAnswer, setRevisionAnswer] = useState<number | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState<AiResponse | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [teachFeedbackAcknowledged, setTeachFeedbackAcknowledged] = useState(false);
  const [socraticHintLevel, setSocraticHintLevel] = useState(0);
  const [bookmarkedIndices, setBookmarkedIndices] = useState<Set<number>>(new Set());
  const [confusionReported, setConfusionReported] = useState(false);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const speech = useSpeech();

  useEffect(() => {
    if (isPaused) {
      speech.pause();
    } else {
      speech.resume();
    }
  }, [isPaused]);

  useEffect(() => {
    return () => {
      speech.stop();
    };
  }, []);

  const showResponse = useCallback((response: AiResponse) => {
    setCurrentResponse(response);
    setResponseKey((k) => k + 1);
  }, []);

  const speakResponse = useCallback(
    (response: AiResponse) => {
      let text = response.content;
      if (response.options) {
        text += '. Options: ' + response.options.map((o, i) => `${String.fromCharCode(65 + i)}: ${o}`).join('. ');
      }
      speech.speak(text);
    },
    [speech]
  );

  useEffect(() => {
    if (mode === 'teach') {
      runTeachMode();
    } else if (mode === 'quiz') {
      runQuizMode(0);
    } else if (mode === 'revision') {
      runRevisionMode();
    }
  }, []);

  const waitIfPaused = () =>
    new Promise<void>((resolve) => {
      const check = () => {
        if (!isPausedRef.current) resolve();
        else setTimeout(check, 300);
      };
      check();
    });

  const avatarState: AvatarState = (() => {
    if (isLoading) return 'thinking';
    if (engineState === 'completed') return 'celebrating';
    if (lastCorrect === true && engineState === 'feedback') return 'celebrating';
    if (engineState === 'asking_question' && !speech.isSpeaking) return 'listening';
    if (speech.isSpeaking) return 'speaking';
    return 'idle';
  })();

  async function runTeachMode() {
    setEngineState('explaining');
    setIsLoading(true);
    const intro = await generateLessonIntro(subject, topic);
    await waitIfPaused();
    setIsLoading(false);
    showResponse(intro);
    speakResponse(intro);

    await sleep(4000);
    await waitIfPaused();

    setIsLoading(true);
    speech.stop();
    const explanation = await generateExplanation(subject, topic);
    await waitIfPaused();
    setIsLoading(false);
    showResponse(explanation);
    speakResponse(explanation);

    await sleep(5000);
    await waitIfPaused();

    setEngineState('example');
    setIsLoading(true);
    speech.stop();
    const example = await generateExample(subject, topic);
    await waitIfPaused();
    setIsLoading(false);
    showResponse(example);
    speakResponse(example);

    await sleep(5000);
    await waitIfPaused();

    setEngineState('asking_question');
    setIsLoading(true);
    speech.stop();
    const question = await generateQuestion(subject, topic, 0);
    await waitIfPaused();
    setIsLoading(false);
    showResponse(question);
    speakResponse(question);
    setQuizState((prev) => ({ ...prev, responses: [question], selectedAnswer: null }));
  }

  async function handleTeachAnswer(selectedIndex: number) {
    setQuizState((prev) => ({ ...prev, selectedAnswer: selectedIndex }));
    setEngineState('feedback');
    setIsLoading(true);
    setTeachFeedbackAcknowledged(false);
    speech.stop();
    const feedback = await evaluateAnswer(subject, 0, selectedIndex);
    setIsLoading(false);
    const correct = selectedIndex === quizState.responses[0]?.correctIndex;
    setLastCorrect(correct);
    showResponse(feedback);
    speakResponse(feedback);
    setQuizState((prev) => ({
      ...prev,
      score: correct ? 1 : 0,
      showingFeedback: true,
    }));
    if (correct) {
      await sleep(2500);
      speech.stop();
      setLastCorrect(null);
      setEngineState('completed');
      const completedResp: AiResponse = {
        type: 'completed',
        title: 'Lesson Complete',
        content: `Well done! You have completed the ${topic} lesson in ${subject}. Your understanding of this topic has been assessed. Continue to the next topic when you are ready.`,
      };
      showResponse(completedResp);
      speakResponse(completedResp);
      onComplete(1, 1);
    }
  }

  function handleTeachContinue() {
    speech.stop();
    setLastCorrect(null);
    setTeachFeedbackAcknowledged(true);
    setEngineState('completed');
    const completedResp: AiResponse = {
      type: 'completed',
      title: 'Lesson Complete',
      content: `You have completed the ${topic} lesson in ${subject}. Review the solution above and continue to the next topic when you are ready.`,
    };
    showResponse(completedResp);
    onComplete(quizState.score, 1);
  }

  async function runQuizMode(startIndex: number) {
    setSocraticHintLevel(0);
    setConfusionReported(false);
    setEngineState('asking_question');
    setIsLoading(true);
    speech.stop();
    const question = await generateQuestion(subject, topic, startIndex);
    setIsLoading(false);
    showResponse(question);
    speakResponse(question);
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: startIndex,
      responses: [...prev.responses.slice(0, startIndex), question],
      selectedAnswer: null,
      showingFeedback: false,
    }));
  }

  async function handleQuizAnswer(selectedIndex: number) {
    const qIndex = quizState.currentQuestion;
    setQuizState((prev) => ({ ...prev, selectedAnswer: selectedIndex, showingFeedback: true }));
    setEngineState('feedback');
    setIsLoading(true);
    speech.stop();
    const feedback = await evaluateAnswer(subject, qIndex, selectedIndex);
    setIsLoading(false);
    const correct = selectedIndex === quizState.responses[qIndex]?.correctIndex;
    setLastCorrect(correct);
    showResponse(feedback);
    speakResponse(feedback);
    const newScore = quizState.score + (correct ? 1 : 0);

    await sleep(2500);
    setLastCorrect(null);

    if (qIndex + 1 < QUIZ_TOTAL) {
      setQuizState((prev) => ({ ...prev, score: newScore, showingFeedback: false }));
      await runQuizMode(qIndex + 1);
    } else {
      setEngineState('completed');
      speech.stop();
      const finalScore = newScore;
      const scoreResp: AiResponse = {
        type: 'score',
        title: 'Quiz Complete',
        content: `You scored ${finalScore} out of ${QUIZ_TOTAL}.\n\n${
          finalScore === QUIZ_TOTAL
            ? 'Excellent work — full marks!'
            : finalScore >= 2
            ? 'Good effort! Review the questions you missed to strengthen your understanding.'
            : 'Keep practising. Revisiting the lesson material will help solidify these concepts.'
        }`,
      };
      showResponse(scoreResp);
      speakResponse(scoreResp);
      setQuizState((prev) => ({ ...prev, score: finalScore }));
      onComplete(finalScore, QUIZ_TOTAL);
    }
  }

  async function runRevisionMode() {
    setEngineState('explaining');
    setIsLoading(true);
    const revisionData = await generateRevisionPoints(subject, topic);
    setIsLoading(false);
    setRevisionPoints(revisionData.content.split('\n'));
    setRevisionPhase('points');
    showResponse(revisionData);
    speakResponse(revisionData);
  }

  async function startRevisionQuestions() {
    setSocraticHintLevel(0);
    setConfusionReported(false);
    setRevisionPhase('questions');
    setRevisionQuestionIndex(0);
    setRevisionAnswer(null);
    setRevisionFeedback(null);
    setEngineState('asking_question');
    setIsLoading(true);
    speech.stop();
    const q = await generateQuestion(subject, topic, 0);
    setIsLoading(false);
    showResponse(q);
    speakResponse(q);
    setQuizState((prev) => ({ ...prev, responses: [q], selectedAnswer: null, currentQuestion: 0 }));
  }

  async function handleRevisionAnswer(selectedIndex: number) {
    const qIndex = revisionQuestionIndex;
    setRevisionAnswer(selectedIndex);
    setIsLoading(true);
    speech.stop();
    const feedback = await evaluateAnswer(subject, qIndex, selectedIndex);
    setIsLoading(false);
    setRevisionFeedback(feedback);
    const correct = selectedIndex === quizState.responses[qIndex]?.correctIndex;
    setLastCorrect(correct);
    const newScore = quizState.score + (correct ? 1 : 0);

    await sleep(2500);
    setLastCorrect(null);

    if (qIndex + 1 < REVISION_TOTAL) {
      setRevisionQuestionIndex(qIndex + 1);
      setRevisionAnswer(null);
      setRevisionFeedback(null);
      setConfusionReported(false);
      setIsLoading(true);
      speech.stop();
      const nextQ = await generateQuestion(subject, topic, qIndex + 1);
      setIsLoading(false);
      showResponse(nextQ);
      speakResponse(nextQ);
      setQuizState((prev) => ({
        ...prev,
        score: newScore,
        currentQuestion: qIndex + 1,
        responses: [...prev.responses, nextQ],
        selectedAnswer: null,
      }));
    } else {
      setEngineState('completed');
      speech.stop();
      const scoreResp: AiResponse = {
        type: 'score',
        title: 'Revision Complete',
        content: `Rapid-fire complete! You scored ${newScore} out of ${REVISION_TOTAL}.\n\n${
          newScore === REVISION_TOTAL
            ? 'Outstanding — perfect revision score!'
            : 'Great effort. Keep reviewing these key points regularly.'
        }`,
      };
      showResponse(scoreResp);
      speakResponse(scoreResp);
      onComplete(newScore, REVISION_TOTAL);
    }
  }

  async function handleFollowUp() {
    if (!followUpQuestion.trim()) return;
    setFollowUpLoading(true);
    setShowFollowUp(true);
    speech.stop();
    const response = await generateFollowUpResponse(followUpQuestion);
    setFollowUpLoading(false);
    setFollowUpResponse(response);
    speech.speak(response.content);
    setFollowUpQuestion('');
  }

  async function handleSkipQuestion() {
    speech.stop();
    setShowFollowUp(false);
    setFollowUpResponse(null);

    if (mode === 'teach') {
      const q = quizState.responses[0];
      const skippedFeedback: AiResponse = {
        type: 'feedback',
        title: 'Skipped',
        content: `Review the solution when ready. The correct answer is "${q?.options?.[q?.correctIndex ?? 0] ?? '—'}".`,
      };
      setEngineState('feedback');
      setTeachFeedbackAcknowledged(false);
      setQuizState((prev) => ({ ...prev, selectedAnswer: null, score: 0, showingFeedback: true }));
      showResponse(skippedFeedback);
      return;
    }

    if (mode === 'quiz') {
      const qIndex = quizState.currentQuestion;
      if (qIndex + 1 < QUIZ_TOTAL) {
        setQuizState((prev) => ({ ...prev, showingFeedback: false }));
        await runQuizMode(qIndex + 1);
      } else {
        setEngineState('completed');
        speech.stop();
        const scoreResp: AiResponse = {
          type: 'score',
          title: 'Quiz Complete',
          content: `You scored ${quizState.score} out of ${QUIZ_TOTAL}.`,
        };
        showResponse(scoreResp);
        onComplete(quizState.score, QUIZ_TOTAL);
      }
      return;
    }

    if (mode === 'revision' && revisionPhase === 'questions') {
      const qIndex = revisionQuestionIndex;
      const newScore = quizState.score;
      if (qIndex + 1 < REVISION_TOTAL) {
        setRevisionQuestionIndex(qIndex + 1);
        setRevisionAnswer(null);
        setRevisionFeedback(null);
        setSocraticHintLevel(0);
        setConfusionReported(false);
        setIsLoading(true);
        speech.stop();
        const nextQ = await generateQuestion(subject, topic, qIndex + 1);
        setIsLoading(false);
        showResponse(nextQ);
        speakResponse(nextQ);
        setQuizState((prev) => ({
          ...prev,
          score: newScore,
          currentQuestion: qIndex + 1,
          responses: [...prev.responses, nextQ],
          selectedAnswer: null,
        }));
      } else {
        setEngineState('completed');
        speech.stop();
        const scoreResp: AiResponse = {
          type: 'score',
          title: 'Revision Complete',
          content: `Rapid-fire complete! You scored ${newScore} out of ${REVISION_TOTAL}.`,
        };
        showResponse(scoreResp);
        onComplete(newScore, REVISION_TOTAL);
      }
    }
  }

  const currentQ = quizState.responses[quizState.currentQuestion];
  const questionIndex =
    mode === 'teach' ? 0 : mode === 'quiz' ? quizState.currentQuestion : revisionQuestionIndex;
  const answered =
    currentResponse?.type === 'question' &&
    (revisionPhase === 'questions' ? revisionAnswer !== null : quizState.selectedAnswer !== null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentResponse?.type !== 'question' || !currentQ?.options || answered) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')
        return;
      let index = -1;
      if (e.key === 'a' || e.key === 'A') index = 0;
      else if (e.key === 'b' || e.key === 'B') index = 1;
      else if (e.key === 'c' || e.key === 'C') index = 2;
      else if (e.key === 'd' || e.key === 'D') index = 3;
      if (index < 0 || index >= currentQ.options.length) return;
      e.preventDefault();
      if (mode === 'teach') handleTeachAnswer(index);
      else if (mode === 'quiz') handleQuizAnswer(index);
      else handleRevisionAnswer(index);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentResponse?.type, currentQ?.options?.length, answered, mode]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-4">
        <AnimatedAvatar
          state={avatarState}
          isSpeaking={speech.isSpeaking}
          glowColor={getGlowColor(currentResponse?.type)}
        />

        {isLoading && !currentResponse && (
          <motion.div
            className="text-slate-400 text-lg"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            GRIO is preparing...
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {currentResponse && (
            <motion.div
              key={responseKey}
              className="w-full max-w-3xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className={`rounded-2xl p-8 border ${getCardStyle(currentResponse.type)}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">
                  {getResponseLabel(currentResponse.type)}
                </p>
                <h2 className="text-2xl font-bold text-white mb-4">{currentResponse.title}</h2>
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                  {currentResponse.content}
                </p>

                {currentResponse.type === 'revision' && revisionPoints.length > 0 && revisionPhase === 'points' && (
                  <div className="mt-6 space-y-3">
                    {revisionPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate-200 text-base">{point}</span>
                      </div>
                    ))}
                    <button
                      onClick={startRevisionQuestions}
                      className="mt-6 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-colors text-base"
                    >
                      Start Rapid-Fire Questions
                    </button>
                  </div>
                )}

                {currentResponse.type === 'question' && currentQ?.options && (
                  <>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {currentQ.options.map((option, i) => {
                        const optionAnswered =
                          revisionPhase === 'questions' ? revisionAnswer !== null : quizState.selectedAnswer !== null;
                        const selectedI =
                          revisionPhase === 'questions' ? revisionAnswer : quizState.selectedAnswer;
                        const isCorrect = i === currentQ.correctIndex;
                        const isSelected = i === selectedI;

                        return (
                          <button
                            key={i}
                            disabled={optionAnswered}
                            onClick={() => {
                              if (mode === 'teach') handleTeachAnswer(i);
                              else if (mode === 'quiz') handleQuizAnswer(i);
                              else handleRevisionAnswer(i);
                            }}
                            className={`px-5 py-4 rounded-xl border text-left text-base font-medium transition-all ${
                              optionAnswered
                                ? isCorrect
                                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                                  : isSelected
                                  ? 'bg-red-600/20 border-red-500 text-red-300'
                                  : 'bg-slate-700/40 border-slate-600 text-slate-500'
                                : 'bg-slate-700/40 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:border-teal-500 cursor-pointer'
                            }`}
                          >
                            <span className="text-teal-400 mr-2 font-bold">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {!answered && (
                      <p className="mt-2 text-slate-500 text-sm">Press A–D to answer</p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {!answered && (
                        <button
                          type="button"
                          onClick={handleSkipQuestion}
                          className="px-3 py-2 rounded-lg border border-slate-600/60 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-medium transition-colors"
                        >
                          Skip question
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setBookmarkedIndices((prev) => {
                            const next = new Set(prev);
                            if (next.has(questionIndex)) next.delete(questionIndex);
                            else next.add(questionIndex);
                            return next;
                          })
                        }
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          bookmarkedIndices.has(questionIndex)
                            ? 'border-amber-500/60 text-amber-400 bg-amber-500/10'
                            : 'border-slate-600/60 text-slate-400 hover:text-white hover:border-slate-500'
                        }`}
                      >
                        {bookmarkedIndices.has(questionIndex) ? 'Bookmarked' : 'Bookmark question'}
                      </button>
                      {!confusionReported ? (
                        <button
                          type="button"
                          onClick={() => setConfusionReported(true)}
                          className="px-3 py-2 rounded-lg border border-slate-600/60 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-medium transition-colors"
                        >
                          Report confusion
                        </button>
                      ) : (
                        <span className="px-3 py-2 text-slate-500 text-sm">Thanks, your feedback was recorded.</span>
                      )}
                    </div>
                  </>
                )}

                {revisionFeedback && revisionPhase === 'questions' && (
                  <div
                    className={`mt-4 p-4 rounded-xl ${
                      revisionFeedback.title === 'Correct!'
                        ? 'bg-emerald-900/30 border border-emerald-500/30'
                        : 'bg-red-900/20 border border-red-500/30'
                    }`}
                  >
                    <p className="text-sm font-semibold text-white mb-1">{revisionFeedback.title}</p>
                    <p className="text-sm text-slate-300">{revisionFeedback.content}</p>
                  </div>
                )}

                {mode === 'teach' && engineState === 'feedback' && currentResponse?.type === 'feedback' && quizState.score === 0 && !teachFeedbackAcknowledged && (
                  <div className="mt-6">
                    <p className="text-slate-400 text-sm mb-2">Read the solution above, then continue when ready.</p>
                    <button
                      onClick={handleTeachContinue}
                      className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-colors text-base"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {engineState === 'completed' && currentResponse.type !== 'completed' && (
                  <div className="mt-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">Session saved</span>
                  </div>
                )}
              </div>

              {mode === 'quiz' && engineState === 'asking_question' && (
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-slate-500 text-sm">
                    Question {quizState.currentQuestion + 1} of {QUIZ_TOTAL}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: QUIZ_TOTAL }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < quizState.currentQuestion
                            ? 'bg-teal-500'
                            : i === quizState.currentQuestion
                            ? 'bg-teal-300'
                            : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {mode === 'teach' && engineState === 'asking_question' && currentResponse?.type === 'question' && (
                <div className="mt-3 px-1">
                  <span className="text-slate-500 text-sm">Practice question (1 of 1)</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-8 pb-4 border-t border-white/5 pt-4">
        <div className="mb-4 p-4 bg-slate-800/60 border border-slate-600/40 rounded-xl">
          <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold mb-1">
            GRIO Response
          </p>
          {showFollowUp && followUpLoading ? (
            <motion.p
              className="text-slate-400 text-sm"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              GRIO is thinking...
            </motion.p>
          ) : showFollowUp && followUpResponse ? (
            <p className="text-slate-300 text-sm leading-relaxed">{followUpResponse.content}</p>
          ) : currentResponse?.type === 'question' && currentQ ? (
            <p className="text-slate-400 text-sm leading-relaxed">
              Select an answer above. Need help? Ask GRIO a question below or click &quot;Get a hint&quot;.
            </p>
          ) : (
            <p className="text-slate-400 text-sm leading-relaxed">
              Ask GRIO a question below for more help with this lesson.
            </p>
          )}
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          {currentResponse?.type === 'question' && !showFollowUp && (
            <button
              type="button"
              onClick={async () => {
                setFollowUpLoading(true);
                setShowFollowUp(true);
                speech.stop();
                const questionIndex =
                  mode === 'teach' ? 0 : mode === 'quiz' ? quizState.currentQuestion : revisionQuestionIndex;
                const response = await generateSocraticHint(subject, topic, questionIndex, socraticHintLevel);
                setSocraticHintLevel((prev) => prev + 1);
                setFollowUpLoading(false);
                setFollowUpResponse(response);
                speech.speak(response.content);
              }}
              disabled={followUpLoading}
              className="px-4 py-2.5 rounded-xl border border-teal-600/60 text-teal-300 hover:bg-teal-600/20 transition-colors text-sm font-medium disabled:opacity-50"
            >
              Get a hint
            </button>
          )}
          <input
            type="text"
            value={followUpQuestion}
            onChange={(e) => setFollowUpQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFollowUp()}
            placeholder="Ask GRIO a question..."
            className="flex-1 min-w-[12rem] bg-slate-800/60 border border-slate-600/40 rounded-xl px-5 py-3 text-white text-base placeholder-slate-500 focus:outline-none focus:border-teal-500/60"
          />
          <button
            onClick={handleFollowUp}
            disabled={!followUpQuestion.trim() || followUpLoading}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors text-base"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
