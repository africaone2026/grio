'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import ProgressBar from '@/components/ProgressBar';
import { lessons } from '@/lib/mockData';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ProgressPage() {
  const { user } = useAuth();
  const { userProgress, completedLessonIds, initForUser } = useApp();

  useEffect(() => {
    if (user) initForUser(user);
  }, [user, initForUser]);

  if (!user || !userProgress) {
    return (
      <div className="p-8">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-4 bg-slate-200 rounded" />
          <div className="h-32 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const allLessons = lessons;
  const heatmapLessons = allLessons.slice(0, 60);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Progress</h1>
        <p className="text-slate-500 text-sm mt-1">
          {userProgress.completedLessons} of {userProgress.totalLessons} lessons completed
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
          <p className="text-4xl font-bold text-slate-900">{userProgress.overallPercentage}%</p>
          <p className="text-sm text-slate-500 mt-1">Overall Completion</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
          <p className="text-4xl font-bold text-slate-900">{userProgress.completedLessons}</p>
          <p className="text-sm text-slate-500 mt-1">Lessons Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center">
          <p className="text-4xl font-bold text-slate-900">
            {userProgress.subjectProgress.filter((s) => s.completedLessons > 0).length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Subjects Started</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-5">Progress by Subject</h2>
          <div className="space-y-5">
            {userProgress.subjectProgress.map((sp) => (
              <ProgressBar
                key={sp.subjectId}
                label={sp.subjectName}
                percentage={sp.percentage}
                height="md"
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-5">Completion Map</h2>
          <p className="text-xs text-slate-400 mb-4">
            Each square represents a lesson. Green = completed.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {heatmapLessons.map((lesson) => {
              const done = completedLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  title={lesson.title}
                  className={`w-5 h-5 rounded-sm transition-colors ${
                    done ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
              <span className="text-xs text-slate-400">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-slate-200 rounded-sm" />
              <span className="text-xs text-slate-400">Not started</span>
            </div>
          </div>
        </div>
      </div>

      {userProgress.recentActivity.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-5">Recent Activity</h2>
          <div className="space-y-3">
            {userProgress.recentActivity.map((activity) => (
              <div
                key={`${activity.lessonId}-${activity.completedAt}`}
                className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs text-emerald-600 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{activity.lessonTitle}</p>
                    <p className="text-xs text-slate-400">
                      {activity.subjectName} — {activity.topicName}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 ml-4">
                  {formatDate(activity.completedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
