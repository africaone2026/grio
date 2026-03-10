'use client';

import { useState, useEffect } from 'react';
import { getSubjects } from '@/lib/api';
import { curricula } from '@/lib/mockData';
import type { Subject } from '@/lib/types';

export default function AdminSubjectsPage() {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        curricula.map((c) => getSubjects(c.id))
      );
      setAllSubjects(results.flat());
      setLoading(false);
    }
    load();
  }, []);

  const filtered = allSubjects.filter((s) =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  function getCurriculumName(curriculumId: string) {
    return curricula.find((c) => c.id === curriculumId)?.name ?? curriculumId;
  }

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 w-40 bg-gray-200 rounded" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
          <p className="text-gray-500 text-sm mt-1">{allSubjects.length} subjects across all curricula</p>
        </div>
        <input
          type="text"
          placeholder="Search subjects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-56"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span className="col-span-4">Subject</span>
          <span className="col-span-5">Curriculum</span>
          <span className="col-span-3">Description</span>
        </div>
        <div className="divide-y divide-gray-100">
          {filtered.map((subject) => (
            <div
              key={subject.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ backgroundColor: `${subject.color}20` }}
                >
                  📚
                </div>
                <p className="text-sm font-medium text-gray-800">{subject.name}</p>
              </div>
              <p className="col-span-5 text-sm text-gray-500 truncate">
                {getCurriculumName(subject.curriculumId)}
              </p>
              <p className="col-span-3 text-sm text-gray-400 truncate">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
