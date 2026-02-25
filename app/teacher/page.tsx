'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getStudentsByTeacher, getSubjects, getSchool, getClassroomsBySchool } from '@/lib/api';
import StatCard from '@/components/StatCard';
import Link from 'next/link';
import type { User, Subject, School, Classroom } from '@/lib/types';

export default function TeacherOverviewPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [school, setSchool] = useState<School | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const promises: Promise<unknown>[] = [
      getStudentsByTeacher(user.id).then(setStudents),
      getSubjects(user.curriculumId).then(setSubjects),
    ];
    if (user.schoolId) {
      promises.push(
        getSchool(user.schoolId).then((s) => setSchool(s)),
        getClassroomsBySchool(user.schoolId).then(setClassrooms)
      );
    }
    Promise.all(promises).then(() => setLoading(false));
  }, [user]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-slate-200 rounded-xl" />)}
        </div>
      </div>
    );
  }

  const previewStudents = students.slice(0, 6);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome, {user.name.split(' ')[0]}
        </h1>
        {school && (
          <p className="text-slate-500 text-sm mt-1">{school.name}</p>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="My Subjects" value={subjects.length} />
        <StatCard label="Total Students" value={students.length} />
        <StatCard label="Classrooms" value={classrooms.length} />
        <StatCard label="School Active" value={school?.subscriptionStatus === 'active' ? 'Yes' : 'No'} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-900">Students</h2>
              <Link href="/teacher/students" className="text-sm text-blue-600 hover:text-blue-700">
                View all →
              </Link>
            </div>
            <div className="space-y-1">
              {previewStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{student.name}</p>
                    <p className="text-xs text-slate-400 capitalize">
                      {classrooms.find((c) => c.id === student.classroomId)?.name ?? 'No classroom'}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      student.subscriptionStatus === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {student.subscriptionStatus}
                  </span>
                </div>
              ))}
              {students.length === 0 && (
                <p className="text-sm text-slate-400 py-4 text-center">No students found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 mb-4">My Subjects</h2>
            <div className="space-y-3">
              {subjects.slice(0, 4).map((subject) => (
                <Link
                  key={subject.id}
                  href="/teacher/subjects"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-base">{subject.icon}</span>
                  <p className="text-sm font-medium text-slate-800 truncate">{subject.name}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Classrooms', href: '/teacher/classrooms', icon: '🏫' },
                { label: 'Lesson Planner', href: '/teacher/planner', icon: '📝' },
                { label: 'AI Assistant', href: '/teacher/assistant', icon: '✦' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">{action.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
