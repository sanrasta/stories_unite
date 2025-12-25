/**
 * GlassCard Component
 * 
 * A glassmorphic card with blur effect and subtle transparency.
 * Perfect for overlays on AR scenes or image backgrounds.
 */

import React from 'react';
import { View, ViewStyle, Pressable, PressableProps, StyleSheet } from 'react-native';

export type GlassIntensity = 'light' | 'medium' | 'heavy';

export interface GlassCardProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  intensity?: GlassIntensity;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  borderGlow?: boolean;
  glowColor?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const intensityStyles: Record<GlassIntensity, ViewStyle> = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  medium: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  heavy: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
};

const paddingStyles: Record<string, ViewStyle> = {
  none: { padding: 0 },
  sm: { padding: 12 },
  md: { padding: 16 },
  lg: { padding: 24 },
};

const roundedStyles: Record<string, ViewStyle> = {
  sm: { borderRadius: 8 },
  md: { borderRadius: 12 },
  lg: { borderRadius: 16 },
  xl: { borderRadius: 24 },
  full: { borderRadius: 9999 },
};

export function GlassCard({
  children,
  intensity = 'medium',
  padding = 'md',
  rounded = 'lg',
  borderGlow = false,
  glowColor = '#ffc834',
  style,
  onPress,
  ...props
}: GlassCardProps) {
  const combinedStyle: ViewStyle = {
    ...intensityStyles[intensity],
    ...paddingStyles[padding],
    ...roundedStyles[rounded],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: borderGlow
      ? glowColor
      : 'rgba(255, 255, 255, 0.1)',
    ...(borderGlow && {
      shadowColor: glowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    }),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          combinedStyle,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          style,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[combinedStyle, style]}>
      {children}
    </View>
  );
}

export default GlassCard;

