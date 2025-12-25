/**
 * Loading Component
 * 
 * Display loading states with various styles.
 * Supports full-screen overlay, inline spinner, and skeleton variants.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';

export type LoadingVariant = 'spinner' | 'fullscreen' | 'overlay' | 'dots';
export type LoadingSize = 'sm' | 'md' | 'lg';

export interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  message?: string;
  color?: string;
  style?: ViewStyle;
}

const sizeMap: Record<LoadingSize, { spinner: 'small' | 'large'; scale: number }> = {
  sm: { spinner: 'small', scale: 1 },
  md: { spinner: 'large', scale: 1.2 },
  lg: { spinner: 'large', scale: 1.5 },
};

function SpinnerLoading({ size = 'md', color = '#ffc834' }: LoadingProps) {
  return (
    <ActivityIndicator
      size={sizeMap[size].spinner}
      color={color}
      style={{ transform: [{ scale: sizeMap[size].scale }] }}
    />
  );
}

function DotsLoading({ color = '#ffc834' }: LoadingProps) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, [dot1, dot2, dot3]);

  const dotStyle = (anim: Animated.Value): Animated.AnimatedProps<ViewStyle>['style'] => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color,
    marginHorizontal: 4,
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Animated.View style={dotStyle(dot1)} />
      <Animated.View style={dotStyle(dot2)} />
      <Animated.View style={dotStyle(dot3)} />
    </View>
  );
}

export function Loading({
  variant = 'spinner',
  size = 'md',
  message,
  color = '#ffc834',
  style,
}: LoadingProps) {
  if (variant === 'dots') {
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
        <DotsLoading color={color} />
        {message && (
          <Text
            style={{
              color: '#e0e0e0',
              fontSize: 14,
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        )}
      </View>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f0d1a',
          },
          style,
        ]}
      >
        <SpinnerLoading size={size} color={color} />
        {message && (
          <Text
            style={{
              color: '#e0e0e0',
              fontSize: 16,
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        )}
      </View>
    );
  }

  if (variant === 'overlay') {
    return (
      <View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 13, 26, 0.8)',
          },
          style,
        ]}
      >
        <SpinnerLoading size={size} color={color} />
        {message && (
          <Text
            style={{
              color: '#e0e0e0',
              fontSize: 16,
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        )}
      </View>
    );
  }

  // Default spinner
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <SpinnerLoading size={size} color={color} />
      {message && (
        <Text
          style={{
            color: '#e0e0e0',
            fontSize: 14,
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );
}

// Import StyleSheet for overlay
import { StyleSheet } from 'react-native';

export default Loading;

