'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';

type GetValue = () => string;
type SetValue = (value: string) => void;

interface AcademicKeyboardState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  insertSymbol: (symbol: string) => void;
  registerInput: (
    ref: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    getValue: GetValue,
    setValue: SetValue
  ) => void;
  unregisterInput: () => void;
}

const AcademicKeyboardContext = createContext<AcademicKeyboardState | null>(null);

export function AcademicKeyboardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRefHolder = useRef<RefObject<HTMLInputElement | HTMLTextAreaElement | null> | null>(null);
  const getValueRef = useRef<GetValue | null>(null);
  const setValueRef = useRef<SetValue | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const registerInput = useCallback(
    (
      ref: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
      getValue: GetValue,
      setValue: SetValue
    ) => {
      inputRefHolder.current = ref;
      getValueRef.current = getValue;
      setValueRef.current = setValue;
    },
    []
  );

  const unregisterInput = useCallback(() => {
    inputRefHolder.current = null;
    getValueRef.current = null;
    setValueRef.current = null;
  }, []);

  const insertSymbol = useCallback((symbol: string) => {
    const el = inputRefHolder.current?.current ?? null;
    const getValue = getValueRef.current;
    const setValue = setValueRef.current;
    if (!el || !setValue) return;
    const value = getValue ? getValue() : el.value;
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const newValue = value.slice(0, start) + symbol + value.slice(end);
    setValue(newValue);
    el.focus();
    const newCursor = start + symbol.length;
    el.setSelectionRange(newCursor, newCursor);
  }, []);

  const value: AcademicKeyboardState = {
    isOpen,
    open,
    close,
    toggle,
    insertSymbol,
    registerInput,
    unregisterInput,
  };

  return (
    <AcademicKeyboardContext.Provider value={value}>
      {children}
    </AcademicKeyboardContext.Provider>
  );
}

export function useAcademicKeyboard(): AcademicKeyboardState {
  const ctx = useContext(AcademicKeyboardContext);
  if (!ctx) {
    throw new Error('useAcademicKeyboard must be used within AcademicKeyboardProvider');
  }
  return ctx;
}
