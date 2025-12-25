/**
 * Book Deep Link Route
 * 
 * Handles storyverse://book/{bookId} deep links.
 * Redirects to the AR screen with the book ID.
 */

import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';

export default function BookDeepLink() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();

  // Redirect to AR screen with bookId
  if (bookId) {
    return <Redirect href={`/ar?bookId=${bookId}`} />;
  }

  // Fallback to home if no bookId
  return <Redirect href="/" />;
}

