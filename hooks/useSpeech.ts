'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const MUTE_STORAGE_KEY = 'grio-speech-muted';
const AVG_MS_PER_WORD = 150;

function getStoredMute(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  isSupported: boolean;
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(getStoredMute);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const selectVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!isSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    const english = voices.filter((v) => v.lang.startsWith('en'));
    const preferred = english.find((v) => v.name.includes('Google') || v.name.includes('Samantha'));
    return preferred || english[0] || voices[0] || null;
  }, [isSupported]);

  const simulateSpeaking = useCallback((text: string) => {
    const wordCount = text.split(/\s+/).length;
    const duration = Math.max(wordCount * AVG_MS_PER_WORD, 1000);
    setIsSpeaking(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsSpeaking(false);
    }, duration);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      if (isMutedRef.current) {
        simulateSpeaking(text);
        return;
      }

      if (!isSupported) {
        simulateSpeaking(text);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = selectVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, selectVoice, simulateSpeaking]
  );

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isSupported) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (isSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }, [isSupported]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_STORAGE_KEY, String(next));
      } catch {}
      if (next && isSupported) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, [isSupported]);

  return { speak, stop, pause, resume, isSpeaking, isMuted, toggleMute, isSupported };
}
