/**
 * ArScreen
 * 
 * Main AR experience screen.
 * 
 * In simulator mode (SIMULATOR_MODE flag), shows a mock AR experience.
 * ViroReact is only loaded when running on a real device with AR enabled.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';

import { ArSimulatorMode } from '../components/ArSimulatorMode';
import { getBookTargetById } from '../lib/arConfig';
import { isFeatureEnabled } from '@/services/featureFlags/flags';

export interface ArScreenProps {
  bookId?: string;
}

export function ArScreen({ bookId }: ArScreenProps) {
  const router = useRouter();

  // Check if we're in simulator mode
  const simulatorMode = isFeatureEnabled('SIMULATOR_MODE');

  // Get book data
  const book = bookId ? getBookTargetById(bookId) : null;

  // Handle close
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // If simulator mode is enabled, show the mock AR experience
  if (simulatorMode) {
    return <ArSimulatorMode bookId={bookId} onClose={handleClose} />;
  }

  // TODO: When ViroReact is installed for device builds, import and use:
  // - ViroARSceneNavigator
  // - ArPermissionGate
  // - ArHud
  // - ArScene
  // - ArFallback
  //
  // For now, just show simulator mode since ViroReact isn't installed
  return <ArSimulatorMode bookId={bookId} onClose={handleClose} />;
}

export default ArScreen;
