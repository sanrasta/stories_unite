/**
 * Book Deep Link Route
 * 
 * Handles storyverse://book/{bookId} deep links.
 * Redirects to the AR screen with the book ID.
 * Persists the book ID for later resumption.
 */

import React, { useEffect } from 'react';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { useLastScannedBook } from '@/shared/hooks/useLastScannedBook';

export default function BookDeepLink() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { setLastScannedBook } = useLastScannedBook();

  // Persist the book ID when arriving via deep link
  useEffect(() => {
    if (bookId) {
      setLastScannedBook(bookId);
    }
  }, [bookId, setLastScannedBook]);

  // Redirect to AR screen with bookId
  if (bookId) {
    return <Redirect href={`/ar?bookId=${bookId}`} />;
  }

  // Fallback to home if no bookId
  return <Redirect href="/" />;
}
