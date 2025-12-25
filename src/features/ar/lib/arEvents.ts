/**
 * AR Events
 * 
 * Event handling and analytics for AR sessions.
 */

import type { ArEvent, ArEventType } from '../types';

type ArEventListener = (event: ArEvent) => void;

// Event listeners
const listeners: Set<ArEventListener> = new Set();

/**
 * Create an AR event
 */
export function createArEvent(
  type: ArEventType,
  bookId: string,
  metadata?: Record<string, unknown>
): ArEvent {
  return {
    type,
    bookId,
    timestamp: Date.now(),
    metadata,
  };
}

/**
 * Emit an AR event
 */
export function emitArEvent(event: ArEvent): void {
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch (error) {
      console.error('[ArEvents] Listener error:', error);
    }
  });
}

/**
 * Subscribe to AR events
 */
export function subscribeToArEvents(listener: ArEventListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Helper to emit common events
 */
export const ArEvents = {
  sessionStarted: (bookId: string) => {
    emitArEvent(createArEvent('session_started', bookId));
  },

  anchorFound: (bookId: string, anchorId: string) => {
    emitArEvent(createArEvent('anchor_found', bookId, { anchorId }));
  },

  anchorLost: (bookId: string, anchorId: string) => {
    emitArEvent(createArEvent('anchor_lost', bookId, { anchorId }));
  },

  videoStarted: (bookId: string) => {
    emitArEvent(createArEvent('video_started', bookId));
  },

  videoPaused: (bookId: string) => {
    emitArEvent(createArEvent('video_paused', bookId));
  },

  videoCompleted: (bookId: string) => {
    emitArEvent(createArEvent('video_completed', bookId));
  },

  fallbackTriggered: (bookId: string, reason: 'timeout' | 'user') => {
    emitArEvent(createArEvent('fallback_triggered', bookId, { reason }));
  },

  sessionEnded: (bookId: string, duration: number) => {
    emitArEvent(createArEvent('session_ended', bookId, { durationMs: duration }));
  },

  error: (bookId: string, errorCode: string, errorMessage: string) => {
    emitArEvent(createArEvent('error', bookId, { errorCode, errorMessage }));
  },
};

/**
 * Create analytics-ready event payload
 */
export function toAnalyticsPayload(event: ArEvent): Record<string, unknown> {
  return {
    event_name: `ar_${event.type}`,
    book_id: event.bookId,
    timestamp: new Date(event.timestamp).toISOString(),
    ...event.metadata,
  };
}

