/**
 * AR API Service
 * 
 * API endpoints for AR experience resolution and events.
 */

import { apiClient } from './client';

export interface ArResolveResponse {
  bookId: string;
  title: string;
  videoUrl: string;
  targetImageUrl: string;
  unlocked: boolean;
}

export interface ArEventPayload {
  type: string;
  bookId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Resolve AR experience for a book
 */
export async function resolveArExperience(bookId: string): Promise<ArResolveResponse> {
  const response = await apiClient.get<ArResolveResponse>(
    `/v1/ar/resolve?bookId=${encodeURIComponent(bookId)}`
  );
  return response.data;
}

/**
 * Send AR event to backend
 */
export async function sendArEvent(event: ArEventPayload): Promise<void> {
  await apiClient.post('/v1/ar/events', event);
}

export const arApi = {
  resolveArExperience,
  sendArEvent,
};

export default arApi;

