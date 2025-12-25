/**
 * StoryVerse Typography System
 * 
 * A carefully crafted type system that balances readability with magical aesthetics.
 * Uses Outfit for body text, Playfair Display for headings, and JetBrains Mono for code.
 */

import { Platform, TextStyle } from 'react-native';

// Font families
export const fontFamily = {
  // Primary sans-serif for body text
  sans: Platform.select({
    ios: 'Outfit',
    android: 'Outfit',
    default: 'Outfit',
  }),
  // Elegant serif for display/headings
  display: Platform.select({
    ios: 'Playfair Display',
    android: 'PlayfairDisplay',
    default: 'Playfair Display',
  }),
  // Monospace for code/technical content
  mono: Platform.select({
    ios: 'JetBrains Mono',
    android: 'JetBrainsMono',
    default: 'JetBrains Mono',
  }),
  // System fallback
  system: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

// Font weights
export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// Line heights (multipliers)
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const;

// Type scale definitions
export const typeScale = {
  // Display - Large headlines, hero text
  display: {
    large: {
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: -0.25,
      fontWeight: fontWeight.bold,
    },
    medium: {
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      fontWeight: fontWeight.bold,
    },
    small: {
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      fontWeight: fontWeight.bold,
    },
  },

  // Headline - Section headers
  headline: {
    large: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      fontWeight: fontWeight.semibold,
    },
    medium: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      fontWeight: fontWeight.semibold,
    },
    small: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      fontWeight: fontWeight.semibold,
    },
  },

  // Title - Card titles, list headers
  title: {
    large: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
      fontWeight: fontWeight.medium,
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: fontWeight.medium,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: fontWeight.medium,
    },
  },

  // Body - Main content text
  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      fontWeight: fontWeight.regular,
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: fontWeight.regular,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      fontWeight: fontWeight.regular,
    },
  },

  // Label - Button text, form labels
  label: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: fontWeight.medium,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: fontWeight.medium,
    },
    small: {
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: fontWeight.medium,
    },
  },
} as const;

// Pre-composed text styles for React Native
export const textStyles: Record<string, TextStyle> = {
  // Display styles (use display font)
  displayLarge: {
    fontFamily: fontFamily.display,
    fontSize: typeScale.display.large.fontSize,
    lineHeight: typeScale.display.large.lineHeight,
    letterSpacing: typeScale.display.large.letterSpacing,
    fontWeight: typeScale.display.large.fontWeight as TextStyle['fontWeight'],
  },
  displayMedium: {
    fontFamily: fontFamily.display,
    fontSize: typeScale.display.medium.fontSize,
    lineHeight: typeScale.display.medium.lineHeight,
    letterSpacing: typeScale.display.medium.letterSpacing,
    fontWeight: typeScale.display.medium.fontWeight as TextStyle['fontWeight'],
  },
  displaySmall: {
    fontFamily: fontFamily.display,
    fontSize: typeScale.display.small.fontSize,
    lineHeight: typeScale.display.small.lineHeight,
    letterSpacing: typeScale.display.small.letterSpacing,
    fontWeight: typeScale.display.small.fontWeight as TextStyle['fontWeight'],
  },

  // Headline styles (use display font)
  headlineLarge: {
    fontFamily: fontFamily.display,
    fontSize: typeScale.headline.large.fontSize,
    lineHeight: typeScale.headline.large.lineHeight,
    letterSpacing: typeScale.headline.large.letterSpacing,
    fontWeight: typeScale.headline.large.fontWeight as TextStyle['fontWeight'],
  },
  headlineMedium: {
    fontFamily: fontFamily.display,
    fontSize: typeScale.headline.medium.fontSize,
    lineHeight: typeScale.headline.medium.lineHeight,
    letterSpacing: typeScale.headline.medium.letterSpacing,
    fontWeight: typeScale.headline.medium.fontWeight as TextStyle['fontWeight'],
  },
  headlineSmall: {
    fontFamily: fontFamily.display,
    fontSize: typeScale.headline.small.fontSize,
    lineHeight: typeScale.headline.small.lineHeight,
    letterSpacing: typeScale.headline.small.letterSpacing,
    fontWeight: typeScale.headline.small.fontWeight as TextStyle['fontWeight'],
  },

  // Title styles (use sans font)
  titleLarge: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.title.large.fontSize,
    lineHeight: typeScale.title.large.lineHeight,
    letterSpacing: typeScale.title.large.letterSpacing,
    fontWeight: typeScale.title.large.fontWeight as TextStyle['fontWeight'],
  },
  titleMedium: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.title.medium.fontSize,
    lineHeight: typeScale.title.medium.lineHeight,
    letterSpacing: typeScale.title.medium.letterSpacing,
    fontWeight: typeScale.title.medium.fontWeight as TextStyle['fontWeight'],
  },
  titleSmall: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.title.small.fontSize,
    lineHeight: typeScale.title.small.lineHeight,
    letterSpacing: typeScale.title.small.letterSpacing,
    fontWeight: typeScale.title.small.fontWeight as TextStyle['fontWeight'],
  },

  // Body styles (use sans font)
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.body.large.fontSize,
    lineHeight: typeScale.body.large.lineHeight,
    letterSpacing: typeScale.body.large.letterSpacing,
    fontWeight: typeScale.body.large.fontWeight as TextStyle['fontWeight'],
  },
  bodyMedium: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.body.medium.fontSize,
    lineHeight: typeScale.body.medium.lineHeight,
    letterSpacing: typeScale.body.medium.letterSpacing,
    fontWeight: typeScale.body.medium.fontWeight as TextStyle['fontWeight'],
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.body.small.fontSize,
    lineHeight: typeScale.body.small.lineHeight,
    letterSpacing: typeScale.body.small.letterSpacing,
    fontWeight: typeScale.body.small.fontWeight as TextStyle['fontWeight'],
  },

  // Label styles (use sans font)
  labelLarge: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.label.large.fontSize,
    lineHeight: typeScale.label.large.lineHeight,
    letterSpacing: typeScale.label.large.letterSpacing,
    fontWeight: typeScale.label.large.fontWeight as TextStyle['fontWeight'],
  },
  labelMedium: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.label.medium.fontSize,
    lineHeight: typeScale.label.medium.lineHeight,
    letterSpacing: typeScale.label.medium.letterSpacing,
    fontWeight: typeScale.label.medium.fontWeight as TextStyle['fontWeight'],
  },
  labelSmall: {
    fontFamily: fontFamily.sans,
    fontSize: typeScale.label.small.fontSize,
    lineHeight: typeScale.label.small.lineHeight,
    letterSpacing: typeScale.label.small.letterSpacing,
    fontWeight: typeScale.label.small.fontWeight as TextStyle['fontWeight'],
  },
} as const;

export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
export type TypeScale = typeof typeScale;

