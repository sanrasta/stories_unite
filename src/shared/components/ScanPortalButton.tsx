/**
 * ScanPortalButton Component
 * 
 * A prominent, animated button that opens the AR scanner.
 * Features a magical glow effect and pulsing animation to draw attention.
 */

import React, { useEffect, useRef } from 'react';
import {
  Pressable,
  Text,
  View,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';

export interface ScanPortalButtonProps {
  onPress: () => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  size?: 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

const sizeConfig = {
  md: { size: 100, iconSize: 40, labelSize: 12 },
  lg: { size: 140, iconSize: 56, labelSize: 14 },
  xl: { size: 180, iconSize: 72, labelSize: 16 },
};

export function ScanPortalButton({
  onPress,
  label = 'Scan Book',
  sublabel,
  disabled = false,
  size = 'lg',
  style,
}: ScanPortalButtonProps) {
  const config = sizeConfig[size];
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (disabled) return;

    // Pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    pulse.start();
    glow.start();

    return () => {
      pulse.stop();
      glow.stop();
    };
  }, [disabled, pulseAnim, glowAnim]);

  const glowShadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 30],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.7],
  });

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
        }}
      >
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            {
              width: config.size,
              height: config.size,
              borderRadius: config.size / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: disabled ? '#424242' : '#ffc834',
              shadowColor: disabled ? '#000' : '#ffc834',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: disabled ? 0.3 : 0.6,
              shadowRadius: 20,
              elevation: 15,
            },
            pressed && !disabled && {
              transform: [{ scale: 0.95 }],
              backgroundColor: '#ffba2f',
            },
          ]}
        >
          {/* Inner glow ring */}
          {!disabled && (
            <Animated.View
              style={{
                position: 'absolute',
                width: config.size - 8,
                height: config.size - 8,
                borderRadius: (config.size - 8) / 2,
                borderWidth: 2,
                borderColor: '#fff',
                opacity: glowOpacity,
              }}
            />
          )}

          {/* Scan icon (camera viewfinder) */}
          <View
            style={{
              width: config.iconSize,
              height: config.iconSize,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Camera viewfinder shape */}
            <View
              style={{
                width: config.iconSize * 0.8,
                height: config.iconSize * 0.8,
                borderWidth: 3,
                borderColor: '#0f0d1a',
                borderRadius: 4,
              }}
            >
              {/* Corner accents */}
              <View
                style={{
                  position: 'absolute',
                  top: -3,
                  left: -3,
                  width: 12,
                  height: 12,
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  borderColor: '#0f0d1a',
                  borderTopLeftRadius: 4,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: -3,
                  right: -3,
                  width: 12,
                  height: 12,
                  borderTopWidth: 4,
                  borderRightWidth: 4,
                  borderColor: '#0f0d1a',
                  borderTopRightRadius: 4,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -3,
                  left: -3,
                  width: 12,
                  height: 12,
                  borderBottomWidth: 4,
                  borderLeftWidth: 4,
                  borderColor: '#0f0d1a',
                  borderBottomLeftRadius: 4,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -3,
                  right: -3,
                  width: 12,
                  height: 12,
                  borderBottomWidth: 4,
                  borderRightWidth: 4,
                  borderColor: '#0f0d1a',
                  borderBottomRightRadius: 4,
                }}
              />
            </View>
          </View>
        </Pressable>
      </Animated.View>

      {/* Label */}
      <Text
        style={{
          marginTop: 16,
          fontSize: config.labelSize,
          fontWeight: '600',
          color: disabled ? '#757575' : '#fafafa',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>

      {/* Sublabel */}
      {sublabel && (
        <Text
          style={{
            marginTop: 4,
            fontSize: config.labelSize - 2,
            color: '#9e9e9e',
            textAlign: 'center',
          }}
        >
          {sublabel}
        </Text>
      )}
    </View>
  );
}

export default ScanPortalButton;

