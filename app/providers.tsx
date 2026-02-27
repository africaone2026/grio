'use client';

import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { UIProvider } from '@/context/UIContext';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppProvider>
        <UIProvider>{children}</UIProvider>
      </AppProvider>
    </AuthProvider>
  );
}
