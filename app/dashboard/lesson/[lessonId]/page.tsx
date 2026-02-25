'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import LessonView from '@/components/LessonView';
import { getLesson } from '@/lib/api';
import type { Lesson } from '@/lib/types';
import { topics, subjects } from '@/lib/mockData';

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useAuth();
  const { completedLessonIds, markLessonComplete } = useApp();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isMarking, setIsMarking] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    getLesson(lessonId)
      .then((l) => {
        setLesson(l);
      })
      .catch(() => {
        setLoadError('Failed to load lesson. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lessonId]);

  const topic = lesson ? topics.find((t) => t.id === lesson.topicId) : null;
  const subject = topic ? subjects.find((s) => s.id === topic.subjectId) : null;
  const isCompleted = lessonId ? completedLessonIds.includes(lessonId) : false;

  async function handleMarkComplete() {
    if (!user || !lessonId) return;
    setIsMarking(true);
    await markLessonComplete(user.id, lessonId);
    setIsMarking(false);
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-3xl space-y-4 animate-pulse">
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="h-8 w-96 bg-slate-200 rounded" />
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-3/4 bg-slate-200 rounded" />
          <div className="h-32 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {loadError}
        </div>
        <Link href="/dashboard/subjects" className="text-blue-600 text-sm inline-block">
          ← Back to Subjects
        </Link>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-8">
        <p className="text-slate-500">Lesson not found.</p>
        <Link href="/dashboard/subjects" className="text-blue-600 text-sm mt-2 inline-block">
          ← Back to Subjects
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
          <Link href="/dashboard/subjects" className="hover:text-slate-600 transition-colors">
            Subjects
          </Link>
          {subject && (
            <>
              <span>/</span>
              <Link
                href={`/dashboard/subjects/${subject.id}`}
                className="hover:text-slate-600 transition-colors"
              >
                {subject.name}
              </Link>
            </>
          )}
          {topic && (
            <>
              <span>/</span>
              <span className="text-slate-600">{topic.name}</span>
            </>
          )}
        </nav>
      </div>

      <LessonView
        lesson={lesson}
        isCompleted={isCompleted}
        onMarkComplete={handleMarkComplete}
        isMarking={isMarking}
      />
    </div>
  );
}
