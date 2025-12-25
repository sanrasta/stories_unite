/**
 * useArPermissions Hook
 * 
 * Manages camera permission state for AR functionality.
 */

import { useState, useEffect, useCallback } from 'react';
import { Platform, Linking, Alert } from 'react-native';
import * as Camera from 'expo-camera';
import type { ArPermissionState } from '../types';

export interface UseArPermissionsResult {
  permissionState: ArPermissionState;
  isGranted: boolean;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  openSettings: () => Promise<void>;
}

export function useArPermissions(): UseArPermissionsResult {
  const [permissionState, setPermissionState] = useState<ArPermissionState>('undetermined');
  const [isLoading, setIsLoading] = useState(true);

  // Check current permission status on mount
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermissionState(mapPermissionStatus(status));
    } catch (error) {
      console.error('[useArPermissions] Error checking permission:', error);
      setPermissionState('undetermined');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      const state = mapPermissionStatus(status);
      setPermissionState(state);
      return state === 'granted';
    } catch (error) {
      console.error('[useArPermissions] Error requesting permission:', error);
      setPermissionState('denied');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openSettings = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings:');
    } else {
      await Linking.openSettings();
    }
  }, []);

  return {
    permissionState,
    isGranted: permissionState === 'granted',
    isLoading,
    requestPermission,
    openSettings,
  };
}

function mapPermissionStatus(status: Camera.PermissionStatus): ArPermissionState {
  switch (status) {
    case 'granted':
      return 'granted';
    case 'denied':
      return 'denied';
    case 'undetermined':
      return 'undetermined';
    default:
      return 'undetermined';
  }
}

/**
 * Show permission denied alert with option to open settings
 */
export function showPermissionDeniedAlert(openSettings: () => Promise<void>) {
  Alert.alert(
    'Camera Permission Required',
    'StoryVerse needs camera access to scan book covers and show magical AR experiences. Please enable camera access in Settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: openSettings },
    ]
  );
}

export default useArPermissions;

