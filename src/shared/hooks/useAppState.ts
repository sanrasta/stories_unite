/**
 * useAppState Hook
 * 
 * Track application state (active, background, inactive).
 */

import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export interface UseAppStateResult {
  appState: AppStateStatus;
  isActive: boolean;
  isBackground: boolean;
  wasBackground: boolean;
}

export function useAppState(): UseAppStateResult {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const previousStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      previousStateRef.current = appState;
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return {
    appState,
    isActive: appState === 'active',
    isBackground: appState === 'background',
    wasBackground: previousStateRef.current === 'background' && appState === 'active',
  };
}

export default useAppState;

