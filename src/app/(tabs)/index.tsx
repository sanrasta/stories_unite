/**
 * Home Screen
 * 
 * Landing page with featured content and quick actions.
 * Shows a "Continue" card if user has a recently scanned book.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScanPortalButton } from '@/shared/components/ScanPortalButton';
import { GlassCard } from '@/shared/components/GlassCard';
import { useLastScannedBook } from '@/shared/hooks/useLastScannedBook';
import { getBookTargetById } from '@/features/ar/lib/arConfig';

export default function HomeScreen() {
  const router = useRouter();
  const { lastScannedBook, isLoading } = useLastScannedBook();

  // Get book details for last scanned
  const lastBook = lastScannedBook?.bookId
    ? getBookTargetById(lastScannedBook.bookId)
    : null;

  const handleScanPress = () => {
    router.push('/ar');
  };

  const handleContinuePress = () => {
    if (lastScannedBook?.bookId) {
      router.push(`/ar?bookId=${lastScannedBook.bookId}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.title}>StoryVerse</Text>
          <Text style={styles.subtitle}>Bring your books to life with magic</Text>
        </View>

        {/* Continue Reading (if last book exists) */}
        {lastBook && !isLoading && (
          <Pressable onPress={handleContinuePress} style={styles.continueSection}>
            <GlassCard intensity="medium" padding="lg" style={styles.continueCard}>
              <View style={styles.continueContent}>
                <Text style={styles.continueLabel}>Continue</Text>
                <Text style={styles.continueTitle}>{lastBook.title}</Text>
                <Text style={styles.continueSubtitle}>Tap to resume experience</Text>
              </View>
              <View style={styles.playIcon}>
                <Text style={styles.playEmoji}>▶️</Text>
              </View>
            </GlassCard>
          </Pressable>
        )}

        {/* Scan Portal */}
        <View style={styles.scanSection}>
          <ScanPortalButton
            onPress={handleScanPress}
            label="Scan a Book"
            sublabel="Point your camera at a book cover"
            size="xl"
          />
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Discover the Magic</Text>
          
          <GlassCard intensity="light" padding="lg" style={styles.featureCard}>
            <Text style={styles.featureEmoji}>✨</Text>
            <Text style={styles.featureTitle}>AR Experiences</Text>
            <Text style={styles.featureDescription}>
              Watch your book covers come alive with magical animations
            </Text>
          </GlassCard>

          <GlassCard intensity="light" padding="lg" style={styles.featureCard}>
            <Text style={styles.featureEmoji}>👶</Text>
            <Text style={styles.featureTitle}>Personalized Stories</Text>
            <Text style={styles.featureDescription}>
              See your child as the star of their favorite stories
            </Text>
          </GlassCard>

          <GlassCard intensity="light" padding="lg" style={styles.featureCard}>
            <Text style={styles.featureEmoji}>📚</Text>
            <Text style={styles.featureTitle}>Digital Library</Text>
            <Text style={styles.featureDescription}>
              Access your unlocked content anytime, anywhere
            </Text>
          </GlassCard>
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
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#9e9e9e',
    marginBottom: 4,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffc834',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  continueSection: {
    marginBottom: 24,
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ffc834',
    borderWidth: 1,
  },
  continueContent: {
    flex: 1,
  },
  continueLabel: {
    fontSize: 12,
    color: '#ffc834',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fafafa',
    marginBottom: 4,
  },
  continueSubtitle: {
    fontSize: 13,
    color: '#9e9e9e',
  },
  playIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 200, 52, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playEmoji: {
    fontSize: 20,
  },
  scanSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  featuresSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fafafa',
    marginBottom: 8,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureEmoji: {
    fontSize: 36,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fafafa',
    marginBottom: 4,
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: '#9e9e9e',
    flex: 2,
  },
});
