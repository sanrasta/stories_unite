/**
 * useLastScannedBook Hook
 * 
 * Persists and retrieves the last scanned book ID for deep linking continuity.
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@storyverse/lastScannedBook';

export interface LastScannedBook {
  bookId: string;
  scannedAt: string;
}

export interface UseLastScannedBookResult {
  lastScannedBook: LastScannedBook | null;
  isLoading: boolean;
  setLastScannedBook: (bookId: string) => Promise<void>;
  clearLastScannedBook: () => Promise<void>;
}

export function useLastScannedBook(): UseLastScannedBookResult {
  const [lastScannedBook, setLastScannedBookState] = useState<LastScannedBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load on mount
  useEffect(() => {
    loadLastScannedBook();
  }, []);

  const loadLastScannedBook = async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLastScannedBookState(JSON.parse(stored));
      }
    } catch (error) {
      console.error('[useLastScannedBook] Failed to load:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLastScannedBook = useCallback(async (bookId: string) => {
    try {
      const data: LastScannedBook = {
        bookId,
        scannedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastScannedBookState(data);
    } catch (error) {
      console.error('[useLastScannedBook] Failed to save:', error);
    }
  }, []);

  const clearLastScannedBook = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setLastScannedBookState(null);
    } catch (error) {
      console.error('[useLastScannedBook] Failed to clear:', error);
    }
  }, []);

  return {
    lastScannedBook,
    isLoading,
    setLastScannedBook,
    clearLastScannedBook,
  };
}

export default useLastScannedBook;

