/**
 * StoryVerse Color Palette - Midnight Library Theme
 * 
 * A mystical, immersive palette designed for magical reading experiences.
 * Dark backgrounds with enchanted gold accents and mystic purple highlights.
 */

export const colors = {
  // Primary - Deep midnight blues (main background and surfaces)
  midnight: {
    50: '#e8eaf4',
    100: '#c5cae3',
    200: '#9fa8d1',
    300: '#7886bf',
    400: '#5b6cb1',
    500: '#3e52a3',
    600: '#384a9b',
    700: '#2f4091',
    800: '#273687',
    900: '#1a2575',
    950: '#0f0d1a', // Deepest background - primary app background
  },

  // Accent - Enchanted gold (CTAs, highlights, magical elements)
  gold: {
    50: '#fff9e6',
    100: '#ffefc2',
    200: '#ffe499',
    300: '#ffd970',
    400: '#ffd152',
    500: '#ffc834', // Primary gold
    600: '#ffba2f',
    700: '#ffa827',
    800: '#ff9720',
    900: '#ff7a14',
  },

  // Secondary - Mystic purple (secondary actions, magic effects)
  mystic: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0', // Primary purple
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },

  // Tertiary - Stardust silver (text, borders, subtle elements)
  stardust: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic colors
  success: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },

  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },

  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },

  // Glass effect colors (for overlays and cards)
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    heavy: 'rgba(255, 255, 255, 0.25)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Pure colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Semantic color aliases for easier usage
export const semantic = {
  // Backgrounds
  background: {
    primary: colors.midnight[950],
    secondary: colors.midnight[900],
    tertiary: colors.midnight[800],
    elevated: colors.midnight[700],
  },

  // Text
  text: {
    primary: colors.stardust[50],
    secondary: colors.stardust[300],
    tertiary: colors.stardust[500],
    muted: colors.stardust[600],
    inverse: colors.midnight[950],
  },

  // Interactive elements
  interactive: {
    primary: colors.gold[500],
    primaryHover: colors.gold[400],
    primaryPressed: colors.gold[600],
    secondary: colors.mystic[500],
    secondaryHover: colors.mystic[400],
    secondaryPressed: colors.mystic[600],
  },

  // Borders
  border: {
    subtle: colors.stardust[800],
    default: colors.stardust[700],
    strong: colors.stardust[500],
  },

  // Status
  status: {
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.mystic[400],
  },
} as const;

export type ColorToken = typeof colors;
export type SemanticColor = typeof semantic;

