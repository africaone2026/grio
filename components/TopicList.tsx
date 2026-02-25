'use client';

import type { Topic, Lesson } from '@/lib/types';

interface TopicWithLessons extends Topic {
  lessons: Lesson[];
  completedCount: number;
}

interface TopicListProps {
  topics: TopicWithLessons[];
  onSelectTopic: (topicId: string) => void;
  selectedTopicId?: string;
}

export default function TopicList({
  topics,
  onSelectTopic,
  selectedTopicId,
}: TopicListProps) {
  return (
    <div className="space-y-2">
      {topics.map((topic, index) => {
        const total = topic.lessons.length;
        const completed = topic.completedCount;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        const isSelected = selectedTopicId === topic.id;
        const isComplete = total > 0 && completed === total;

        return (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className={`w-full text-left rounded-lg border transition-all p-4 ${
              isSelected
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isComplete
                    ? 'bg-emerald-500 text-white'
                    : isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isComplete ? '✓' : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-sm truncate ${
                    isSelected ? 'text-blue-700' : 'text-slate-800'
                  }`}
                >
                  {topic.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {completed}/{total} lessons &middot; {pct}%
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-1.5 bg-slate-200 rounded-full">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isComplete ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
