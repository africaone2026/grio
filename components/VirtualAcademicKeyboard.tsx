'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAcademicKeyboard } from '@/context/AcademicKeyboardContext';
import { useUI } from '@/context/UIContext';
import { getSymbolsByCategory, type AcademicSymbol, type AcademicSymbolCategory } from '@/lib/academicSymbols';

const STORAGE_KEY = 'grio-virtual-keyboard-position';
const DEFAULT_LEFT = 24;
const DEFAULT_BOTTOM = 24;

const CATEGORY_LABELS: Record<AcademicSymbolCategory, string> = {
  math: 'Math',
  chemistry: 'Chemistry',
  logic: 'Logic',
  language: 'Language',
};

function loadStoredPosition(): { left: number; bottom: number } {
  if (typeof window === 'undefined') return { left: DEFAULT_LEFT, bottom: DEFAULT_BOTTOM };
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { left: DEFAULT_LEFT, bottom: DEFAULT_BOTTOM };
    const parsed = JSON.parse(raw) as { left?: number; bottom?: number };
    return {
      left: typeof parsed.left === 'number' ? parsed.left : DEFAULT_LEFT,
      bottom: typeof parsed.bottom === 'number' ? parsed.bottom : DEFAULT_BOTTOM,
    };
  } catch {
    return { left: DEFAULT_LEFT, bottom: DEFAULT_BOTTOM };
  }
}

function savePosition(left: number, bottom: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ left, bottom }));
  } catch {}
}

