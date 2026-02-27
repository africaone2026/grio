'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface UIState {
  highContrast: boolean;
  largeTypography: boolean;
  presentationMode: boolean;
  toggleHighContrast: () => void;
  toggleLargeTypography: () => void;
  togglePresentationMode: () => void;
  setPresentationMode: (v: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

const HC_KEY = 'grio-high-contrast';
const LT_KEY = 'grio-large-type';
const PM_KEY = 'grio-presentation-mode';

function readBool(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(key) === 'true'; } catch { return false; }
}

function writeBool(key: string, val: boolean) {
  try { localStorage.setItem(key, String(val)); } catch {}
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(() => readBool(HC_KEY));
  const [largeTypography, setLargeTypography] = useState(() => readBool(LT_KEY));
  const [presentationMode, setPresentationModeState] = useState(() => readBool(PM_KEY));

  useEffect(() => {
    const el = document.documentElement;
    if (highContrast) el.setAttribute('data-high-contrast', 'true');
    else el.removeAttribute('data-high-contrast');
  }, [highContrast]);

  useEffect(() => {
    const el = document.documentElement;
    if (largeTypography) el.setAttribute('data-large-type', 'true');
    else el.removeAttribute('data-large-type');
  }, [largeTypography]);

  useEffect(() => {
    const el = document.documentElement;
    if (presentationMode) el.setAttribute('data-presentation', 'true');
    else el.removeAttribute('data-presentation');
  }, [presentationMode]);

  useEffect(() => {
    if (!presentationMode) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPresentationModeState(false);
        writeBool(PM_KEY, false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [presentationMode]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => { const next = !prev; writeBool(HC_KEY, next); return next; });
  }, []);

  const toggleLargeTypography = useCallback(() => {
    setLargeTypography(prev => { const next = !prev; writeBool(LT_KEY, next); return next; });
  }, []);

  const togglePresentationMode = useCallback(() => {
    setPresentationModeState(prev => { const next = !prev; writeBool(PM_KEY, next); return next; });
  }, []);

  const setPresentationMode = useCallback((v: boolean) => {
    setPresentationModeState(v);
    writeBool(PM_KEY, v);
  }, []);

  return (
    <UIContext.Provider value={{
      highContrast,
      largeTypography,
      presentationMode,
      toggleHighContrast,
      toggleLargeTypography,
      togglePresentationMode,
      setPresentationMode,
    }}>
      {children}
      {presentationMode && (
        <button
          type="button"
          onClick={() => setPresentationMode(false)}
          className="fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all bg-slate-800/90 border border-slate-600 text-slate-200 hover:bg-slate-700 backdrop-blur-sm opacity-60 hover:opacity-100"
          aria-label="Exit presentation mode"
        >
          Exit Presentation
        </button>
      )}
    </UIContext.Provider>
  );
}

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
