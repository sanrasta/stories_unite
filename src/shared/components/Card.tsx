/**
 * Card Component
 * 
 * A versatile container component with multiple variants.
 * Used for grouping related content with visual separation.
 */

import React from 'react';
import { View, ViewStyle, Pressable, PressableProps } from 'react-native';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

export interface CardProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  onPress?: () => void;
}

const variantStyles: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: '#1a2575',
  },
  elevated: {
    backgroundColor: '#1a2575',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#424242',
  },
  filled: {
    backgroundColor: '#273687',
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
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  rounded = 'md',
  style,
  onPress,
  ...props
}: CardProps) {
  const combinedStyle: ViewStyle = {
    ...variantStyles[variant],
    ...paddingStyles[padding],
    ...roundedStyles[rounded],
    overflow: 'hidden',
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

export default Card;

