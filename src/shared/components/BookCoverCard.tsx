/**
 * BookCoverCard Component
 * 
 * Displays a book cover with title and optional metadata.
 * Supports locked/unlocked states for entitlement-based access.
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

export type BookCoverSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BookCoverCardProps {
  title: string;
  coverImage: ImageSourcePropType;
  author?: string;
  isLocked?: boolean;
  isNew?: boolean;
  progress?: number; // 0-100
  size?: BookCoverSize;
  onPress?: () => void;
  style?: ViewStyle;
}

// Book cover dimensions maintain 1:1.5 aspect ratio
const sizeConfig: Record<BookCoverSize, { width: number; height: number; titleSize: number }> = {
  sm: { width: 100, height: 150, titleSize: 11 },
  md: { width: 140, height: 210, titleSize: 13 },
  lg: { width: 180, height: 270, titleSize: 15 },
  xl: { width: 240, height: 360, titleSize: 18 },
};

export function BookCoverCard({
  title,
  coverImage,
  author,
  isLocked = false,
  isNew = false,
  progress,
  size = 'md',
  onPress,
  style,
}: BookCoverCardProps) {
  const config = sizeConfig[size];
  const showProgress = typeof progress === 'number' && progress > 0 && progress < 100;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        {
          width: config.width,
        },
        pressed && onPress && { opacity: 0.9, transform: [{ scale: 0.97 }] },
        style,
      ]}
    >
      {/* Cover Image Container */}
      <View
        style={{
          width: config.width,
          height: config.height,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#1a2575',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {/* Cover Image */}
        <Image
          source={coverImage}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />

        {/* Locked Overlay */}
        {isLocked && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 13, 26, 0.7)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32 }}>🔒</Text>
          </View>
        )}

        {/* New Badge */}
        {isNew && !isLocked && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#ffc834',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: '#0f0d1a',
                fontSize: 10,
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              New
            </Text>
          </View>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#ffc834',
              }}
            />
          </View>
        )}
      </View>

      {/* Title */}
      <Text
        numberOfLines={2}
        style={{
          marginTop: 8,
          fontSize: config.titleSize,
          fontWeight: '600',
          color: '#fafafa',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      {/* Author */}
      {author && (
        <Text
          numberOfLines={1}
          style={{
            marginTop: 2,
            fontSize: config.titleSize - 2,
            color: '#9e9e9e',
            textAlign: 'center',
          }}
        >
          {author}
        </Text>
      )}
    </Pressable>
  );
}

export default BookCoverCard;

