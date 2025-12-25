/**
 * useArFallbackTimer Hook
 * 
 * Manages the fallback timer that triggers "Play Fullscreen" 
 * when no anchor is detected within the timeout period.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { getArConfig } from '../lib/arConfig';

export interface UseArFallbackTimerOptions {
  enabled?: boolean;
  timeoutMs?: number;
  onFallback?: () => void;
}

export interface UseArFallbackTimerResult {
  isTimerActive: boolean;
  remainingMs: number;
  remainingSeconds: number;
  shouldShowFallback: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export function useArFallbackTimer({
  enabled = true,
  timeoutMs,
  onFallback,
}: UseArFallbackTimerOptions = {}): UseArFallbackTimerResult {
  const config = getArConfig();
  const timeout = timeoutMs ?? config.fallbackTimeoutMs;

  const [remainingMs, setRemainingMs] = useState(timeout);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [shouldShowFallback, setShouldShowFallback] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const hasTriggeredRef = useRef(false);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!enabled || hasTriggeredRef.current) return;

    clearTimerInterval();
    startTimeRef.current = Date.now();
    setIsTimerActive(true);
    setShouldShowFallback(false);
    setRemainingMs(timeout);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, timeout - elapsed);
      setRemainingMs(remaining);

      if (remaining <= 0 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        clearTimerInterval();
        setIsTimerActive(false);
        setShouldShowFallback(true);
        onFallback?.();
      }
    }, 100);
  }, [enabled, timeout, onFallback, clearTimerInterval]);

  const stopTimer = useCallback(() => {
    clearTimerInterval();
    setIsTimerActive(false);
    hasTriggeredRef.current = false;
  }, [clearTimerInterval]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setRemainingMs(timeout);
    setShouldShowFallback(false);
    hasTriggeredRef.current = false;
  }, [stopTimer, timeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  return {
    isTimerActive,
    remainingMs,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    shouldShowFallback,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

export default useArFallbackTimer;

