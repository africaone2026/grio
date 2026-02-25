'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUsersBySchool, getClassroomsBySchool } from '@/lib/api';
import type { User, Classroom } from '@/lib/types';

export default function SchoolAdminStudentsPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<User[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [classroomFilter, setClassroomFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.schoolId) return;
    Promise.all([
      getUsersBySchool(user.schoolId),
      getClassroomsBySchool(user.schoolId),
    ]).then(([users, cls]) => {
      setStudents(users.filter((u) => u.role === 'independent'));
      setClassrooms(cls);
      setLoading(false);
    });
  }, [user]);

  const filtered = students.filter((s) => {
    const matchesSearch =
      !search || s.name.toLowerCase().includes(search.toLowerCase());
    const matchesClassroom = !classroomFilter || s.classroomId === classroomFilter;
    return matchesSearch && matchesClassroom;
  });

  function getClassroomName(classroomId: string | null) {
    if (!classroomId) return '—';
    return classrooms.find((c) => c.id === classroomId)?.name ?? classroomId;
  }

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 w-40 bg-slate-200 rounded" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Students</h1>
        <p className="text-slate-500 text-sm mt-1">{students.length} students enrolled</p>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-56"
        />
        <select
          value={classroomFilter}
          onChange={(e) => setClassroomFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
        >
          <option value="">All Classrooms</option>
          {classrooms.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <span className="col-span-5">Student</span>
          <span className="col-span-4">Email</span>
          <span className="col-span-2">Classroom</span>
          <span className="col-span-1 text-center">Status</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
          {filtered.map((student) => (
            <div
              key={student.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50"
            >
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {student.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{student.name}</p>
              </div>
              <p className="col-span-4 text-sm text-slate-500 truncate">{student.email}</p>
              <p className="col-span-2 text-sm text-slate-500">{getClassroomName(student.classroomId)}</p>
              <div className="col-span-1 flex justify-center">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    student.subscriptionStatus === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : student.subscriptionStatus === 'trial'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {student.subscriptionStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">
            Showing {filtered.length} of {students.length} students
          </p>
        </div>
      </div>
    </div>
  );
}
