/**
 * ArFallback Component
 * 
 * Fullscreen video player fallback when AR tracking fails.
 * Provides a non-AR alternative for the AR experience.
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

export interface ArFallbackProps {
  bookId: string;
  bookTitle: string;
  videoSource: { uri: string } | number;
  onClose: () => void;
  onVideoEnd?: () => void;
}

export function ArFallback({
  bookId,
  bookTitle,
  videoSource,
  onClose,
  onVideoEnd,
}: ArFallbackProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    setIsPlaying(status.isPlaying);
    setProgress(status.positionMillis);
    setDuration(status.durationMillis || 0);

    if (status.didJustFinish) {
      onVideoEnd?.();
    }
  }, [onVideoEnd]);

  const togglePlayPause = useCallback(async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  }, [isPlaying]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Video */}
      <Video
        ref={videoRef}
        source={videoSource}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={true}
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      {/* Overlay controls */}
      <SafeAreaView style={styles.overlay}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
          <Text style={styles.title} numberOfLines={1}>
            {bookTitle}
          </Text>
          <View style={styles.spacer} />
        </View>

        {/* Center play/pause */}
        <Pressable style={styles.centerControl} onPress={togglePlayPause}>
          <View style={styles.playPauseButton}>
            <Text style={styles.playPauseIcon}>
              {isPlaying ? '❚❚' : '▶'}
            </Text>
          </View>
        </Pressable>

        {/* Bottom progress bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.timeText}>{formatTime(progress)}</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
              />
            </View>
          </View>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  spacer: {
    width: 40,
  },
  centerControl: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 200, 52, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ffc834',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  playPauseIcon: {
    color: '#0f0d1a',
    fontSize: 24,
    fontWeight: '700',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    gap: 12,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    minWidth: 40,
    textAlign: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffc834',
    borderRadius: 2,
  },
});

export default ArFallback;

