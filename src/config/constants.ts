/**
 * App Constants
 */

export const APP_NAME = 'StoryVerse';
export const APP_SCHEME = 'storyverse';

// AR Configuration
export const AR_FALLBACK_TIMEOUT_MS = 10000;
export const AR_FADE_IN_DURATION_MS = 500;
export const AR_FADE_OUT_DURATION_MS = 300;
export const AR_BOOK_ASPECT_RATIO = 1.5; // 1:1.5

// API Configuration
export const API_TIMEOUT_MS = 30000;
export const RENDER_POLL_INTERVAL_MS = 2000;
export const RENDER_POLL_TIMEOUT_MS = 120000;

// Cache Configuration
export const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
export const LIBRARY_CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

// UI Configuration
export const ANIMATION_DURATION_FAST = 150;
export const ANIMATION_DURATION_NORMAL = 300;
export const ANIMATION_DURATION_SLOW = 500;

// Supported Languages
export const SUPPORTED_LOCALES = ['en', 'fr', 'ar'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

// Deep Link Routes
export const DEEP_LINK_ROUTES = {
  BOOK: 'book',
  LIBRARY: 'library',
  SHOP: 'shop',
  SETTINGS: 'settings',
} as const;

export default {
  APP_NAME,
  APP_SCHEME,
  AR_FALLBACK_TIMEOUT_MS,
  AR_FADE_IN_DURATION_MS,
  AR_FADE_OUT_DURATION_MS,
  AR_BOOK_ASPECT_RATIO,
  API_TIMEOUT_MS,
  RENDER_POLL_INTERVAL_MS,
  RENDER_POLL_TIMEOUT_MS,
  CACHE_TTL_MS,
  LIBRARY_CACHE_TTL_MS,
  ANIMATION_DURATION_FAST,
  ANIMATION_DURATION_NORMAL,
  ANIMATION_DURATION_SLOW,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  DEEP_LINK_ROUTES,
};

