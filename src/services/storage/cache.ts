/**
 * Cache Service
 * 
 * Local storage caching for offline support and performance.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from '@/shared/lib/logger';

const logger = Logger.createLogger('Cache');

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Set a cached value
 */
export async function setCache<T>(
  key: string,
  data: T,
  ttl: number = DEFAULT_TTL
): Promise<void> {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    await AsyncStorage.setItem(`cache:${key}`, JSON.stringify(entry));
  } catch (error) {
    logger.warn(`Failed to set cache: ${key}`, error);
  }
}

/**
 * Get a cached value
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(`cache:${key}`);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    const now = Date.now();

    // Check if expired
    if (now - entry.timestamp > entry.ttl) {
      await AsyncStorage.removeItem(`cache:${key}`);
      return null;
    }

    return entry.data;
  } catch (error) {
    logger.warn(`Failed to get cache: ${key}`, error);
    return null;
  }
}

/**
 * Remove a cached value
 */
export async function removeCache(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(`cache:${key}`);
  } catch (error) {
    logger.warn(`Failed to remove cache: ${key}`, error);
  }
}

/**
 * Clear all cached values
 */
export async function clearCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith('cache:'));
    await AsyncStorage.multiRemove(cacheKeys);
  } catch (error) {
    logger.warn('Failed to clear cache', error);
  }
}

/**
 * Get or set cache with a factory function
 */
export async function getOrSetCache<T>(
  key: string,
  factory: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const cached = await getCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  const data = await factory();
  await setCache(key, data, ttl);
  return data;
}

// Specific cache keys
export const CacheKeys = {
  LIBRARY: 'library',
  LAST_SCANNED_BOOK: 'lastScannedBook',
  USER_SETTINGS: 'userSettings',
  CART: 'cart',
} as const;

export const cache = {
  get: getCache,
  set: setCache,
  remove: removeCache,
  clear: clearCache,
  getOrSet: getOrSetCache,
  keys: CacheKeys,
};

export default cache;

