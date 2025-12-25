/**
 * ArHud Component
 * 
 * Heads-Up Display overlay for AR scanner.
 * Uses StyleSheet and Animated for hot-path performance (no NativeWind).
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import type { ArTrackingState } from '../types';

export interface ArHudProps {
  trackingState: ArTrackingState;
  bookTitle?: string;
  showFallbackButton: boolean;
  fallbackCountdown: number | null;
  onClose: () => void;
  onFallbackPress: () => void;
}

export function ArHud({
  trackingState,
  bookTitle,
  showFallbackButton,
  fallbackCountdown,
  onClose,
  onFallbackPress,
}: ArHudProps) {
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Scanning animation
  useEffect(() => {
    if (trackingState === 'scanning') {
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      scanAnimation.start();
      return () => scanAnimation.stop();
    }
  }, [trackingState, scanLineAnim]);

  // Pulse animation for fallback button
  useEffect(() => {
    if (showFallbackButton) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [showFallbackButton, pulseAnim]);

  const getStatusText = (): string => {
    switch (trackingState) {
      case 'initializing':
        return 'Starting camera...';
      case 'scanning':
        return 'Point at a book cover';
      case 'tracking':
        return bookTitle || 'Book detected!';
      case 'lost':
        return 'Looking for book...';
      case 'error':
        return 'Something went wrong';
      default:
        return '';
    }
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <SafeAreaView style={styles.safeArea} pointerEvents="box-none">
        {/* Top bar */}
        <View style={styles.topBar}>
          {/* Close button */}
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={12}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>

          {/* Status */}
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                trackingState === 'tracking' && styles.statusDotTracking,
                trackingState === 'error' && styles.statusDotError,
              ]}
            />
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />
        </View>

        {/* Center viewfinder */}
        {trackingState === 'scanning' && (
          <View style={styles.viewfinderContainer}>
            <View style={styles.viewfinder}>
              {/* Corner accents */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* Scan line */}
              <Animated.View
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineTranslateY }] },
                ]}
              />
            </View>
          </View>
        )}

        {/* Bottom area */}
        <View style={styles.bottomBar}>
          {/* Countdown timer */}
          {fallbackCountdown !== null && fallbackCountdown > 0 && !showFallbackButton && (
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>
                Can't scan? Fallback in {fallbackCountdown}s
              </Text>
            </View>
          )}

          {/* Fallback button */}
          {showFallbackButton && (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Pressable
                style={styles.fallbackButton}
                onPress={onFallbackPress}
              >
                <Text style={styles.fallbackIcon}>▶</Text>
                <Text style={styles.fallbackText}>Play Fullscreen</Text>
              </Pressable>
            </Animated.View>
          )}

          {/* Instructions */}
          {trackingState === 'scanning' && !showFallbackButton && (
            <Text style={styles.instructions}>
              Hold your phone 8-12 inches from the book cover
            </Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffc834',
  },
  statusDotTracking: {
    backgroundColor: '#4caf50',
  },
  statusDotError: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  spacer: {
    width: 40,
  },
  viewfinderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinder: {
    width: 240,
    height: 320,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
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
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    top: '50%',
    backgroundColor: '#ffc834',
    shadowColor: '#ffc834',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  bottomBar: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  countdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  countdownText: {
    color: '#9e9e9e',
    fontSize: 13,
  },
  fallbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc834',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 10,
    shadowColor: '#ffc834',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  fallbackIcon: {
    color: '#0f0d1a',
    fontSize: 18,
  },
  fallbackText: {
    color: '#0f0d1a',
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default ArHud;