export default function VirtualAcademicKeyboard() {
  const { isOpen, close, toggle, insertSymbol } = useAcademicKeyboard();
  const { presentationMode, highContrast } = useUI();
  const [dockMode, setDockMode] = useState<'floating' | 'docked'>('floating');
  const [position, setPosition] = useState(loadStoredPosition);
  const [expandedCategories, setExpandedCategories] = useState<Set<AcademicSymbolCategory>>(
    () => new Set(['math', 'chemistry', 'logic', 'language'])
  );
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, bottom: 0 });
  const lastPositionRef = useRef(position);
  const panelRef = useRef<HTMLDivElement>(null);
  const symbolButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const symbolsByCategory = getSymbolsByCategory();
  const allSymbols = Object.values(symbolsByCategory).flat();
  const isDocked = presentationMode || dockMode === 'docked';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const cats: AcademicSymbolCategory[] = ['math', 'chemistry', 'logic', 'language'];
        const idx = parseInt(e.key, 10) - 1;
        if (cats[idx]) {
          e.preventDefault();
          setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(cats[idx])) next.delete(cats[idx]);
            else next.add(cats[idx]);
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isDocked) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        left: position.left,
        bottom: position.bottom,
      };
    },
    [isDocked, position]
  );

  useEffect(() => {
    lastPositionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = dragStart.current.y - e.clientY;
      let left = dragStart.current.left + dx;
      let bottom = dragStart.current.bottom + dy;
      left = Math.max(0, Math.min(window.innerWidth - 320, left));
      bottom = Math.max(0, Math.min(window.innerHeight - 200, bottom));
      lastPositionRef.current = { left, bottom };
      setPosition({ left, bottom });
    };
    const onUp = () => {
      setIsDragging(false);
      savePosition(lastPositionRef.current.left, lastPositionRef.current.bottom);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isPanel = target === panelRef.current;
      const isSymbolButton = target.closest('[data-symbol-button]');
      if (!isPanel && !isSymbolButton) return;
      const len = allSymbols.length;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((i) => (i + 1) % len);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((i) => (i - 1 + len) % len);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const sym = allSymbols[focusedIndex];
        if (sym) insertSymbol(sym.symbol);
      }
    },
    [allSymbols, focusedIndex, insertSymbol]
  );

  useEffect(() => {
    const el = symbolButtonRefs.current[focusedIndex];
    if (el) el.focus();
  }, [focusedIndex]);

  const toggleCategory = useCallback((cat: AcademicSymbolCategory) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const handleSymbolContextMenu = useCallback((e: React.MouseEvent, symbol: string) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(symbol);
    } catch {}
  }, []);

  if (!isOpen) return null;

  const panelClasses = [
    'flex flex-col rounded-xl border shadow-xl overflow-hidden z-[1000]',
    'bg-slate-800/95 backdrop-blur border-slate-600/60',
    'min-w-[280px] max-w-[90vw] w-[360px] max-h-[70vh]',
    highContrast ? 'ring-2 ring-slate-400 border-slate-500' : '',
  ].join(' ');

  const headerClasses = [
    'flex items-center gap-2 px-3 py-2 border-b border-slate-600/60 bg-slate-900/60 flex-shrink-0',
    highContrast ? 'border-slate-500' : '',
  ].join(' ');

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Academic Symbols"
      data-virtual-keyboard
      className={panelClasses}
      style={
        isDocked
          ? { position: 'fixed', left: 0, right: 0, bottom: 0, width: '100%', maxWidth: '100%' }
          : {
              position: 'fixed',
              left: position.left,
              bottom: position.bottom,
            }
      }
      onKeyDown={handlePanelKeyDown}
      tabIndex={0}
    >
      <div className={headerClasses}>
        {!isDocked && (
          <div
            role="button"
            tabIndex={-1}
            onMouseDown={handleDragStart}
            className="cursor-grab active:cursor-grabbing touch-none p-1 rounded text-slate-400 hover:text-slate-300"
            aria-label="Drag to reposition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="6" r="1.5" />
              <circle cx="15" cy="6" r="1.5" />
              <circle cx="9" cy="12" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="18" r="1.5" />
              <circle cx="15" cy="18" r="1.5" />
            </svg>
          </div>
        )}
        <span className="text-sm font-semibold text-slate-200 flex-1">Academic Symbols</span>
        <button
          type="button"
          onClick={() => setDockMode((m) => (m === 'floating' ? 'docked' : 'floating'))}
          disabled={presentationMode}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed"
          title={presentationMode ? 'Dock disabled in presentation mode' : dockMode === 'docked' ? 'Switch to floating' : 'Dock to bottom'}
          aria-label={dockMode === 'docked' ? 'Switch to floating' : 'Dock to bottom'}
        >
          {dockMode === 'docked' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M4 14h16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 9l7 7 7-7" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={close}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
          aria-label="Close keyboard"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {(Object.keys(symbolsByCategory) as AcademicSymbolCategory[]).map((cat) => {
          const symbols = symbolsByCategory[cat];
          const expanded = expandedCategories.has(cat);
          return (
            <div key={cat} className="border border-slate-600/40 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium transition-colors ${
                  expanded
                    ? 'bg-teal-900/40 text-teal-200 border-b border-slate-600/40'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                {CATEGORY_LABELS[cat]}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {expanded && (
                <div className="p-2 grid grid-cols-6 sm:grid-cols-8 gap-1 bg-slate-800/40">
                  {symbols.map((s, i) => {
                    const globalIndex = allSymbols.indexOf(s);
                    const isFocused = focusedIndex === globalIndex;
                    return (
                      <SymbolButton
                        key={s.id}
                        symbol={s}
                        isFocused={isFocused}
                        tabIndex={isFocused ? 0 : -1}
                        buttonRef={(el) => {
                          symbolButtonRefs.current[globalIndex] = el;
                        }}
                        onFocus={() => setFocusedIndex(globalIndex)}
                        onInsert={() => insertSymbol(s.symbol)}
                        onContextMenu={handleSymbolContextMenu}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SymbolButton({
  symbol,
  isFocused,
  tabIndex,
  buttonRef,
  onFocus,
  onInsert,
  onContextMenu,
}: {
  symbol: AcademicSymbol;
  isFocused: boolean;
  tabIndex: number;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onFocus: () => void;
  onInsert: () => void;
  onContextMenu: (e: React.MouseEvent, symbol: string) => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      data-symbol-button
      tabIndex={tabIndex}
      onFocus={onFocus}
      onClick={onInsert}
      onContextMenu={(e) => onContextMenu(e, symbol.symbol)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onInsert();
        }
      }}
      title={symbol.label ?? symbol.symbol}
      className={`min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg border text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800 ${
        isFocused
          ? 'bg-teal-600/60 border-teal-500 text-white'
          : 'bg-slate-700/60 border-slate-600/60 text-slate-200 hover:bg-slate-600/60 hover:border-slate-500'
      }`}
    >
      {symbol.symbol}
    </button>
  );
}
