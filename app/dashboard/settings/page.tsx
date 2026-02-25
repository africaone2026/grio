'use client';

import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account preferences.</p>
      </div>

      <div className="max-w-xl space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">Full name</label>
              <p className="text-slate-900 font-medium">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">Email address</label>
              <p className="text-slate-900 font-medium">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">Account type</label>
              <p className="text-slate-900 font-medium capitalize">{user.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">Member since</label>
              <p className="text-slate-900 font-medium">
                {new Date(user.joinedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 capitalize">{user.subscriptionStatus}</p>
              <p className="text-sm text-slate-500 mt-0.5">
                {user.subscriptionStatus === 'active'
                  ? 'Your subscription is active.'
                  : user.subscriptionStatus === 'trial'
                  ? 'You are on a 14-day trial.'
                  : 'Your subscription has expired.'}
              </p>
            </div>
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                user.subscriptionStatus === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : user.subscriptionStatus === 'trial'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {user.subscriptionStatus}
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-slate-500">
            Account editing is not available in this prototype. In the production version, you will
            be able to update your name, email, password, and notification preferences here.
          </p>
        </div>
      </div>
    </div>
  );
}
