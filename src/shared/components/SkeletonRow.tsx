/**
 * SkeletonRow Component
 * 
 * Animated loading placeholder for content rows.
 * Displays a shimmer effect while content is loading.
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, ViewStyle } from 'react-native';

export interface SkeletonRowProps {
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'bookCover' | 'custom';
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  rows?: number;
  gap?: number;
}

function SkeletonItem({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}: {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#273687',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
          transform: [{ translateX }],
        }}
      >
        <View
          style={{
            width: 100,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </Animated.View>
    </View>
  );
}

export function SkeletonRow({
  variant = 'text',
  width,
  height,
  borderRadius,
  style,
  rows = 1,
  gap = 8,
}: SkeletonRowProps) {
  const getVariantConfig = (): { width: number | string; height: number; borderRadius: number } => {
    switch (variant) {
      case 'title':
        return { width: width ?? '60%', height: height ?? 24, borderRadius: borderRadius ?? 8 };
      case 'avatar':
        return { width: width ?? 48, height: height ?? 48, borderRadius: borderRadius ?? 24 };
      case 'card':
        return { width: width ?? '100%', height: height ?? 120, borderRadius: borderRadius ?? 12 };
      case 'bookCover':
        return { width: width ?? 140, height: height ?? 210, borderRadius: borderRadius ?? 12 };
      case 'custom':
        return {
          width: width ?? '100%',
          height: height ?? 16,
          borderRadius: borderRadius ?? 8,
        };
      case 'text':
      default:
        return { width: width ?? '100%', height: height ?? 16, borderRadius: borderRadius ?? 8 };
    }
  };

  const config = getVariantConfig();

  if (rows === 1) {
    return (
      <SkeletonItem
        width={config.width}
        height={config.height}
        borderRadius={config.borderRadius}
        style={style}
      />
    );
  }

  return (
    <View style={[{ gap }, style]}>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonItem
          key={index}
          width={index === rows - 1 && variant === 'text' ? '75%' : config.width}
          height={config.height}
          borderRadius={config.borderRadius}
        />
      ))}
    </View>
  );
}

// Preset skeleton layouts
export function SkeletonBookCard({ style }: { style?: ViewStyle }) {
  return (
    <View style={[{ width: 140, alignItems: 'center' }, style]}>
      <SkeletonRow variant="bookCover" />
      <View style={{ marginTop: 8, width: '100%', gap: 4 }}>
        <SkeletonRow variant="text" width="80%" height={14} />
        <SkeletonRow variant="text" width="50%" height={12} />
      </View>
    </View>
  );
}

export function SkeletonListItem({ style }: { style?: ViewStyle }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, style]}>
      <SkeletonRow variant="avatar" />
      <View style={{ flex: 1, gap: 4 }}>
        <SkeletonRow variant="title" width="70%" height={18} />
        <SkeletonRow variant="text" width="90%" height={14} />
      </View>
    </View>
  );
}

export default SkeletonRow;

