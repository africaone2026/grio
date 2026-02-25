'use client';

import Link from 'next/link';
import ProgressBar from './ProgressBar';
import type { Subject } from '@/lib/types';

interface SubjectCardProps {
  subject: Subject;
  topicCount?: number;
  completedLessons?: number;
  totalLessons?: number;
  progressPercent?: number;
  href?: string;
}

const subjectIcons: Record<string, string> = {
  calculator: '∑',
  'book-open': '📖',
  zap: '⚡',
  flask: '⚗️',
  leaf: '🌿',
  globe: '🌍',
  map: '🗺️',
};

export default function SubjectCard({
  subject,
  topicCount,
  completedLessons = 0,
  totalLessons = 0,
  progressPercent = 0,
  href,
}: SubjectCardProps) {
  const icon = subjectIcons[subject.icon] ?? '📚';

  const card = (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: `${subject.color}18` }}
        >
          <span>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
            {subject.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
            {subject.description}
          </p>
        </div>
      </div>

      {topicCount !== undefined && (
        <p className="mt-4 text-xs text-slate-400 font-medium uppercase tracking-wide">
          {topicCount} Topics &middot; {totalLessons} Lessons
        </p>
      )}

      <div className="mt-4">
        <ProgressBar percentage={progressPercent} height="sm" showPercentage={false} />
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-slate-400">
            {completedLessons} of {totalLessons} lessons complete
          </span>
          <span className="text-xs font-semibold text-slate-600">
            {progressPercent}%
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
