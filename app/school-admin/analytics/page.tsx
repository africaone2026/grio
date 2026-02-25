'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSchoolAnalytics } from '@/lib/api';
import type { SchoolAnalytics } from '@/lib/types';

function exportCSV(analytics: SchoolAnalytics) {
  const rows: string[][] = [
    ['Section', 'Name', 'Value', 'Detail'],
    ...analytics.classroomBreakdown.map((cls) => [
      'Classroom',
      cls.classroomName,
      `${cls.averageCompletion}%`,
      `${cls.studentCount} students`,
    ]),
    ...analytics.subjectBreakdown.map((sub) => [
      'Subject',
      sub.subjectName,
      `${sub.percentage}%`,
      `${sub.completedLessons}/${sub.totalLessons} lessons`,
    ]),
    ['Summary', 'Total Students', String(analytics.totalStudents), ''],
    ['Summary', 'Total Teachers', String(analytics.totalTeachers), ''],
    ['Summary', 'Overall Completion', `${analytics.averageCompletion}%`, ''],
  ];
  const csv = rows.map((r) => r.map((cell) => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics-${analytics.schoolName.replace(/\s+/g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SchoolAdminAnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<SchoolAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [classroomFilter, setClassroomFilter] = useState('');

  useEffect(() => {
    if (!user?.schoolId) return;
    getSchoolAnalytics(user.schoolId).then((a) => {
      setAnalytics(a);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="h-8 w-40 bg-slate-200 rounded" />
        <div className="grid grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const filteredClassrooms = classroomFilter
    ? analytics.classroomBreakdown.filter((cls) =>
        cls.classroomName.toLowerCase().includes(classroomFilter.toLowerCase())
      )
    : analytics.classroomBreakdown;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">
            Detailed performance metrics for {analytics.schoolName}
          </p>
        </div>
        <button
          onClick={() => exportCSV(analytics)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-700">Classroom Breakdown</h2>
            <input
              type="search"
              placeholder="Filter classrooms..."
              value={classroomFilter}
              onChange={(e) => setClassroomFilter(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
              aria-label="Filter classrooms"
            />
          </div>
          <div className="p-6 space-y-5">
            {filteredClassrooms.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No classrooms match your filter.</p>
            ) : (
              filteredClassrooms.map((cls) => (
                <div key={cls.classroomId}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{cls.classroomName}</span>
                    <span className="text-sm font-bold text-slate-900">{cls.averageCompletion}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${cls.averageCompletion}%`,
                        backgroundColor:
                          cls.averageCompletion >= 60
                            ? '#10b981'
                            : cls.averageCompletion >= 30
                            ? '#f59e0b'
                            : '#ef4444',
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{cls.studentCount} students</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Subject Completion</h2>
          </div>
          <div className="p-6 space-y-5">
            {analytics.subjectBreakdown.map((sub) => (
              <div key={sub.subjectId}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                    {sub.subjectName}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{sub.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {sub.completedLessons} of {sub.totalLessons} lesson completions
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">School Summary</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">{analytics.totalStudents}</p>
            <p className="text-sm text-slate-500 mt-1">Total Students</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">{analytics.totalTeachers}</p>
            <p className="text-sm text-slate-500 mt-1">Total Teachers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">{analytics.averageCompletion}%</p>
            <p className="text-sm text-slate-500 mt-1">Overall Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
