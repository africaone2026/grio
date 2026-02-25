'use client';

import { useState, useEffect } from 'react';
import { getAllUsers, toggleSubscription } from '@/lib/api';
import type { User } from '@/lib/types';

export default function AdminSubscriptionsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  async function handleToggle(userId: string) {
    const updated = await toggleSubscription(userId);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  const active = users.filter((u) => u.subscriptionStatus === 'active').length;
  const inactive = users.filter((u) => u.subscriptionStatus === 'inactive').length;
  const trial = users.filter((u) => u.subscriptionStatus === 'trial').length;

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded" />
        <div className="grid grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
        <p className="text-slate-500 text-sm mt-1">Manage user subscription status across the platform.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <p className="text-3xl font-bold text-emerald-700">{active}</p>
          <p className="text-sm text-emerald-600 mt-1">Active subscriptions</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-3xl font-bold text-amber-700">{trial}</p>
          <p className="text-sm text-amber-600 mt-1">Trial accounts</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-3xl font-bold text-red-700">{inactive}</p>
          <p className="text-sm text-red-600 mt-1">Inactive accounts</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <span className="col-span-4">User</span>
          <span className="col-span-3">Email</span>
          <span className="col-span-2">Role</span>
          <span className="col-span-2 text-center">Status</span>
          <span className="col-span-1 text-center">Action</span>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div
              key={user.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
              </div>
              <p className="col-span-3 text-sm text-slate-500 truncate">{user.email}</p>
              <p className="col-span-2 text-sm text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
              <div className="col-span-2 flex justify-center">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    user.subscriptionStatus === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : user.subscriptionStatus === 'trial'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {user.subscriptionStatus}
                </span>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => handleToggle(user.id)}
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
