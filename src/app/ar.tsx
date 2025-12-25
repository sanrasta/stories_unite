/**
 * AR Route
 * 
 * Handles storyverse://book/{bookId} deep links and renders ArScreen.
 */

import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ArScreen } from '@/features/ar';

export default function ArRoute() {
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();

  return <ArScreen bookId={bookId} />;
}

