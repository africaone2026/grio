'use client';

import RouteGuard from '@/components/RouteGuard';
import Sidebar from '@/components/Sidebar';
import type { ReactNode } from 'react';

export default function SchoolAdminLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard allowedRoles={['school_admin']}>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </RouteGuard>
  );
}
