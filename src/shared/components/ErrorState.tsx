/**
 * ErrorState Component
 * 
 * Display error states with optional retry action.
 * Supports multiple severity levels and customizable messaging.
 */

import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Button } from './Button';

export type ErrorSeverity = 'error' | 'warning' | 'info';

export interface ErrorStateProps {
  title?: string;
  message: string;
  severity?: ErrorSeverity;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullScreen?: boolean;
}

const severityColors: Record<ErrorSeverity, { primary: string; background: string }> = {
  error: {
    primary: '#f44336',
    background: 'rgba(244, 67, 54, 0.1)',
  },
  warning: {
    primary: '#ffc107',
    background: 'rgba(255, 193, 7, 0.1)',
  },
  info: {
    primary: '#9c27b0',
    background: 'rgba(156, 39, 176, 0.1)',
  },
};

// Simple icon components
function ErrorIcon({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(244, 67, 54, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 32, color }}>⚠</Text>
    </View>
  );
}

function WarningIcon({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 193, 7, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 32, color }}>⚡</Text>
    </View>
  );
}

function InfoIcon({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(156, 39, 176, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 32, color }}>ℹ</Text>
    </View>
  );
}

export function ErrorState({
  title,
  message,
  severity = 'error',
  onRetry,
  retryLabel = 'Try Again',
  icon,
  style,
  fullScreen = false,
}: ErrorStateProps) {
  const colors = severityColors[severity];

  const defaultTitle = {
    error: 'Something went wrong',
    warning: 'Attention needed',
    info: 'Information',
  }[severity];

  const defaultIcon = {
    error: <ErrorIcon color={colors.primary} />,
    warning: <WarningIcon color={colors.primary} />,
    info: <InfoIcon color={colors.primary} />,
  }[severity];

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        },
        fullScreen && {
          flex: 1,
          backgroundColor: '#0f0d1a',
        },
        style,
      ]}
    >
      {/* Icon */}
      <View style={{ marginBottom: 20 }}>
        {icon || defaultIcon}
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: '#fafafa',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {title || defaultTitle}
      </Text>

      {/* Message */}
      <Text
        style={{
          fontSize: 14,
          color: '#9e9e9e',
          textAlign: 'center',
          lineHeight: 20,
          maxWidth: 280,
          marginBottom: onRetry ? 24 : 0,
        }}
      >
        {message}
      </Text>

      {/* Retry button */}
      {onRetry && (
        <Button
          variant={severity === 'error' ? 'danger' : 'primary'}
          size="md"
          onPress={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </View>
  );
}

export default ErrorState;

