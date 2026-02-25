'use client';

import { useState, useEffect } from 'react';
import { getSchools, toggleSchoolSubscription, getUsersBySchool } from '@/lib/api';
import { countries, curricula } from '@/lib/mockData';
import type { School } from '@/lib/types';

interface SchoolWithCount extends School {
  userCount: number;
}

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<SchoolWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSchools().then(async (list) => {
      const enriched = await Promise.all(
        list.map(async (s) => {
          const users = await getUsersBySchool(s.id);
          return { ...s, userCount: users.length };
        })
      );
      setSchools(enriched);
      setLoading(false);
    });
  }, []);

  async function handleToggle(schoolId: string) {
    const updated = await toggleSchoolSubscription(schoolId);
    setSchools((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, subscriptionStatus: updated.subscriptionStatus } : s))
    );
  }

  function getCountryName(countryId: string) {
    return countries.find((c) => c.id === countryId)?.name ?? countryId;
  }

  function getCurriculumName(curriculumId: string) {
    return curricula.find((c) => c.id === curriculumId)?.name ?? curriculumId;
  }

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 w-40 bg-slate-200 rounded" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  const active = schools.filter((s) => s.subscriptionStatus === 'active').length;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Schools</h1>
          <p className="text-slate-500 text-sm mt-1">
            {schools.length} schools &middot; {active} active subscriptions
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-3xl font-bold text-emerald-700">{active}</p>
          <p className="text-sm text-emerald-600 mt-1">Active</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-3xl font-bold text-red-700">{schools.length - active}</p>
          <p className="text-sm text-red-600 mt-1">Inactive</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-3xl font-bold text-slate-700">{schools.reduce((sum, s) => sum + s.userCount, 0)}</p>
          <p className="text-sm text-slate-500 mt-1">Total Users Across Schools</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <span className="col-span-3">School</span>
          <span className="col-span-3">Country</span>
          <span className="col-span-3">Curriculum</span>
          <span className="col-span-1 text-center">Users</span>
          <span className="col-span-1 text-center">Status</span>
          <span className="col-span-1 text-center">Action</span>
        </div>
        <div className="divide-y divide-slate-100">
          {schools.map((school) => (
            <div
              key={school.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0f2a4a]/10 flex items-center justify-center text-sm flex-shrink-0">
                  🏫
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{school.name}</p>
              </div>
              <p className="col-span-3 text-sm text-slate-500 truncate">{getCountryName(school.countryId)}</p>
              <p className="col-span-3 text-sm text-slate-400 truncate">{getCurriculumName(school.curriculumId)}</p>
              <p className="col-span-1 text-sm text-slate-600 text-center">{school.userCount}</p>
              <div className="col-span-1 flex justify-center">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    school.subscriptionStatus === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {school.subscriptionStatus}
                </span>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => handleToggle(school.id)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium border border-blue-100 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Toggle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
