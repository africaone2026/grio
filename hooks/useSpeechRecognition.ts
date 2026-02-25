'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
}

interface SpeechRecognitionResultEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface UseSpeechRecognitionReturn {
  isSupported: boolean;
  isListening: boolean;
  error: string | null;
  interimTranscript: string;
  finalTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(options?: {
  lang?: string;
  onResult?: (fullTranscript: string) => void;
}): UseSpeechRecognitionReturn {
  const { lang = 'en-US', onResult } = options ?? {};
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const fullTranscriptRef = useRef('');
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    setIsSupported(!!Recognition);
    if (!Recognition) return;

    const recognition = new Recognition() as SpeechRecognitionInstance;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onstart = () => {
      setError(null);
      setIsListening(true);
      setInterimTranscript('');
      fullTranscriptRef.current = '';
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
      const full = fullTranscriptRef.current.trim();
      if (full && onResultRef.current) {
        onResultRef.current(full);
      }
    };

    recognition.onerror = (event: { error: string }) => {
      if (event.error === 'aborted' || event.error === 'no-speech') {
        setError(null);
        return;
      }
      setError(event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      let interim = '';
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? '';
        if (result.isFinal) {
          finalText += transcript;
        } else {
          interim += transcript;
        }
      }
      if (interim) setInterimTranscript((prev) => prev + interim);
      if (finalText) {
        fullTranscriptRef.current += finalText;
        setFinalTranscript((prev) => (prev + finalText).trim());
      }
    };

    recognitionRef.current = recognition;
    return () => {
      try {
        recognition.abort();
      } catch {}
      recognitionRef.current = null;
    };
  }, [lang]);

  const startListening = useCallback(() => {
    setError(null);
    setFinalTranscript('');
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
    } catch (e) {
      setError('Could not start microphone');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {}
  }, []);

  const resetTranscript = useCallback(() => {
    setFinalTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isSupported,
    isListening,
    error,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    resetTranscript,
  };
}
