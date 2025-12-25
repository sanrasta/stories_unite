/**
 * StoryVerse Design Tokens
 * 
 * Centralized export of all design tokens for the Midnight Library theme.
 * Import this file for access to the complete design system.
 */

export * from './colors';
export * from './spacing';
export * from './typography';

import { colors, semantic } from './colors';
import { spacing, semanticSpacing, borderRadius, componentSizes } from './spacing';
import { fontFamily, fontWeight, lineHeight, letterSpacing, typeScale, textStyles } from './typography';

// Unified theme object for easy consumption
export const theme = {
  colors,
  semantic,
  spacing,
  semanticSpacing,
  borderRadius,
  componentSizes,
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,
  typeScale,
  textStyles,
} as const;

// Animation timing values
export const animation = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Custom cubic-bezier values for React Native Animated
    spring: { tension: 40, friction: 7 },
    gentle: { tension: 20, friction: 10 },
    bouncy: { tension: 100, friction: 6 },
  },
} as const;

// Shadow presets
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  // Glow effects
  glowGold: {
    shadowColor: colors.gold[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  glowMystic: {
    shadowColor: colors.mystic[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  xs: 0,
  sm: 360,
  md: 480,
  lg: 768,
  xl: 1024,
  '2xl': 1280,
} as const;

// Safe area padding (common device values)
export const safeArea = {
  top: {
    default: 44,
    notch: 47,
    dynamicIsland: 59,
  },
  bottom: {
    default: 34,
    noHomeIndicator: 0,
  },
} as const;

export type Theme = typeof theme;
export type Animation = typeof animation;
export type Shadows = typeof shadows;
export type ZIndex = typeof zIndex;
export type Breakpoints = typeof breakpoints;

