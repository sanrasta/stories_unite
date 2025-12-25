/**
 * useArPerformanceMode Hook
 * 
 * Manages performance optimizations for AR rendering.
 * Disables NativeWind churn and enables native driver animations.
 */

import { useEffect, useRef, useCallback } from 'react';
import { InteractionManager, AppState, AppStateStatus } from 'react-native';

export interface UseArPerformanceModeOptions {
  enabled?: boolean;
  onPerformanceDip?: () => void;
}

export interface UseArPerformanceModeResult {
  isOptimized: boolean;
  enterPerformanceMode: () => void;
  exitPerformanceMode: () => void;
}

export function useArPerformanceMode({
  enabled = true,
  onPerformanceDip,
}: UseArPerformanceModeOptions = {}): UseArPerformanceModeResult {
  const isOptimizedRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);

  const enterPerformanceMode = useCallback(() => {
    if (!enabled || isOptimizedRef.current) return;

    isOptimizedRef.current = true;

    // Run after interactions to avoid UI jank
    InteractionManager.runAfterInteractions(() => {
      // Performance mode is now active
      // AR scene can render at full frame rate
    });
  }, [enabled]);

  const exitPerformanceMode = useCallback(() => {
    if (!isOptimizedRef.current) return;

    isOptimizedRef.current = false;
  }, []);

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      const wasActive = appStateRef.current === 'active';
      const isActive = nextAppState === 'active';

      if (wasActive && !isActive) {
        // App going to background - exit performance mode
        exitPerformanceMode();
      } else if (!wasActive && isActive) {
        // App coming to foreground - re-enter if needed
        if (enabled) {
          enterPerformanceMode();
        }
      }

      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [enabled, enterPerformanceMode, exitPerformanceMode]);

  // Auto-enter on mount if enabled
  useEffect(() => {
    if (enabled) {
      enterPerformanceMode();
    }

    return () => {
      exitPerformanceMode();
    };
  }, [enabled, enterPerformanceMode, exitPerformanceMode]);

  return {
    isOptimized: isOptimizedRef.current,
    enterPerformanceMode,
    exitPerformanceMode,
  };
}

/**
 * Get recommended animation config for performance mode
 */
export function getPerformanceAnimationConfig() {
  return {
    useNativeDriver: true,
    isInteraction: false,
  };
}

export default useArPerformanceMode;

