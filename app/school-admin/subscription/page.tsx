'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSchool, toggleSchoolSubscription } from '@/lib/api';
import type { School } from '@/lib/types';

export default function SchoolAdminSubscriptionPage() {
  const { user } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (!user?.schoolId) return;
    getSchool(user.schoolId).then((s) => {
      setSchool(s);
      setLoading(false);
    });
  }, [user]);

  async function handleToggle() {
    if (!school) return;
    setToggling(true);
    const updated = await toggleSchoolSubscription(school.id);
    setSchool(updated);
    setToggling(false);
  }

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 w-48 bg-slate-200 rounded" />
        <div className="h-48 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  if (!school) return null;

  const isActive = school.subscriptionStatus === 'active';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your school subscription status.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">{school.name}</h2>
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {school.subscriptionStatus}
          </span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Country</span>
            <span className="font-medium text-slate-700 uppercase">{school.countryId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Joined</span>
            <span className="font-medium text-slate-700">
              {new Date(school.joinedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {isActive ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-emerald-700 font-medium">Your subscription is active.</p>
            <p className="text-xs text-emerald-600 mt-1">
              Students and teachers have full access to all curriculum content.
            </p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700 font-medium">Subscription is inactive.</p>
            <p className="text-xs text-red-600 mt-1">
              Student access to lessons is restricted. Contact support to reactivate.
            </p>
          </div>
        )}

        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 ${
            isActive
              ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {toggling
            ? 'Updating...'
            : isActive
            ? 'Deactivate Subscription'
            : 'Activate Subscription'}
        </button>
      </div>
    </div>
  );
}
