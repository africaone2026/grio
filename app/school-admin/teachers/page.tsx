'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUsersBySchool } from '@/lib/api';
import type { User } from '@/lib/types';

export default function SchoolAdminTeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.schoolId) return;
    getUsersBySchool(user.schoolId).then((users) => {
      setTeachers(users.filter((u) => u.role === 'teacher'));
      setLoading(false);
    });
  }, [user]);

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
        <h1 className="text-2xl font-bold text-slate-900">Teachers</h1>
        <p className="text-slate-500 text-sm mt-1">{teachers.length} teachers at your school</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <span className="col-span-5">Name</span>
          <span className="col-span-4">Email</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-1 text-center">Role</span>
        </div>
        <div className="divide-y divide-slate-100">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50"
            >
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {teacher.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{teacher.name}</p>
              </div>
              <p className="col-span-4 text-sm text-slate-500 truncate">{teacher.email}</p>
              <div className="col-span-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    teacher.subscriptionStatus === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {teacher.subscriptionStatus}
                </span>
              </div>
              <div className="col-span-1 flex justify-center">
                <span className="text-xs text-slate-400 capitalize">
                  {teacher.role.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
