'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { useUI } from '@/context/UIContext';
import AiLessonEngine from '@/components/AiLessonEngine';
import ConceptSummaryPanel from '@/components/ConceptSummaryPanel';
import type { SessionMode, LessonSession } from '@/lib/types';
import { getClassroomsBySchool } from '@/lib/api';
import type { Classroom } from '@/lib/types';

type SessionPhase = 'setup' | 'active' | 'complete';
type Theme = 'light' | 'dark';

const MUTE_STORAGE_KEY = 'grio-speech-muted';
const THEME_STORAGE_KEY = 'grio-classroom-theme';

function getStoredMute(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : 'dark';
  } catch {
    return 'dark';
  }
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export default function ClassroomPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addSession, subjects: contextSubjects, initForUser, loadTopics, topics: contextTopics } = useApp();
  const { highContrast, largeTypography, presentationMode, toggleHighContrast, toggleLargeTypography, togglePresentationMode, setPresentationMode } = useUI();

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedMode, setSelectedMode] = useState<SessionMode>('teach');
  const [phase, setPhase] = useState<SessionPhase>('setup');
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(getStoredMute);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedScore, setCompletedScore] = useState<{ score: number; total: number } | null>(null);
  const [conceptPanelOpen, setConceptPanelOpen] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    if (user) {
      initForUser(user);
    }
  }, [user, initForUser]);

  useEffect(() => {
    if (user?.schoolId) {
      getClassroomsBySchool(user.schoolId).then((cls) => {
        setClassrooms(cls);
        if (cls.length > 0) setSelectedClassroom(cls[0].id);
      });
    }
  }, [user]);

  useEffect(() => {
    if (contextSubjects.length > 0 && !selectedSubjectId) {
      const first = contextSubjects[0];
      setSelectedSubjectId(first.id);
      setSelectedSubjectName(first.name);
    }
  }, [contextSubjects, selectedSubjectId]);

  useEffect(() => {
    if (!selectedSubjectId) return;
    loadTopics(selectedSubjectId);
  }, [selectedSubjectId, loadTopics]);

  useEffect(() => {
    if (contextTopics.length > 0 && !selectedTopic) {
      setSelectedTopic(contextTopics[0].name);
    }
  }, [contextTopics, selectedTopic]);

  const topicNames = contextTopics.map((t) => t.name);

  const handleSubjectChange = (subjectId: string) => {
    const subject = contextSubjects.find((s) => s.id === subjectId);
    if (subject) {
      setSelectedSubjectId(subject.id);
      setSelectedSubjectName(subject.name);
      setSelectedTopic('');
    }
  };

  const handleStartLesson = () => {
    if (!selectedClassroom || !selectedSubjectName || !selectedTopic) return;
    setSessionStartTime(new Date());
    setPhase('active');
    setIsPaused(false);
  };

  const handleSessionComplete = (score?: number, totalQuestions?: number) => {
    const now = new Date();
    const classroom = classrooms.find((c) => c.id === selectedClassroom);
    const schoolName = user?.schoolId
      ? 'School'
      : 'N/A';

    const session: LessonSession = {
      id: `session-${Date.now()}`,
      classroomId: selectedClassroom,
      classroomName: classroom?.name ?? selectedClassroom,
      subjectId: selectedSubjectId,
      subjectName: selectedSubjectName,
      topicId: selectedTopic.toLowerCase().replace(/\s+/g, '-'),
      topicName: selectedTopic,
      mode: selectedMode,
      startedAt: sessionStartTime?.toISOString() ?? now.toISOString(),
      completedAt: now.toISOString(),
      score,
      totalQuestions,
      schoolId: user?.schoolId ?? '',
      schoolName,
      teacherId: user?.id ?? '',
    };

    addSession(session);
    if (score !== undefined && totalQuestions !== undefined) {
      setCompletedScore({ score, total: totalQuestions });
    }
    setPhase('complete');
  };

  const handleExit = () => {
    router.push('/teacher');
  };

  const handleNewSession = () => {
    setPhase('setup');
    setIsPaused(false);
    setCompletedScore(null);
    setSessionStartTime(null);
  };

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);


  useEffect(() => {
    if (phase !== 'active' || !sessionStartTime || isPaused) return;
    const start = sessionStartTime.getTime();
    const tick = () => setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase, sessionStartTime, isPaused]);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const classroom = classrooms.find((c) => c.id === selectedClassroom);
  const isLight = theme === 'light';

  const headerBg = isLight ? 'bg-white border-slate-200' : 'bg-[#0B1220] border-white/10';
  const headerText = isLight ? 'text-slate-900' : 'text-white';
  const headerMuted = isLight ? 'text-slate-500' : 'text-slate-400';
  const headerLabel = isLight ? 'text-slate-600' : 'text-slate-500';
  const exitBtn = isLight
    ? 'border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50'
    : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20';

  const isTeachActive = phase === 'active' && selectedMode === 'teach';
  const isSessionActive = phase === 'active';

  return (
    <div
      className={`flex flex-col transition-colors duration-200 ${
        isSessionActive ? 'h-screen min-h-[768px] min-w-[1366px] overflow-hidden' : 'min-h-screen'
      } ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0B1220] text-white'
      }`}
      style={{ fontFamily: 'system-ui, sans-serif' }}
      {...(isSessionActive ? { 'data-teach-mode': 'true' } : {})}
    >
      {!(isSessionActive && presentationMode) && (
        <header
          className={`flex items-center justify-between px-6 sm:px-8 py-4 border-b flex-shrink-0 ${headerBg} ${isLight ? '' : 'border-white/10'}`}
        >
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-xl sm:text-2xl tracking-tight ${headerText}`}>GRIO</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  isLight ? 'bg-teal-100 text-teal-700' : 'bg-teal-900/50 text-teal-300'
                }`}
              >
                AI
              </span>
            </div>
            {phase === 'active' && (
              <div className="flex items-center gap-3 sm:gap-5 text-sm flex-wrap">
                {classroom && (
                  <span className={headerMuted}>
                    <span className={headerLabel}>Classroom:</span>{' '}
                    <span className={`font-medium ${headerText}`}>{classroom.name}</span>
                  </span>
                )}
                <span className={headerMuted}>
                  <span className={headerLabel}>Subject:</span>{' '}
                  <span className={`font-medium ${headerText}`}>{selectedSubjectName}</span>
                </span>
                <span className={headerMuted}>
                  <span className={headerLabel}>Topic:</span>{' '}
                  <span className={`font-medium ${headerText}`}>{selectedTopic}</span>
                </span>
                <span
                  title={
                    selectedMode === 'teach'
                      ? 'AI-guided lesson'
                      : selectedMode === 'quiz'
                      ? 'Direct practice'
                      : 'Key points + rapid-fire'
                  }
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                    selectedMode === 'teach'
                      ? isLight
                        ? 'bg-teal-100 text-teal-800 border border-teal-200'
                        : 'bg-teal-900/50 text-teal-300 border border-teal-700/40'
                      : selectedMode === 'quiz'
                      ? isLight
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-blue-900/50 text-blue-300 border border-blue-700/40'
                      : isLight
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-amber-900/50 text-amber-300 border border-amber-700/40'
                  }`}
                >
                  {selectedMode} mode
                </span>
                {isSessionActive && (
                  <>
                    <button
                      type="button"
                      onClick={toggleHighContrast}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        highContrast
                          ? isLight
                            ? 'bg-slate-200 border-slate-400 text-slate-800'
                            : 'bg-slate-600/60 border-slate-500 text-white'
                          : isLight
                          ? 'border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                          : 'border-slate-600/60 text-slate-400 hover:text-slate-300'
                      }`}
                      title={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
                    >
                      Contrast {highContrast ? 'On' : 'Off'}
                    </button>
                    <button
                      type="button"
                      onClick={toggleLargeTypography}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        largeTypography
                          ? isLight
                            ? 'bg-slate-200 border-slate-400 text-slate-800'
                            : 'bg-slate-600/60 border-slate-500 text-white'
                          : isLight
                          ? 'border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                          : 'border-slate-600/60 text-slate-400 hover:text-slate-300'
                      }`}
                      title={largeTypography ? 'Disable large text' : 'Enable large text'}
                    >
                      Large Text {largeTypography ? 'On' : 'Off'}
                    </button>
                    <button
                      type="button"
                      onClick={togglePresentationMode}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        isLight
                          ? 'border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                          : 'border-slate-600/60 text-slate-400 hover:text-slate-300'
                      }`}
                      title="Enter presentation mode"
                    >
                      Present
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleTheme}
              className={`p-2.5 rounded-xl border transition-colors ${exitBtn}`}
              title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {isLight ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
            <button
              onClick={handleExit}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${exitBtn}`}
            >
              <span>Exit</span>
              <span aria-hidden>✕</span>
            </button>
          </div>
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {phase === 'active' && !(isSessionActive && presentationMode) && (
          <aside
            className={`flex-shrink-0 border-r flex flex-col transition-[width] duration-200 ${
              conceptPanelOpen ? 'w-80' : 'w-12'
            } ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-slate-900/40 border-white/10'
            }`}
          >
            {conceptPanelOpen ? (
              <>
                <div
                  className={`flex items-center justify-between px-4 py-3 border-b flex-shrink-0 ${
                    isLight ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Concept summary
                  </span>
                  <button
                    type="button"
                    onClick={() => setConceptPanelOpen(false)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isLight
                        ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                    }`}
                    title="Collapse panel"
                    aria-label="Collapse concept summary panel"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ConceptSummaryPanel subject={selectedSubjectName} topic={selectedTopic} theme={theme} />
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConceptPanelOpen(true)}
                className={`flex items-center justify-center w-full h-24 transition-colors ${
                  isLight
                    ? 'text-slate-500 hover:text-teal-600 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-teal-400 hover:bg-slate-700/40'
                }`}
                title="Expand concept summary"
                aria-label="Expand concept summary panel"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </aside>
        )}
        {phase === 'setup' && (
          <aside
            className={`w-72 border-r p-6 flex flex-col gap-6 flex-shrink-0 ${
              isLight ? 'bg-white border-slate-200' : 'border-white/10'
            }`}
          >
            <div>
              <h2
                className={`text-xs uppercase tracking-widest font-semibold mb-4 ${
                  isLight ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                Lesson Setup
              </h2>

              {classrooms.length > 0 && (
                <div className="mb-5">
                  <label className={`block text-xs mb-2 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Classroom
                  </label>
                  <select
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                      isLight
                        ? 'bg-slate-50 border border-slate-300 text-slate-900'
                        : 'bg-slate-800/60 border border-slate-700/60 text-white'
                    }`}
                  >
                    {classrooms.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-5">
                <label className={`block text-xs mb-2 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Subject
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                    isLight
                      ? 'bg-slate-50 border border-slate-300 text-slate-900'
                      : 'bg-slate-800/60 border border-slate-700/60 text-white'
                  }`}
                >
                  {contextSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className={`block text-xs mb-2 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Topic
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                    isLight
                      ? 'bg-slate-50 border border-slate-300 text-slate-900'
                      : 'bg-slate-800/60 border border-slate-700/60 text-white'
                  }`}
                >
                  {topicNames.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-xs mb-3 font-medium uppercase tracking-widest ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Mode
              </label>
              <div className="space-y-2">
                {(['teach', 'quiz', 'revision'] as SessionMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMode(m)}
                    className={`w-full px-4 py-3.5 rounded-xl border text-left transition-all text-sm font-medium ${
                      selectedMode === m
                        ? isLight
                          ? 'bg-teal-50 border-teal-400 text-teal-800'
                          : 'bg-teal-600/20 border-teal-500/60 text-teal-300'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold capitalize">{m} Mode</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'opacity-70'}`}>
                      {m === 'teach'
                        ? 'AI-guided lesson with explanation and examples'
                        : m === 'quiz'
                        ? 'Jump straight into practice questions'
                        : 'Summary bullets and rapid-fire questions'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartLesson}
              disabled={!selectedTopic}
              className="mt-auto w-full py-4 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors text-base shadow-sm disabled:shadow-none"
            >
              Start Lesson
            </button>
          </aside>
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {phase === 'setup' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-6 ${
                  isLight ? 'bg-teal-100 border border-teal-200' : 'border border-teal-500/30 bg-teal-500/5'
                }`}
              >
                <div className={isLight ? 'text-teal-600 text-3xl sm:text-4xl font-bold' : 'text-teal-400 text-3xl sm:text-4xl font-bold'}>G</div>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                GRIO Classroom Mode
              </h1>
              <p className={`text-lg max-w-md leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Select a subject, topic, and mode from the panel to begin an AI-powered classroom session.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
                {[
                  { label: 'Teach Mode', desc: 'Full AI-guided lesson' },
                  { label: 'Quiz Mode', desc: 'Direct practice questions' },
                  { label: 'Revision', desc: 'Key points + rapid-fire' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl p-4 text-center border ${
                      isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/40 border-slate-700/40'
                    }`}
                  >
                    <p className={`font-semibold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.label}</p>
                    <p className={isLight ? 'text-slate-500 text-xs' : 'text-slate-500 text-xs'}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === 'active' && (
            <>
              <div
                className="flex-1 min-h-0 overflow-hidden"
                data-teach-main=""
              >
                <AiLessonEngine
                  subject={selectedSubjectName}
                  topic={selectedTopic}
                  mode={selectedMode}
                  isPaused={isPaused}
                  isMuted={isMuted}
                  onToggleMute={handleToggleMute}
                  onComplete={handleSessionComplete}
                  theme={theme}
                />
              </div>
              <div
                className={`flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 border-t flex-shrink-0 ${
                  isLight ? 'bg-white border-slate-200' : 'border-white/10'
                }`}
              >
                <button
                  onClick={() => setIsPaused(true)}
                  disabled={isPaused}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    isLight
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                      : 'border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                >
                  Pause
                </button>
                <button
                  onClick={() => setIsPaused(false)}
                  disabled={!isPaused}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    isLight
                      ? 'border-teal-400 text-teal-700 hover:bg-teal-50'
                      : 'border-teal-700/60 text-teal-300 hover:text-white hover:border-teal-500'
                  }`}
                >
                  Resume
                </button>
                <div className={`w-px h-6 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />
                <button
                  onClick={handleToggleMute}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors text-sm font-medium ${
                    isMuted
                      ? isLight
                        ? 'border-red-200 text-red-600 hover:bg-red-50'
                        : 'border-red-700/40 text-red-400 hover:text-red-300 hover:border-red-600/60'
                      : isLight
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      : 'border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                  title={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  <SpeakerIcon muted={isMuted} />
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <div className={`w-px h-6 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />
                <span className={isLight ? 'text-slate-500 text-sm' : 'text-slate-500 text-sm'}>
                  {isPaused ? (
                    <span className="text-amber-500">Paused</span>
                  ) : (
                    <span className="text-emerald-500">Live</span>
                  )}
                </span>
                <div className={`w-px h-6 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />
                <button
                  type="button"
                  onClick={() => setShowTimer((prev) => !prev)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    showTimer
                      ? isLight
                        ? 'bg-slate-200 border-slate-400 text-slate-800'
                        : 'bg-slate-600/60 border-slate-500 text-white'
                      : isLight
                      ? 'border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                      : 'border-slate-600/60 text-slate-400 hover:text-slate-300'
                  }`}
                  title={showTimer ? 'Hide timer' : 'Show timer'}
                >
                  Timer {showTimer ? formatTimer(elapsedSeconds) : 'Off'}
                </button>
              </div>
            </>
          )}

          {phase === 'complete' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 ${
                  isLight ? 'bg-emerald-100 border border-emerald-200' : 'border border-emerald-500/40 bg-emerald-500/10'
                }`}
              >
                <span className="text-emerald-500 text-4xl">✓</span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Session Complete
              </h1>
              <p className={`text-lg mb-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {selectedSubjectName} — {selectedTopic}
              </p>
              <p className={`text-sm mb-6 capitalize ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{selectedMode} Mode</p>

              {completedScore && (
                <div
                  className={`rounded-2xl px-8 sm:px-10 py-6 mb-8 border ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/60 border-slate-600/40'
                  }`}
                >
                  <p className={`text-sm mb-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Score</p>
                  <p className="text-4xl sm:text-5xl font-bold text-teal-500 mb-1">
                    {completedScore.score}/{completedScore.total}
                  </p>
                  <p className={isLight ? 'text-slate-500 text-sm' : 'text-slate-400 text-sm'}>
                    {Math.round((completedScore.score / completedScore.total) * 100)}% correct
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleNewSession}
                  className="px-6 sm:px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors shadow-sm"
                >
                  New Session
                </button>
                <button
                  onClick={handleExit}
                  className={`px-6 sm:px-8 py-3.5 border font-medium rounded-xl transition-colors ${
                    isLight
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      : 'border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                >
                  Exit
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
