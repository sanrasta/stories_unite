/**
 * Library API Service
 * 
 * API endpoints for user's digital library.
 */

import { apiClient } from './client';
import type { LibraryBook, ChildProfile } from '@/features/library';

export interface LibraryResponse {
  books: LibraryBook[];
  childProfiles: ChildProfile[];
}

/**
 * Get user's library
 */
export async function getLibrary(): Promise<LibraryResponse> {
  const response = await apiClient.get<LibraryResponse>('/v1/library');
  return response.data;
}

/**
 * Add a child profile
 */
export async function addChildProfile(name: string): Promise<ChildProfile> {
  const response = await apiClient.post<ChildProfile>('/v1/library/children', { name });
  return response.data;
}

/**
 * Delete a child profile
 */
export async function deleteChildProfile(childId: string): Promise<void> {
  await apiClient.delete(`/v1/library/children/${childId}`);
}

/**
 * Update book progress
 */
export async function updateBookProgress(bookId: string, progress: number): Promise<void> {
  await apiClient.put(`/v1/library/books/${bookId}/progress`, { progress });
}

export const libraryApi = {
  getLibrary,
  addChildProfile,
  deleteChildProfile,
  updateBookProgress,
};

export default libraryApi;

