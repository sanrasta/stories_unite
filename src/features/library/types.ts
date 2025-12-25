/**
 * Library Feature Types
 */

export interface LibraryBook {
  bookId: string;
  title: string;
  author: string;
  coverUrl: string;
  isUnlocked: boolean;
  purchasedAt?: string;
  lastPlayedAt?: string;
  progress?: number;
}

export interface ChildProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface LibraryState {
  books: LibraryBook[];
  childProfiles: ChildProfile[];
  activeChildId: string | null;
  isLoading: boolean;
  error: string | null;
}

