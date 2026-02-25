'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/lib/types';

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireSubscription?: boolean;
}

export default function RouteGuard({
  children,
  allowedRoles,
  requireSubscription = false,
}: RouteGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace('/');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      const fallback =
        user.role === 'super_admin'
          ? '/admin'
          : user.role === 'school_admin'
          ? '/school-admin'
          : user.role === 'teacher'
          ? '/teacher'
          : '/dashboard';
      router.replace(fallback);
      return;
    }

    if (requireSubscription && user.subscriptionStatus === 'inactive') {
      router.replace('/pricing');
      return;
    }
  }, [user, isLoading, router, allowedRoles, requireSubscription]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0f2a4a] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  if (requireSubscription && user.subscriptionStatus === 'inactive') return null;

  return <>{children}</>;
}
