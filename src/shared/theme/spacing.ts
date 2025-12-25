/**
 * StoryVerse Spacing System
 * 
 * Based on a 4px base unit for consistent rhythm and alignment.
 * Follows an 8-point grid system for major spacing decisions.
 */

export const spacing = {
  // Base units (4px increments)
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
} as const;

// Semantic spacing for common use cases
export const semanticSpacing = {
  // Component internal padding
  component: {
    xs: spacing[1],   // 4px - tight padding
    sm: spacing[2],   // 8px - small components
    md: spacing[4],   // 16px - default component padding
    lg: spacing[6],   // 24px - large components
    xl: spacing[8],   // 32px - extra large components
  },

  // Content sections
  section: {
    xs: spacing[4],   // 16px
    sm: spacing[6],   // 24px
    md: spacing[8],   // 32px
    lg: spacing[12],  // 48px
    xl: spacing[16],  // 64px
  },

  // Screen edge padding
  screen: {
    horizontal: spacing[4], // 16px - left/right padding
    vertical: spacing[6],   // 24px - top/bottom padding
    safe: spacing[12],      // 48px - safe area consideration
  },

  // Stack spacing (vertical gaps between elements)
  stack: {
    xs: spacing[1],   // 4px
    sm: spacing[2],   // 8px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
    xl: spacing[8],   // 32px
  },

  // Inline spacing (horizontal gaps between elements)
  inline: {
    xs: spacing[1],   // 4px
    sm: spacing[2],   // 8px
    md: spacing[3],   // 12px
    lg: spacing[4],   // 16px
    xl: spacing[6],   // 24px
  },

  // Icon spacing
  icon: {
    xs: spacing[0.5], // 2px
    sm: spacing[1],   // 4px
    md: spacing[2],   // 8px
    lg: spacing[3],   // 12px
  },
} as const;

// Border radius values
export const borderRadius = {
  none: 0,
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  full: 9999,
} as const;

// Component-specific sizes
export const componentSizes = {
  // Button heights
  button: {
    sm: 32,
    md: 44,
    lg: 52,
    xl: 60,
  },

  // Input heights
  input: {
    sm: 36,
    md: 44,
    lg: 52,
  },

  // Icon sizes
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },

  // Avatar sizes
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    '2xl': 120,
  },

  // Card widths
  card: {
    sm: 280,
    md: 320,
    lg: 400,
    full: '100%',
  },

  // Book cover dimensions (1:1.5 aspect ratio)
  bookCover: {
    sm: { width: 100, height: 150 },
    md: { width: 140, height: 210 },
    lg: { width: 180, height: 270 },
    xl: { width: 240, height: 360 },
  },
} as const;

export type SpacingToken = typeof spacing;
export type SemanticSpacingToken = typeof semanticSpacing;
export type BorderRadiusToken = typeof borderRadius;
export type ComponentSizeToken = typeof componentSizes;

