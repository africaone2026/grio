'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import { getAdminAnalytics, getGlobalAnalytics } from '@/lib/api';
import type { AdminAnalytics, GlobalAnalytics } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar';
import { users } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [global, setGlobal] = useState<GlobalAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { sessions } = useApp();

  useEffect(() => {
    Promise.all([getAdminAnalytics(), getGlobalAnalytics()]).then(([a, g]) => {
      setAnalytics(a);
      setGlobal(g);
      setLoading(false);
    });
  }, []);

  const sessionsBySchool = sessions.reduce<Record<string, { name: string; count: number }>>(
    (acc, s) => {
      if (!acc[s.schoolId]) acc[s.schoolId] = { name: s.schoolName, count: 0 };
      acc[s.schoolId].count += 1;
      return acc;
    },
    {}
  );

  const sessionsBySubject = sessions.reduce<Record<string, number>>((acc, s) => {
    acc[s.subjectName] = (acc[s.subjectName] ?? 0) + 1;
    return acc;
  }, {});

  const quizSessions = sessions.filter(
    (s) => (s.mode === 'quiz' || s.mode === 'revision') && s.score !== undefined && s.totalQuestions
  );
  const avgQuizScore =
    quizSessions.length > 0
      ? Math.round(
          quizSessions.reduce((sum, s) => sum + (s.score! / s.totalQuestions!) * 100, 0) /
            quizSessions.length
        )
      : null;

  const roleBreakdown = [
    { label: 'Learners', count: users.filter((u) => u.role === 'independent').length, color: 'bg-blue-500' },
    { label: 'Teachers', count: users.filter((u) => u.role === 'teacher').length, color: 'bg-emerald-500' },
    { label: 'School Admins', count: users.filter((u) => u.role === 'school_admin').length, color: 'bg-amber-500' },
    { label: 'Super Admins', count: users.filter((u) => u.role === 'super_admin').length, color: 'bg-slate-500' },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Platform Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Live overview of GRIO platform usage.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <StatCard label="Total Users" value={analytics.totalUsers} />
        <StatCard
          label="Active Subscriptions"
          value={analytics.activeSubscriptions}
          sub={`${Math.round((analytics.activeSubscriptions / analytics.totalUsers) * 100)}% of users`}
        />
        <StatCard label="Total Schools" value={global?.totalSchools ?? 0} />
        <StatCard label="Total Lessons" value={analytics.totalLessons} />
        <StatCard
          label="Avg. Completion"
          value={`${analytics.averageCompletion}%`}
          sub="across all learners"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-5">User Breakdown by Role</h2>
          <div className="space-y-4">
            {roleBreakdown.map((role) => (
              <div key={role.label} className="flex items-center gap-4">
                <span className="w-28 text-sm text-slate-600">{role.label}</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full">
                  <div
                    className={`h-2 rounded-full ${role.color}`}
                    style={{
                      width: `${(role.count / analytics.totalUsers) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-sm font-semibold text-slate-700 text-right">
                  {role.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-5">Subscription Status</h2>
          <div className="space-y-4">
            <ProgressBar
              label={`Active (${analytics.activeSubscriptions})`}
              percentage={Math.round((analytics.activeSubscriptions / analytics.totalUsers) * 100)}
              color="bg-emerald-500"
            />
            <ProgressBar
              label={`Inactive (${analytics.totalUsers - analytics.activeSubscriptions})`}
              percentage={Math.round(
                ((analytics.totalUsers - analytics.activeSubscriptions) / analytics.totalUsers) * 100
              )}
              color="bg-slate-400"
            />
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Average platform completion across all learners:{' '}
              <span className="font-bold text-slate-900">{analytics.averageCompletion}%</span>
            </p>
          </div>
        </div>
      </div>

      {global && global.countryBreakdown.length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-5">Country Breakdown</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {global.countryBreakdown.map((c) => (
              <div key={c.countryId} className="border border-slate-100 rounded-xl p-5">
                <p className="text-sm font-semibold text-slate-800 mb-1">{c.countryName}</p>
                <div className="flex gap-4 text-xs text-slate-500 mb-3">
                  <span>{c.schoolCount} {c.schoolCount === 1 ? 'school' : 'schools'}</span>
                  <span>{c.userCount} users</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${c.averageCompletion}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{c.averageCompletion}% avg completion</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900">Classroom Sessions</h2>
          {sessions.length > 0 && (
            <span className="text-sm text-slate-500">{sessions.length} total sessions</span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Total Sessions</p>
            <p className="text-3xl font-bold text-slate-900">{sessions.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Teach Mode</p>
            <p className="text-3xl font-bold text-teal-600">
              {sessions.filter((s) => s.mode === 'teach').length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Quiz Mode</p>
            <p className="text-3xl font-bold text-blue-600">
              {sessions.filter((s) => s.mode === 'quiz').length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Avg Quiz Score</p>
            <p className="text-3xl font-bold text-slate-900">
              {avgQuizScore !== null ? `${avgQuizScore}%` : '—'}
            </p>
          </div>
        </div>

        {sessions.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Sessions by School</h3>
              {Object.keys(sessionsBySchool).length === 0 ? (
                <p className="text-sm text-slate-400">No school data available.</p>
              ) : (
                <div className="space-y-3">
                  {Object.values(sessionsBySchool).map((school) => (
                    <div key={school.name} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">{school.name}</span>
                      <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                        {school.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Sessions by Subject</h3>
              {Object.keys(sessionsBySubject).length === 0 ? (
                <p className="text-sm text-slate-400">No subject data available.</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(sessionsBySubject).map(([subject, count]) => (
                    <div key={subject} className="flex items-center gap-4">
                      <span className="w-28 text-sm text-slate-600 truncate">{subject}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{
                            width: `${(count / sessions.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="w-6 text-sm font-semibold text-slate-700 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <p className="text-slate-400 text-sm">
              No classroom sessions have been conducted yet. Sessions will appear here once teachers use Classroom Mode.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
