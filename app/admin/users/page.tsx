'use client';

import { useState, useEffect } from 'react';
import { getAllUsers, toggleSubscription, changeUserRole } from '@/lib/api';
import type { User, UserRole } from '@/lib/types';

const roles: UserRole[] = ['independent', 'teacher', 'school_admin', 'super_admin'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  async function handleToggleSubscription(userId: string) {
    const updated = await toggleSubscription(userId);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  async function handleRoleChange(userId: string, role: UserRole) {
    const updated = await changeUserRole(userId, role);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-500 text-sm mt-1">{users.length} registered accounts</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <span className="col-span-3">User</span>
          <span className="col-span-3">Email</span>
          <span className="col-span-2">Role</span>
          <span className="col-span-2 text-center">Subscription</span>
          <span className="col-span-2 text-right">Joined</span>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div
              key={user.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
              </div>
              <p className="col-span-3 text-sm text-slate-500 truncate">{user.email}</p>
              <div className="col-span-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                  className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex justify-center">
                <button
                  onClick={() => handleToggleSubscription(user.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    user.subscriptionStatus === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : user.subscriptionStatus === 'trial'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  }`}
                >
                  {user.subscriptionStatus}
                </button>
              </div>
              <p className="col-span-2 text-xs text-slate-400 text-right">
                {new Date(user.joinedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Click a subscription badge to toggle active/inactive status.
      </p>
    </div>
  );
}
