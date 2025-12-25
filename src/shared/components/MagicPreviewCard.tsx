/**
 * MagicPreviewCard Component
 * 
 * Displays a preview of a personalized/generated book cover featuring the child.
 * Shows generation status, preview image, and purchase CTA.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ViewStyle,
  ImageSourcePropType,
  Animated,
  Easing,
} from 'react-native';
import { Button } from './Button';
import { GlassCard } from './GlassCard';

export type PreviewStatus = 'generating' | 'ready' | 'purchased' | 'error';

export interface MagicPreviewCardProps {
  title: string;
  childName: string;
  previewImage?: ImageSourcePropType;
  status: PreviewStatus;
  price?: string;
  onPreview?: () => void;
  onPurchase?: () => void;
  onRetry?: () => void;
  style?: ViewStyle;
}

function GeneratingAnimation() {
  const sparkle1 = useRef(new Animated.Value(0)).current;
  const sparkle2 = useRef(new Animated.Value(0)).current;
  const sparkle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSparkle = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateSparkle(sparkle1, 0);
    animateSparkle(sparkle2, 400);
    animateSparkle(sparkle3, 800);
  }, [sparkle1, sparkle2, sparkle3]);

  const sparkleStyle = (anim: Animated.Value, left: number, top: number) => ({
    position: 'absolute' as const,
    left,
    top,
    opacity: anim,
    transform: [
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1.2],
        }),
      },
    ],
  });

  return (
    <View
      style={{
        width: 140,
        height: 210,
        borderRadius: 12,
        backgroundColor: '#1a2575',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.Text style={[sparkleStyle(sparkle1, 30, 50), { fontSize: 24 }]}>
        ✨
      </Animated.Text>
      <Animated.Text style={[sparkleStyle(sparkle2, 90, 80), { fontSize: 20 }]}>
        ⭐
      </Animated.Text>
      <Animated.Text style={[sparkleStyle(sparkle3, 50, 130), { fontSize: 22 }]}>
        ✨
      </Animated.Text>
      <Text style={{ fontSize: 48, marginBottom: 8 }}>🪄</Text>
      <Text
        style={{
          fontSize: 12,
          color: '#9e9e9e',
          textAlign: 'center',
        }}
      >
        Creating magic...
      </Text>
    </View>
  );
}

export function MagicPreviewCard({
  title,
  childName,
  previewImage,
  status,
  price,
  onPreview,
  onPurchase,
  onRetry,
  style,
}: MagicPreviewCardProps) {
  const statusConfig = {
    generating: {
      label: 'Generating...',
      color: '#9c27b0',
      icon: '🪄',
    },
    ready: {
      label: 'Preview Ready!',
      color: '#4caf50',
      icon: '✨',
    },
    purchased: {
      label: 'Purchased',
      color: '#ffc834',
      icon: '📚',
    },
    error: {
      label: 'Error',
      color: '#f44336',
      icon: '⚠️',
    },
  };

  const config = statusConfig[status];

  return (
    <GlassCard
      intensity="medium"
      padding="md"
      rounded="lg"
      borderGlow={status === 'ready'}
      glowColor="#ffc834"
      style={[{ width: 320 }, style]}
    >
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {/* Preview Image or Generating Animation */}
        {status === 'generating' ? (
          <GeneratingAnimation />
        ) : previewImage ? (
          <Pressable onPress={onPreview} disabled={!onPreview}>
            <Image
              source={previewImage}
              style={{
                width: 140,
                height: 210,
                borderRadius: 12,
                backgroundColor: '#1a2575',
              }}
            />
            {/* Tap to preview indicator */}
            {onPreview && status === 'ready' && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 10,
                    textAlign: 'center',
                    fontWeight: '500',
                  }}
                >
                  Tap to preview
                </Text>
              </View>
            )}
          </Pressable>
        ) : (
          <View
            style={{
              width: 140,
              height: 210,
              borderRadius: 12,
              backgroundColor: '#1a2575',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 48 }}>{config.icon}</Text>
          </View>
        )}

        {/* Details */}
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          {/* Status Badge */}
          <View
            style={{
              backgroundColor: config.color,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                color: status === 'ready' || status === 'purchased' ? '#0f0d1a' : '#fff',
                fontSize: 11,
                fontWeight: '600',
              }}
            >
              {config.icon} {config.label}
            </Text>
          </View>

          {/* Title & Child Name */}
          <View style={{ marginTop: 8 }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#fafafa',
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#9e9e9e',
                marginTop: 2,
              }}
            >
              Starring {childName}
            </Text>
          </View>

          {/* Price (if ready) */}
          {status === 'ready' && price && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#ffc834',
                marginTop: 8,
              }}
            >
              {price}
            </Text>
          )}

          {/* Actions */}
          <View style={{ marginTop: 12, gap: 8 }}>
            {status === 'ready' && onPurchase && (
              <Button
                size="sm"
                variant="primary"
                fullWidth
                onPress={onPurchase}
              >
                Add to Cart
              </Button>
            )}
            {status === 'error' && onRetry && (
              <Button
                size="sm"
                variant="danger"
                fullWidth
                onPress={onRetry}
              >
                Try Again
              </Button>
            )}
            {status === 'purchased' && (
              <Button
                size="sm"
                variant="secondary"
                fullWidth
                onPress={onPreview}
              >
                View in Library
              </Button>
            )}
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

export default MagicPreviewCard;

