/**
 * ArSimulatorMode Component
 * 
 * Mock AR experience for simulator testing.
 * Shows what the AR flow would look like without requiring a camera.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import { getBookTargetById } from '../lib/arConfig';

export interface ArSimulatorModeProps {
  bookId?: string;
  onClose: () => void;
}

export function ArSimulatorMode({ bookId, onClose }: ArSimulatorModeProps) {
  const [stage, setStage] = useState<'scanning' | 'found' | 'playing'>('scanning');
  const book = bookId ? getBookTargetById(bookId) : null;

  // Auto-progress through stages for demo
  useEffect(() => {
    if (stage === 'scanning') {
      const timer = setTimeout(() => setStage('found'), 2000);
      return () => clearTimeout(timer);
    }
    if (stage === 'found') {
      const timer = setTimeout(() => setStage('playing'), 500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🧪 SIMULATOR MODE</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {stage === 'scanning' && (
          <>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
              <Text style={styles.scanEmoji}>📷</Text>
            </View>
            <Text style={styles.statusText}>Simulating scan...</Text>
            <Text style={styles.hintText}>
              In a real device, point camera at book cover
            </Text>
          </>
        )}

        {stage === 'found' && (
          <>
            <View style={styles.foundFrame}>
              <Text style={styles.foundEmoji}>✨</Text>
            </View>
            <Text style={styles.statusText}>Book detected!</Text>
            <Text style={styles.bookTitle}>{book?.title || 'Sample Book'}</Text>
          </>
        )}

        {stage === 'playing' && (
          <>
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoEmoji}>🎬</Text>
              <Text style={styles.videoText}>AR Video Playing</Text>
              <Text style={styles.videoSubtext}>
                (Video overlay would appear on book cover)
              </Text>
            </View>
            <Text style={styles.bookTitle}>{book?.title || 'Sample Book'}</Text>
            
            <View style={styles.actions}>
              <Pressable
                style={styles.replayButton}
                onPress={() => setStage('scanning')}
              >
                <Text style={styles.replayText}>🔄 Replay Demo</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Simulator Mode Active</Text>
        <Text style={styles.infoText}>
          AR features require a physical device. This is a mock preview of the AR flow.
        </Text>
        <Text style={styles.infoText}>
          To test with real AR, build with: eas build --profile development
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  badge: {
    flex: 1,
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffc834',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: 'rgba(255, 200, 52, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  spacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  scanFrame: {
    width: 200,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#ffc834',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanEmoji: {
    fontSize: 64,
    opacity: 0.5,
  },
  statusText: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  hintText: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'center',
  },
  foundFrame: {
    width: 200,
    height: 280,
    backgroundColor: 'rgba(255, 200, 52, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ffc834',
  },
  foundEmoji: {
    fontSize: 80,
  },
  bookTitle: {
    color: '#ffc834',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  videoPlaceholder: {
    width: 240,
    height: 320,
    backgroundColor: '#1a2575',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  videoEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  videoText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: '600',
  },
  videoSubtext: {
    color: '#757575',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  actions: {
    marginTop: 24,
  },
  replayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  replayText: {
    color: '#fafafa',
    fontSize: 14,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 200, 52, 0.1)',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 52, 0.3)',
  },
  infoTitle: {
    color: '#ffc834',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#9e9e9e',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
});

export default ArSimulatorMode;

