/**
 * useArExperience Hook
 * 
 * Fetches AR experience configuration from the backend.
 * Handles loading, error states, and caching.
 */

import { useState, useEffect, useCallback } from 'react';
import { resolveArExperience, ArResolveResponse } from '@/services/api/ar';
import { getBookTargetById } from '../lib/arConfig';
import { Logger } from '@/shared/lib/logger';
import type { ArExperience, BookTarget } from '../types';

const logger = Logger.createLogger('useArExperience');

export interface UseArExperienceOptions {
  bookId: string | undefined;
  skipBackendResolve?: boolean; // Use local fixtures only
}

export interface UseArExperienceResult {
  experience: ArExperience | null;
  localTarget: BookTarget | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useArExperience({
  bookId,
  skipBackendResolve = true, // Default to local for now
}: UseArExperienceOptions): UseArExperienceResult {
  const [experience, setExperience] = useState<ArExperience | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get local target from fixtures
  const localTarget = bookId ? getBookTargetById(bookId) : null;

  const fetchExperience = useCallback(async () => {
    if (!bookId) {
      setExperience(null);
      return;
    }

    // If skipping backend, use local fixtures
    if (skipBackendResolve) {
      if (localTarget) {
        setExperience({
          bookId: localTarget.bookId,
          target: localTarget,
          videoUrl: `videos/${localTarget.videoKey}.mp4`,
          targetImageUrl: `targets/${localTarget.targetKey}`,
          unlocked: true, // Assume unlocked for local testing
        });
      } else {
        setError(`Book not found: ${bookId}`);
      }
      return;
    }

    // Fetch from backend
    try {
      setIsLoading(true);
      setError(null);

      const response = await resolveArExperience(bookId);
      
      setExperience({
        bookId: response.bookId,
        target: localTarget!,
        videoUrl: response.videoUrl,
        targetImageUrl: response.targetImageUrl,
        unlocked: response.unlocked,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load experience';
      logger.error('Failed to resolve AR experience', { bookId, error: err });
      setError(message);

      // Fallback to local if backend fails
      if (localTarget) {
        setExperience({
          bookId: localTarget.bookId,
          target: localTarget,
          videoUrl: `videos/${localTarget.videoKey}.mp4`,
          targetImageUrl: `targets/${localTarget.targetKey}`,
          unlocked: true,
        });
        setError(null); // Clear error since we have fallback
      }
    } finally {
      setIsLoading(false);
    }
  }, [bookId, localTarget, skipBackendResolve]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  return {
    experience,
    localTarget,
    isLoading,
    error,
    refetch: fetchExperience,
  };
}

export default useArExperience;

