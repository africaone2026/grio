import RouteGuard from '@/components/RouteGuard';
import Sidebar from '@/components/Sidebar';
import type { ReactNode } from 'react';

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard allowedRoles={['teacher', 'school_admin']}>
      <div className="flex min-h-screen min-w-[1366px]">
        <Sidebar />
        <main data-main className="flex-1 min-h-screen bg-slate-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </RouteGuard>
  );
}
