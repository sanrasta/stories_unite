/**
 * ArPermissionGate Component
 * 
 * Handles camera permission flow before allowing AR content.
 * Shows appropriate UI for each permission state.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import { useArPermissions, showPermissionDeniedAlert } from '../hooks/useArPermissions';
import type { ArPermissionState } from '../types';

export interface ArPermissionGateProps {
  children: React.ReactNode;
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
}

export function ArPermissionGate({
  children,
  onPermissionGranted,
  onPermissionDenied,
}: ArPermissionGateProps) {
  const {
    permissionState,
    isGranted,
    isLoading,
    requestPermission,
    openSettings,
  } = useArPermissions();

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading variant="fullscreen" message="Checking camera access..." />
      </View>
    );
  }

  // Permission granted - render children
  if (isGranted) {
    return <>{children}</>;
  }

  // Handle request
  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      onPermissionGranted?.();
    } else {
      onPermissionDenied?.();
    }
  };

  // Handle denied state
  const handleOpenSettings = () => {
    showPermissionDeniedAlert(openSettings);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📷</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {permissionState === 'denied'
            ? 'Camera Access Denied'
            : 'Camera Access Required'}
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          {permissionState === 'denied'
            ? 'StoryVerse needs camera access to scan book covers. Please enable it in Settings.'
            : 'StoryVerse uses your camera to scan book covers and show magical AR experiences.'}
        </Text>

        {/* Action buttons */}
        <View style={styles.actions}>
          {permissionState === 'denied' ? (
            <Button
              variant="primary"
              size="lg"
              onPress={handleOpenSettings}
              fullWidth
            >
              Open Settings
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onPress={handleRequestPermission}
              fullWidth
            >
              Enable Camera
            </Button>
          )}
        </View>

        {/* Privacy note */}
        <Text style={styles.privacyNote}>
          🔒 We never record or store camera footage
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 200, 52, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fafafa',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#9e9e9e',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  actions: {
    width: '100%',
    marginBottom: 24,
  },
  privacyNote: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
});

export default ArPermissionGate;

