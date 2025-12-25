/**
 * LibraryScreen
 * 
 * Displays the user's digital book library with unlocked content.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface LibraryScreenProps {
  // Props will be added as features are implemented
}

export function LibraryScreen({}: LibraryScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Library</Text>
          <Text style={styles.subtitle}>Your magical book collection</Text>
        </View>

        {/* Books grid will be added here */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>📚</Text>
          <Text style={styles.placeholderText}>
            Your books will appear here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d1a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fafafa',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9e9e9e',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  placeholderEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});

export default LibraryScreen;

