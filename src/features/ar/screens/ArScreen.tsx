/**
 * ArScreen
 * 
 * Main AR experience screen.
 * 
 * In simulator mode (SIMULATOR_MODE flag), shows a mock AR experience.
 * ViroReact is only loaded when running on a real device with AR enabled.
 */

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'expo-router';

import { ArSimulatorMode } from '../components/ArSimulatorMode';
import { useArExperience } from '../hooks/useArExperience';
import { isFeatureEnabled } from '@/services/featureFlags/flags';
import { useLastScannedBook } from '@/shared/hooks/useLastScannedBook';
import { Loading } from '@/shared/components/Loading';
import { ErrorState } from '@/shared/components/ErrorState';

export interface ArScreenProps {
  bookId?: string;
}

export function ArScreen({ bookId }: ArScreenProps) {
  const router = useRouter();
  const { setLastScannedBook } = useLastScannedBook();

  // Check if we're in simulator mode
  const simulatorMode = isFeatureEnabled('SIMULATOR_MODE');

  // Resolve AR experience (from fixtures or backend)
  const { experience, localTarget, isLoading, error, refetch } = useArExperience({
    bookId,
    skipBackendResolve: true, // Use local fixtures for now
  });

  // Persist last scanned book for deep linking continuity
  useEffect(() => {
    if (bookId) {
      setLastScannedBook(bookId);
    }
  }, [bookId, setLastScannedBook]);

  // Handle close
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // Loading state
  if (isLoading) {
    return <Loading variant="fullscreen" message="Loading experience..." />;
  }

  // Error state
  if (error && !experience) {
    return (
      <ErrorState
        fullScreen
        title="Experience Not Found"
        message={error}
        onRetry={refetch}
      />
    );
  }

  // If simulator mode is enabled, show the mock AR experience
  if (simulatorMode) {
    return (
      <ArSimulatorMode
        bookId={bookId}
        onClose={handleClose}
      />
    );
  }

  // TODO: When ViroReact is installed for device builds, import and use:
  // - ViroARSceneNavigator
  // - ArPermissionGate
  // - ArHud
  // - ArScene
  // - ArFallback
  //
  // For now, just show simulator mode since ViroReact isn't installed
  return (
    <ArSimulatorMode
      bookId={bookId}
      onClose={handleClose}
    />
  );
}

export default ArScreen;
