'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import { useState } from 'react';
import type { UserRole } from '@/lib/types';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const independentNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
  { label: 'Learn with Grio', href: '/dashboard/learn', icon: '✦' },
  { label: 'Subjects', href: '/dashboard/subjects', icon: '📚' },
  { label: 'Progress', href: '/dashboard/progress', icon: '📈' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

const teacherNav: NavItem[] = [
  { label: 'Overview', href: '/teacher', icon: '⊞' },
  { label: 'My Subjects', href: '/teacher/subjects', icon: '📚' },
  { label: 'Students', href: '/teacher/students', icon: '👥' },
  { label: 'Classrooms', href: '/teacher/classrooms', icon: '🏫' },
  { label: 'Classroom Mode', href: '/classroom', icon: '▶' },
  { label: 'Sessions', href: '/teacher/sessions', icon: '🗂' },
  { label: 'Lesson Planner', href: '/teacher/planner', icon: '📝' },
  { label: 'AI Assistant', href: '/teacher/assistant', icon: '✦' },
];

const schoolAdminNav: NavItem[] = [
  { label: 'Overview', href: '/school-admin', icon: '⊞' },
  { label: 'Teachers', href: '/school-admin/teachers', icon: '👩‍🏫' },
  { label: 'Students', href: '/school-admin/students', icon: '👥' },
  { label: 'Classrooms', href: '/school-admin/classrooms', icon: '🏫' },
  { label: 'Classroom Mode', href: '/classroom', icon: '▶' },
  { label: 'Subjects', href: '/school-admin/subjects', icon: '📚' },
  { label: 'Analytics', href: '/school-admin/analytics', icon: '📈' },
  { label: 'Subscription', href: '/school-admin/subscription', icon: '💳' },
];

const adminNav: NavItem[] = [
  { label: 'Analytics', href: '/admin', icon: '⊞' },
  { label: 'Schools', href: '/admin/schools', icon: '🏫' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Curriculum', href: '/admin/curriculum', icon: '🗂' },
  { label: 'Subjects', href: '/admin/subjects', icon: '📚' },
  { label: 'Lessons', href: '/admin/lessons', icon: '📄' },
  { label: 'Subscriptions', href: '/admin/subscriptions', icon: '💳' },
];

const navByRole: Record<UserRole, NavItem[]> = {
  independent: independentNav,
  teacher: teacherNav,
  school_admin: schoolAdminNav,
  super_admin: adminNav,
};

const ROLE_LABELS: Record<UserRole, string> = {
  independent: 'Learner',
  teacher: 'Teacher',
  school_admin: 'School Admin',
  super_admin: 'Super Admin',
};

const ROOT_HREFS = new Set(['/dashboard', '/teacher', '/admin', '/school-admin']);

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { highContrast, largeTypography, presentationMode, toggleHighContrast, toggleLargeTypography, togglePresentationMode } = useUI();
  const pathname = usePathname();
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  if (!user) return null;

  const navItems = navByRole[user.role] ?? independentNav;

  const handleLogout = () => {
    if (confirmingLogout) {
      logout();
    } else {
      setConfirmingLogout(true);
      setTimeout(() => setConfirmingLogout(false), 3000);
    }
  };

  return (
    <aside data-sidebar className="w-64 bg-[#0b1f36] min-h-screen flex flex-col flex-shrink-0">
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-tight">GRIO</span>
          <span className="text-blue-300 text-xs font-medium bg-blue-900/50 px-2 py-0.5 rounded-full">AI</span>
        </Link>
      </div>

      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
            aria-hidden="true"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate" title={user.name}>{user.name}</p>
            <p className="text-slate-400 text-xs">{ROLE_LABELS[user.role]}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Sidebar navigation">
        {navItems.map((item) => {
          const isActive = ROOT_HREFS.has(item.href)
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base w-5 text-center" aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold px-3 mb-2">Display</p>
        <div className="space-y-1">
          <button
            type="button"
            onClick={toggleHighContrast}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              highContrast
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z"/></svg>
              High Contrast
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${highContrast ? 'bg-blue-600/40 text-blue-200' : 'bg-white/5 text-slate-500'}`}>
              {highContrast ? 'ON' : 'OFF'}
            </span>
          </button>
          <button
            type="button"
            onClick={toggleLargeTypography}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              largeTypography
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
              Large Text
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${largeTypography ? 'bg-blue-600/40 text-blue-200' : 'bg-white/5 text-slate-500'}`}>
              {largeTypography ? 'ON' : 'OFF'}
            </span>
          </button>
          <button
            type="button"
            onClick={togglePresentationMode}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              presentationMode
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
              Presentation
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${presentationMode ? 'bg-blue-600/40 text-blue-200' : 'bg-white/5 text-slate-500'}`}>
              {presentationMode ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      <div className="px-3 pb-6 mt-auto border-t border-white/10 pt-4">
        {user.subscriptionStatus === 'active' ? (
          <div className="flex items-center gap-2 px-3 py-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-emerald-400 font-medium">Active Subscription</span>
          </div>
        ) : user.subscriptionStatus === 'trial' ? (
          <div className="flex items-center gap-2 px-3 py-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-amber-400 font-medium">Trial Account</span>
          </div>
        ) : (
          <Link
            href="/pricing"
            className="flex items-center gap-2 px-3 py-2 mb-3 bg-amber-900/30 border border-amber-700/40 rounded-lg hover:bg-amber-900/50 transition-colors"
          >
            <span className="text-xs text-amber-400 font-medium">Upgrade Plan →</span>
          </Link>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            confirmingLogout
              ? 'bg-red-900/40 text-red-300 border border-red-700/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          aria-label={confirmingLogout ? 'Click again to confirm logout' : 'Logout'}
        >
          <span className="text-base w-5 text-center" aria-hidden="true">↩</span>
          {confirmingLogout ? 'Confirm logout?' : 'Logout'}
        </button>
      </div>
    </aside>
  );
}
