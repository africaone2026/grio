'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSchoolAnalytics, getSchool } from '@/lib/api';
import type { SchoolAnalytics, School } from '@/lib/types';

export default function SchoolAdminOverviewPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<SchoolAnalytics | null>(null);
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.schoolId) return;
    Promise.all([
      getSchoolAnalytics(user.schoolId),
      getSchool(user.schoolId),
    ]).then(([a, s]) => {
      setAnalytics(a);
      setSchool(s);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const stats = [
    { label: 'Total Students', value: analytics.totalStudents, color: 'blue' },
    { label: 'Teachers', value: analytics.totalTeachers, color: 'emerald' },
    { label: 'Classrooms', value: analytics.activeClassrooms, color: 'amber' },
    { label: 'Avg Completion', value: `${analytics.averageCompletion}%`, color: 'slate' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{school?.name ?? 'School'}</h1>
        <p className="text-slate-500 text-sm mt-1">
          School overview and performance summary.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Classroom Performance</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {analytics.classroomBreakdown.map((cls) => (
              <div key={cls.classroomId} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{cls.classroomName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{cls.studentCount} students</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${cls.averageCompletion}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-10 text-right">
                    {cls.averageCompletion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Subject Completion</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {analytics.subjectBreakdown.map((sub) => (
              <div key={sub.subjectId} className="px-6 py-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800 truncate max-w-[180px]">
                  {sub.subjectName}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-10 text-right">
                    {sub.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
