'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import TopicList from '@/components/TopicList';
import type { Topic, Lesson } from '@/lib/types';
import { getTopics, getLessons } from '@/lib/api';

interface TopicWithLessons extends Topic {
  lessons: Lesson[];
  completedCount: number;
}

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { user } = useAuth();
  const { subjects, completedLessonIds, initForUser } = useApp();
  const [topicsWithLessons, setTopicsWithLessons] = useState<TopicWithLessons[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const subject = subjects.find((s) => s.id === subjectId);

  useEffect(() => {
    if (user) initForUser(user);
  }, [user, initForUser]);

  useEffect(() => {
    if (!subjectId) return;
    async function loadData() {
      setLoading(true);
      const topicList = await getTopics(subjectId);
      const withLessons = await Promise.all(
        topicList.map(async (topic) => {
          const lessons = await getLessons(topic.id);
          return { ...topic, lessons, completedCount: 0 };
        })
      );
      setTopicsWithLessons(withLessons);
      if (withLessons.length > 0 && !selectedTopicId) {
        setSelectedTopicId(withLessons[0].id);
      }
      setLoading(false);
    }
    loadData();
  }, [subjectId, selectedTopicId]);

  const enrichedTopics: TopicWithLessons[] = topicsWithLessons.map((t) => ({
    ...t,
    completedCount: t.lessons.filter((l) => completedLessonIds.includes(l.id)).length,
  }));

  const selectedTopic = enrichedTopics.find((t) => t.id === selectedTopicId);

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="lg:col-span-2 h-64 bg-slate-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/dashboard/subjects"
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4 inline-flex items-center gap-1"
        >
          ← Subjects
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-2">
          {subject?.name ?? 'Subject'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">{subject?.description}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Topics
          </h2>
          <TopicList
            topics={enrichedTopics}
            onSelectTopic={setSelectedTopicId}
            selectedTopicId={selectedTopicId ?? undefined}
          />
        </div>

        <div className="lg:col-span-3">
          {selectedTopic ? (
            <div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4">
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  {selectedTopic.name}
                </h2>
                <p className="text-slate-500 text-sm mb-4">{selectedTopic.description}</p>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                  {selectedTopic.completedCount} of {selectedTopic.lessons.length} lessons complete
                </p>
              </div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Lessons
              </h3>
              <div className="space-y-2">
                {selectedTopic.lessons.map((lesson, index) => {
                  const isDone = completedLessonIds.includes(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={`/dashboard/lesson/${lesson.id}`}
                      className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-sm transition-all group"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}
                      >
                        {isDone ? '✓' : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lesson.content[0].slice(0, 80)}...
                        </p>
                      </div>
                      <span className="text-slate-300 group-hover:text-slate-400 transition-colors text-sm">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <p className="text-slate-400">Select a topic to view its lessons.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
