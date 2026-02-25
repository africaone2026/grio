'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import SubjectCard from '@/components/SubjectCard';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import { topics as allTopics } from '@/lib/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const { subjects, userProgress, completedLessonIds, initForUser, isLoadingSubjects } = useApp();

  useEffect(() => {
    if (user) {
      initForUser(user);
    }
  }, [user, initForUser]);

  if (!user) return null;

  const subjectsStarted = userProgress?.subjectProgress.filter((s) => s.completedLessons > 0).length ?? 0;
  const overallPct = userProgress?.overallPercentage ?? 0;
  const totalCompleted = userProgress?.completedLessons ?? 0;
  const lastLesson = userProgress?.recentActivity[0];

  const getSubjectProgress = (subjectId: string) => {
    return userProgress?.subjectProgress.find((s) => s.subjectId === subjectId);
  };

  const subjectTopicCounts: Record<string, number> = {};
  for (const subject of subjects) {
    subjectTopicCounts[subject.id] = allTopics.filter((t) => t.subjectId === subject.id).length;
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
            user.subscriptionStatus === 'active'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : user.subscriptionStatus === 'trial'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {user.subscriptionStatus === 'active'
            ? 'Active'
            : user.subscriptionStatus === 'trial'
            ? 'Trial'
            : 'Inactive'}
        </span>
      </div>

      {lastLesson && (
        <div className="mb-8 bg-[#0f2a4a] rounded-xl p-6 text-white flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">
              Resume where you left off
            </p>
            <p className="font-semibold text-lg">{lastLesson.lessonTitle}</p>
            <p className="text-slate-400 text-sm mt-0.5">
              {lastLesson.subjectName} — {lastLesson.topicName}
            </p>
          </div>
          <Link
            href={`/dashboard/lesson/${lastLesson.lessonId}`}
            className="flex-shrink-0 ml-6 px-5 py-2.5 bg-white text-[#0f2a4a] font-semibold rounded-lg text-sm hover:bg-slate-100 transition-colors"
          >
            Continue →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Lessons Completed"
          value={totalCompleted}
          sub={`of ${userProgress?.totalLessons ?? 0} total`}
        />
        <StatCard
          label="Subjects Started"
          value={subjectsStarted}
          sub={`of ${subjects.length} subjects`}
        />
        <StatCard
          label="Overall Completion"
          value={`${overallPct}%`}
          sub="across all subjects"
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-slate-600">Overall Progress</p>
          <span className="text-sm font-bold text-slate-700">{overallPct}%</span>
        </div>
        <ProgressBar percentage={overallPct} showPercentage={false} height="lg" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Your Subjects</h2>
          <Link
            href="/dashboard/subjects"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>
        {isLoadingSubjects ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {subjects.slice(0, 6).map((subject) => {
              const sp = getSubjectProgress(subject.id);
              return (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  topicCount={subjectTopicCounts[subject.id] ?? 4}
                  completedLessons={sp?.completedLessons ?? 0}
                  totalLessons={sp?.totalLessons ?? 0}
                  progressPercent={sp?.percentage ?? 0}
                  href={`/dashboard/subjects/${subject.id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
