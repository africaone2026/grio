'use client';

import type { Lesson } from '@/lib/types';

interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete: () => void;
  isMarking?: boolean;
}

export default function LessonView({
  lesson,
  isCompleted,
  onMarkComplete,
  isMarking = false,
}: LessonViewProps) {
  return (
    <article className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {lesson.title}
        </h1>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
            <span>✓</span> Completed
          </span>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {lesson.content.map((paragraph, i) => (
          <p key={i} className="text-slate-700 leading-relaxed text-base">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">
          Worked Example
        </h2>
        <p className="text-sm font-semibold text-slate-800 mb-2">
          {lesson.example.title}
        </p>
        <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed bg-white rounded-lg border border-blue-100 p-4">
          {lesson.example.body}
        </pre>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
          Practice Question
        </h2>
        <p className="text-slate-800 font-medium mb-3">
          {lesson.practiceQuestion.question}
        </p>
        <details className="group">
          <summary className="text-sm text-amber-700 cursor-pointer hover:text-amber-800 font-medium list-none flex items-center gap-1.5">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            Show Hint
          </summary>
          <p className="mt-3 text-sm text-slate-600 bg-white rounded-lg border border-amber-100 p-3">
            {lesson.practiceQuestion.hint}
          </p>
        </details>
      </div>

      <div className="flex items-center gap-4">
        {isCompleted ? (
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">✓</span>
            Lesson complete
          </div>
        ) : (
          <button
            onClick={onMarkComplete}
            disabled={isMarking}
            className="px-6 py-3 bg-[#0f2a4a] text-white rounded-lg font-semibold hover:bg-[#1a3d6b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isMarking ? 'Saving...' : 'Mark as Complete'}
          </button>
        )}
      </div>
    </article>
  );
}
