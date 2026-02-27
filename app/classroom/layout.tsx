import RouteGuard from '@/components/RouteGuard';
import { AcademicKeyboardProvider } from '@/context/AcademicKeyboardContext';
import type { ReactNode } from 'react';

export default function ClassroomLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard allowedRoles={['teacher', 'school_admin', 'super_admin']}>
      <AcademicKeyboardProvider>{children}</AcademicKeyboardProvider>
    </RouteGuard>
  );
}
