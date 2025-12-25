/**
 * Button Component
 * 
 * Primary interactive button with multiple variants and sizes.
 * Supports loading states, icons, and disabled state.
 */

import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle; pressed: ViewStyle }> = {
  primary: {
    container: {
      backgroundColor: '#ffc834',
    },
    text: {
      color: '#0f0d1a',
    },
    pressed: {
      backgroundColor: '#ffba2f',
    },
  },
  secondary: {
    container: {
      backgroundColor: '#9c27b0',
    },
    text: {
      color: '#fafafa',
    },
    pressed: {
      backgroundColor: '#7b1fa2',
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#ffc834',
    },
    text: {
      color: '#ffc834',
    },
    pressed: {
      backgroundColor: 'rgba(255, 200, 52, 0.1)',
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: '#ffc834',
    },
    pressed: {
      backgroundColor: 'rgba(255, 200, 52, 0.1)',
    },
  },
  danger: {
    container: {
      backgroundColor: '#f44336',
    },
    text: {
      color: '#fafafa',
    },
    pressed: {
      backgroundColor: '#d32f2f',
    },
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle; iconSize: number }> = {
  sm: {
    container: {
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    text: {
      fontSize: 12,
      fontWeight: '600',
    },
    iconSize: 14,
  },
  md: {
    container: {
      height: 44,
      paddingHorizontal: 16,
      borderRadius: 12,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
    },
    iconSize: 18,
  },
  lg: {
    container: {
      height: 52,
      paddingHorizontal: 24,
      borderRadius: 16,
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
    },
    iconSize: 20,
  },
  xl: {
    container: {
      height: 60,
      paddingHorizontal: 32,
      borderRadius: 16,
    },
    text: {
      fontSize: 18,
      fontWeight: '600',
    },
    iconSize: 24,
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        },
        sizeStyle.container,
        variantStyle.container,
        pressed && !isDisabled && variantStyle.pressed,
        isDisabled && { opacity: 0.5 },
        fullWidth && { width: '100%' },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyle.text.color}
        />
      ) : (
        <>
          {leftIcon && (
            <View style={{ width: sizeStyle.iconSize, height: sizeStyle.iconSize }}>
              {leftIcon}
            </View>
          )}
          <Text
            style={[
              sizeStyle.text,
              variantStyle.text,
              textStyle,
            ]}
          >
            {children}
          </Text>
          {rightIcon && (
            <View style={{ width: sizeStyle.iconSize, height: sizeStyle.iconSize }}>
              {rightIcon}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}

export default Button;

