/**
 * AR Configuration
 * 
 * Configuration utilities for AR experience setup.
 * Reads from fixtures.json and provides runtime config.
 */

import fixturesData from '@/assets/fixtures.json';
import type { BookTarget, ArConfig } from '../types';

// Type assertion for the fixtures data
const fixtures = fixturesData as {
  books: BookTarget[];
  arConfig: ArConfig;
  supportedLocales: string[];
  version: string;
};

/**
 * Get AR configuration
 */
export function getArConfig(): ArConfig {
  return fixtures.arConfig;
}

/**
 * Get all book targets
 */
export function getAllBookTargets(): BookTarget[] {
  return fixtures.books;
}

/**
 * Get book target by ID
 */
export function getBookTargetById(bookId: string): BookTarget | null {
  return fixtures.books.find((book) => book.bookId === bookId) ?? null;
}

/**
 * Get book target by target key
 */
export function getBookTargetByTargetKey(targetKey: string): BookTarget | null {
  return fixtures.books.find((book) => book.targetKey === targetKey) ?? null;
}

/**
 * Get target image source path
 */
export function getTargetImagePath(targetKey: string): string {
  return `targets/${targetKey}`;
}

/**
 * Get video source path
 */
export function getVideoPath(videoKey: string): string {
  return `videos/${videoKey}.mp4`;
}

/**
 * Get physical dimensions for a book
 */
export function getPhysicalDimensions(bookId: string): {
  width: number;
  height: number;
} {
  const target = getBookTargetById(bookId);
  if (target) {
    return {
      width: target.physicalWidthMeters,
      height: target.physicalHeightMeters,
    };
  }
  return {
    width: fixtures.arConfig.defaultPhysicalWidth,
    height: fixtures.arConfig.defaultPhysicalHeight,
  };
}

/**
 * Build ViroARImageMarker configuration
 */
export function buildImageMarkerConfig(bookId: string) {
  const target = getBookTargetById(bookId);
  if (!target) {
    throw new Error(`Book target not found: ${bookId}`);
  }

  const config = getArConfig();

  return {
    targetKey: target.targetKey,
    videoKey: target.videoKey,
    physicalWidth: target.physicalWidthMeters,
    physicalHeight: target.physicalHeightMeters,
    fadeInDuration: config.fadeInDurationMs,
    fadeOutDuration: config.fadeOutDurationMs,
    fallbackTimeout: config.fallbackTimeoutMs,
  };
}

/**
 * Supported locales
 */
export function getSupportedLocales(): string[] {
  return fixtures.supportedLocales;
}

/**
 * Fixtures version
 */
export function getFixturesVersion(): string {
  return fixtures.version;
}

