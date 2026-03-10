'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getStudentsByTeacher, getSubjects, getSchool, getClassroomsBySchool } from '@/lib/api';
import StatCard from '@/components/StatCard';
import DashboardCard from '@/components/DashboardCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import EmptyState from '@/components/EmptyState';
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
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <SkeletonLoader variant="stat" count={4} className="grid grid-cols-4 gap-6" />
      </div>
    );
  }

  const previewStudents = students.slice(0, 6);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user.name.split(' ')[0]}
        </h1>
        {school && (
          <p className="text-gray-500 text-sm mt-1">{school.name}</p>
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
          <DashboardCard
            header={
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Students</h2>
                <Link href="/teacher/students" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </Link>
              </div>
            }
          >
            <div className="space-y-1">
              {previewStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {classrooms.find((c) => c.id === student.classroomId)?.name ?? 'No classroom'}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      student.subscriptionStatus === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {student.subscriptionStatus}
                  </span>
                </div>
              ))}
              {students.length === 0 && (
                <EmptyState
                  icon="👥"
                  title="No students found"
                  description="Students will appear here once they are added to your classes."
                />
              )}
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-6">
          <DashboardCard
            header={<h2 className="font-bold text-gray-900 mb-4">My Subjects</h2>}
          >
            <div className="space-y-3">
              {subjects.slice(0, 4).map((subject) => (
                <Link
                  key={subject.id}
                  href="/teacher/subjects"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-base">{subject.icon}</span>
                  <p className="text-sm font-medium text-gray-800 truncate">{subject.name}</p>
                </Link>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            header={<h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>}
          >
            <div className="space-y-2">
              {[
                { label: 'Classrooms', href: '/teacher/classrooms', icon: '🏫' },
                { label: 'Lesson Planner', href: '/teacher/planner', icon: '📝' },
                { label: 'AI Assistant', href: '/teacher/assistant', icon: '✦' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
