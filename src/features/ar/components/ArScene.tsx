/**
 * ArScene Component
 * 
 * ViroReact AR scene with image marker tracking and video overlay.
 * 
 * NOTE: This component requires @reactvision/react-viro to be installed.
 * Currently stubbed out for simulator testing.
 * 
 * To enable real AR:
 * 1. Install ViroReact with compatible version for your Expo/RN setup
 * 2. Uncomment the ViroReact imports and implementation below
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ArTrackingState } from '../types';

export interface ArSceneProps {
  bookId: string;
  targetKey: string;
  videoSource: { uri: string } | number;
  onTrackingStateChange: (state: ArTrackingState) => void;
  onAnchorFound: () => void;
  onAnchorLost: () => void;
  onVideoEnd?: () => void;
}

/**
 * Placeholder ArScene - ViroReact not installed
 * 
 * Real implementation would use:
 * - ViroARScene
 * - ViroARImageMarker
 * - ViroVideo
 * - ViroNode
 * - ViroARTrackingTargets
 */
export function ArScene({
  bookId,
  targetKey,
  videoSource,
  onTrackingStateChange,
  onAnchorFound,
  onAnchorLost,
  onVideoEnd,
}: ArSceneProps) {
  // Stub implementation - ViroReact not installed
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ArScene requires ViroReact</Text>
      <Text style={styles.subtext}>Use SIMULATOR_MODE for testing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffc834',
    fontSize: 18,
    fontWeight: '600',
  },
  subtext: {
    color: '#757575',
    fontSize: 14,
    marginTop: 8,
  },
});

export default ArScene;

/*
// REAL IMPLEMENTATION (uncomment when ViroReact is installed):

import {
  ViroARScene,
  ViroARImageMarker,
  ViroVideo,
  ViroNode,
  ViroARTrackingTargets,
} from '@reactvision/react-viro';
import { getArConfig, getPhysicalDimensions } from '../lib/arConfig';
import { ArEvents } from '../lib/arEvents';

export function ArScene({ ... }: ArSceneProps) {
  // ... full ViroReact implementation
}
*/
