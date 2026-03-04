'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import SubjectCard from '@/components/SubjectCard';
import ProgressBar from '@/components/ProgressBar';
import SkeletonLoader from '@/components/SkeletonLoader';
import EmptyState from '@/components/EmptyState';

export default function SubjectsPage() {
  const { user } = useAuth();
  const { subjects, userProgress, initForUser, isLoadingSubjects } = useApp();

  useEffect(() => {
    if (user) initForUser(user);
  }, [user, initForUser]);

  if (!user) return null;

  const subjectTopicCounts: Record<string, number> = {
    'math-ug-sec': 5,
    'eng-ug-sec': 4,
    'phy-ug-sec': 5,
    'chem-ug-sec': 4,
    'bio-ug-sec': 5,
    'hist-ug-sec': 4,
    'geo-ug-sec': 4,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Subjects</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Your curriculum: <span className="font-medium text-slate-700">Uganda Secondary</span>
        </p>
      </div>

      {userProgress && (
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Overall Progress</h2>
            <span className="text-sm font-bold text-slate-700">
              {userProgress.overallPercentage}%
            </span>
          </div>
          <ProgressBar percentage={userProgress.overallPercentage} showPercentage={false} height="lg" />
          <p className="text-xs text-slate-400 mt-2">
            {userProgress.completedLessons} of {userProgress.totalLessons} lessons completed
          </p>
        </div>
      )}

      {isLoadingSubjects ? (
        <SkeletonLoader variant="card" count={6} className="grid lg:grid-cols-3 gap-6" />
      ) : subjects.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No subjects available"
          description="Subjects will appear here once they are added to your curriculum."
        />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const sp = userProgress?.subjectProgress.find(
              (s) => s.subjectId === subject.id
            );
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
  );
}
