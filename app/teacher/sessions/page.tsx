'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import type { LessonSession } from '@/lib/types';

function formatDuration(startedAt: string, completedAt?: string): string {
  if (!completedAt) return '—';
  const ms = new Date(completedAt).getTime() - new Date(startedAt).getTime();
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const modeBadge: Record<string, string> = {
  teach: 'bg-teal-900/20 text-teal-700 border-teal-200',
  quiz: 'bg-blue-900/20 text-blue-700 border-blue-200',
  revision: 'bg-amber-900/20 text-amber-700 border-amber-200',
};

function exportSessionsCSV(sessions: LessonSession[]) {
  const headers = ['Date', 'Topic', 'Subject', 'Classroom', 'Mode', 'Score', 'Duration'];
  const rows = sessions.map((s) => [
    formatDate(s.startedAt),
    s.topicName,
    s.subjectName,
    s.classroomName,
    s.mode,
    s.score !== undefined && s.totalQuestions ? `${s.score}/${s.totalQuestions}` : '',
    formatDuration(s.startedAt, s.completedAt),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'classroom-sessions.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function TeacherSessionsPage() {
  const { sessions } = useApp();
  const { user } = useAuth();

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [modeFilter, setModeFilter] = useState('');

  const mySessions = useMemo(() => {
    return sessions
      .filter((s) => s.teacherId === user?.id)
      .filter((s) => {
        if (dateFrom && new Date(s.startedAt) < new Date(dateFrom)) return false;
        if (dateTo && new Date(s.startedAt) > new Date(dateTo + 'T23:59:59')) return false;
        if (modeFilter && s.mode !== modeFilter) return false;
        return true;
      });
  }, [sessions, user, dateFrom, dateTo, modeFilter]);

  const allMySessions = sessions.filter((s) => s.teacherId === user?.id);
  const hasFilters = dateFrom || dateTo || modeFilter;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Classroom Sessions</h1>
          <p className="text-slate-500 text-sm mt-1">
            A record of all classroom sessions you have conducted.
          </p>
        </div>
        {mySessions.length > 0 && (
          <button
            onClick={() => exportSessionsCSV(mySessions)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        )}
      </div>

      {allMySessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-slate-700 font-semibold text-lg mb-2">No sessions yet</h2>
          <p className="text-slate-400 text-sm max-w-sm">
            Once you start a classroom session using GRIO Classroom Mode, it will appear here.
          </p>
          <a
            href="/classroom"
            className="mt-6 px-6 py-3 bg-[#0f2a4a] text-white font-semibold rounded-xl hover:bg-[#0f2a4a]/90 transition-colors text-sm"
          >
            Open Classroom Mode
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Total Sessions</p>
              <p className="text-3xl font-bold text-slate-900">{allMySessions.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Teach Mode</p>
              <p className="text-3xl font-bold text-teal-600">
                {allMySessions.filter((s) => s.mode === 'teach').length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Quiz Mode</p>
              <p className="text-3xl font-bold text-blue-600">
                {allMySessions.filter((s) => s.mode === 'quiz').length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Avg Quiz Score</p>
              <p className="text-3xl font-bold text-slate-900">
                {(() => {
                  const quizzes = allMySessions.filter(
                    (s) => (s.mode === 'quiz' || s.mode === 'revision') && s.score !== undefined && s.totalQuestions
                  );
                  if (quizzes.length === 0) return '—';
                  const avg =
                    quizzes.reduce((sum, s) => sum + (s.score! / s.totalQuestions!) * 100, 0) /
                    quizzes.length;
                  return `${Math.round(avg)}%`;
                })()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-semibold text-slate-900">Session History</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <label htmlFor="date-from" className="text-xs text-slate-500 whitespace-nowrap">From</label>
                  <input
                    id="date-from"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="date-to" className="text-xs text-slate-500 whitespace-nowrap">To</label>
                  <input
                    id="date-to"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={modeFilter}
                  onChange={(e) => setModeFilter(e.target.value)}
                  aria-label="Filter by mode"
                  className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All modes</option>
                  <option value="teach">Teach</option>
                  <option value="quiz">Quiz</option>
                  <option value="revision">Revision</option>
                </select>
                {hasFilters && (
                  <button
                    onClick={() => { setDateFrom(''); setDateTo(''); setModeFilter(''); }}
                    className="text-xs text-slate-500 hover:text-slate-700 underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {mySessions.length === 0 ? (
              <div className="px-6 py-10 text-center text-slate-400 text-sm">
                No sessions match your filters.
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Topic</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Subject</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Classroom</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Mode</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Score</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Duration</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mySessions.map((session: LessonSession) => (
                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900 text-sm">{session.topicName}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{session.subjectName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{session.classroomName}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${
                            modeBadge[session.mode] ?? 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {session.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {session.score !== undefined && session.totalQuestions
                          ? `${session.score}/${session.totalQuestions}`
                          : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDuration(session.startedAt, session.completedAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(session.startedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
