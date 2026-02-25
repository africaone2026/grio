'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSubjects, getTopics } from '@/lib/api';
import type { Subject, Topic } from '@/lib/types';

export default function SchoolAdminSubjectsPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.curriculumId) return;
    getSubjects(user.curriculumId).then(async (subs) => {
      setSubjects(subs);
      const allTopics = await Promise.all(subs.map((s) => getTopics(s.id)));
      setTopics(allTopics.flat());
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 w-40 bg-slate-200 rounded" />
        <div className="grid grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Subjects</h1>
        <p className="text-slate-500 text-sm mt-1">
          {subjects.length} subjects in your curriculum
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const subjectTopics = topics.filter((t) => t.subjectId === subject.id);
          return (
            <div
              key={subject.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${subject.color}20` }}
                >
                  {subject.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-800">{subject.name}</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{subject.description}</p>
              <p className="text-xs text-slate-400 font-medium">
                {subjectTopics.length} {subjectTopics.length === 1 ? 'topic' : 'topics'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
