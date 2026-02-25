'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import AiLessonEngine from '@/components/AiLessonEngine';
import type { SessionMode, LessonSession } from '@/lib/types';
import { getClassroomsBySchool, getTopics } from '@/lib/api';
import type { Classroom } from '@/lib/types';

type SessionPhase = 'setup' | 'active' | 'complete';

const MUTE_STORAGE_KEY = 'grio-speech-muted';

function getStoredMute(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
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
  const { addSession, subjects: contextSubjects, initForUser } = useApp();

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedMode, setSelectedMode] = useState<SessionMode>('teach');
  const [phase, setPhase] = useState<SessionPhase>('setup');
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(getStoredMute);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedScore, setCompletedScore] = useState<{ score: number; total: number } | null>(null);

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
    getTopics(selectedSubjectId).then((t) => {
      const names = t.map((topic) => topic.name);
      setTopics(names);
      setSelectedTopic(names[0] ?? '');
    });
  }, [selectedSubjectId]);

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

  const classroom = classrooms.find((c) => c.id === selectedClassroom);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-2xl tracking-tight">GRIO</span>
            <span className="text-teal-300 text-xs font-medium bg-teal-900/50 px-2 py-0.5 rounded-full">AI</span>
          </div>
          {phase === 'active' && (
            <div className="flex items-center gap-6 text-sm">
              {classroom && (
                <span className="text-slate-400">
                  <span className="text-slate-500">Classroom:</span>{' '}
                  <span className="text-white font-medium">{classroom.name}</span>
                </span>
              )}
              <span className="text-slate-400">
                <span className="text-slate-500">Subject:</span>{' '}
                <span className="text-white font-medium">{selectedSubjectName}</span>
              </span>
              <span className="text-slate-400">
                <span className="text-slate-500">Topic:</span>{' '}
                <span className="text-white font-medium">{selectedTopic}</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                selectedMode === 'teach'
                  ? 'bg-teal-900/50 text-teal-300 border border-teal-700/40'
                  : selectedMode === 'quiz'
                  ? 'bg-blue-900/50 text-blue-300 border border-blue-700/40'
                  : 'bg-amber-900/50 text-amber-300 border border-amber-700/40'
              }`}>
                {selectedMode} mode
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleExit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors text-sm font-medium"
        >
          <span>Exit</span>
          <span>✕</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {phase === 'setup' && (
          <aside className="w-72 border-r border-white/10 p-6 flex flex-col gap-6 flex-shrink-0">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
                Lesson Setup
              </h2>

              {classrooms.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs text-slate-400 mb-2 font-medium">Classroom</label>
                  <select
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700/60 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/60"
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
                <label className="block text-xs text-slate-400 mb-2 font-medium">Subject</label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700/60 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/60"
                >
                  {contextSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs text-slate-400 mb-2 font-medium">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700/60 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/60"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-3 font-medium uppercase tracking-widest">Mode</label>
              <div className="space-y-2">
                {(['teach', 'quiz', 'revision'] as SessionMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMode(m)}
                    className={`w-full px-4 py-3.5 rounded-xl border text-left transition-all text-sm font-medium ${
                      selectedMode === m
                        ? 'bg-teal-600/20 border-teal-500/60 text-teal-300'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold capitalize">{m} Mode</div>
                    <div className="text-xs mt-0.5 opacity-70">
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
              className="mt-auto w-full py-4 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors text-base"
            >
              Start Lesson
            </button>
          </aside>
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {phase === 'setup' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full border border-teal-500/30 bg-teal-500/5 flex items-center justify-center mb-6">
                <div className="text-teal-400 text-4xl font-bold">G</div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">GRIO Classroom Mode</h1>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Select a subject, topic, and mode from the panel to begin an AI-powered classroom session.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { label: 'Teach Mode', desc: 'Full AI-guided lesson' },
                  { label: 'Quiz Mode', desc: 'Direct practice questions' },
                  { label: 'Revision', desc: 'Key points + rapid-fire' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 text-center"
                  >
                    <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === 'active' && (
            <>
              <div className="flex-1 overflow-y-auto">
                <AiLessonEngine
                  subject={selectedSubjectName}
                  topic={selectedTopic}
                  mode={selectedMode}
                  isPaused={isPaused}
                  isMuted={isMuted}
                  onToggleMute={handleToggleMute}
                  onComplete={handleSessionComplete}
                />
              </div>
              <div className="flex items-center justify-center gap-4 px-8 py-5 border-t border-white/10 flex-shrink-0">
                <button
                  onClick={() => setIsPaused(true)}
                  disabled={isPaused}
                  className="px-5 py-2.5 rounded-xl border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Pause
                </button>
                <button
                  onClick={() => setIsPaused(false)}
                  disabled={!isPaused}
                  className="px-5 py-2.5 rounded-xl border border-teal-700/60 text-teal-300 hover:text-white hover:border-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Resume
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button
                  onClick={handleToggleMute}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors text-sm font-medium ${
                    isMuted
                      ? 'border-red-700/40 text-red-400 hover:text-red-300 hover:border-red-600/60'
                      : 'border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                  title={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  <SpeakerIcon muted={isMuted} />
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <div className="w-px h-6 bg-white/10" />
                <span className="text-slate-500 text-sm">
                  {isPaused ? (
                    <span className="text-amber-400">Paused</span>
                  ) : (
                    <span className="text-emerald-400">Live</span>
                  )}
                </span>
              </div>
            </>
          )}

          {phase === 'complete' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center mb-6">
                <span className="text-emerald-400 text-4xl">✓</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Session Complete</h1>
              <p className="text-slate-400 text-lg mb-2">
                {selectedSubjectName} — {selectedTopic}
              </p>
              <p className="text-slate-500 text-sm mb-6 capitalize">{selectedMode} Mode</p>

              {completedScore && (
                <div className="bg-slate-800/60 border border-slate-600/40 rounded-2xl px-10 py-6 mb-8">
                  <p className="text-slate-400 text-sm mb-2">Score</p>
                  <p className="text-5xl font-bold text-teal-400 mb-1">
                    {completedScore.score}/{completedScore.total}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {Math.round((completedScore.score / completedScore.total) * 100)}% correct
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleNewSession}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors"
                >
                  New Session
                </button>
                <button
                  onClick={handleExit}
                  className="px-8 py-3.5 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 font-medium rounded-xl transition-colors"
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
