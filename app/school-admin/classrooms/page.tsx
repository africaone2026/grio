'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getClassroomsBySchool, getUsersBySchool } from '@/lib/api';
import type { Classroom, User } from '@/lib/types';

export default function SchoolAdminClassroomsPage() {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.schoolId) return;
    Promise.all([
      getClassroomsBySchool(user.schoolId),
      getUsersBySchool(user.schoolId),
    ]).then(([cls, users]) => {
      setClassrooms(cls);
      setStudents(users.filter((u) => u.role === 'independent'));
      setLoading(false);
    });
  }, [user]);

  function getStudentCount(classroomId: string) {
    return students.filter((s) => s.classroomId === classroomId).length;
  }

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 w-40 bg-slate-200 rounded" />
        <div className="grid grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-36 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Classrooms</h1>
        <p className="text-slate-500 text-sm mt-1">
          {classrooms.length} classrooms in your school
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((cls) => {
          const count = getStudentCount(cls.id);
          return (
            <div
              key={cls.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🏫</span>
                </div>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  {cls.level}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{cls.name}</h3>
              <p className="text-sm text-slate-500">
                {count} {count === 1 ? 'student' : 'students'} enrolled
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
