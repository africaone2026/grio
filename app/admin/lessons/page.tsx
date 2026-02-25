'use client';

import { useState } from 'react';
import { lessons, topics, subjects } from '@/lib/mockData';

export default function AdminLessonsPage() {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  const ugSecSubjects = subjects.filter((s) => s.curriculumId === 'ug-secondary-cur');

  const enrichedLessons = lessons.map((lesson) => {
    const topic = topics.find((t) => t.id === lesson.topicId);
    const subject = topic ? subjects.find((s) => s.id === topic.subjectId) : null;
    return { ...lesson, topicName: topic?.name ?? '', subjectName: subject?.name ?? '', subjectId: subject?.id ?? '' };
  });

  const filtered = enrichedLessons.filter((lesson) => {
    const matchesSearch =
      !search || lesson.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = !subjectFilter || lesson.subjectId === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Lessons</h1>
        <p className="text-slate-500 text-sm mt-1">{lessons.length} lessons across all subjects</p>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-64"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
        >
          <option value="">All Subjects</option>
          {ugSecSubjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <span className="col-span-5">Lesson</span>
          <span className="col-span-3">Subject</span>
          <span className="col-span-3">Topic</span>
          <span className="col-span-1 text-center">#</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
          {filtered.map((lesson) => (
            <div
              key={lesson.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors"
            >
              <p className="col-span-5 text-sm font-medium text-slate-800 truncate">
                {lesson.title}
              </p>
              <p className="col-span-3 text-sm text-slate-500 truncate">{lesson.subjectName}</p>
              <p className="col-span-3 text-sm text-slate-400 truncate">{lesson.topicName}</p>
              <span className="col-span-1 text-xs text-center text-slate-400">{lesson.order}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">
            Showing {filtered.length} of {lessons.length} lessons
          </p>
        </div>
      </div>
    </div>
  );
}
