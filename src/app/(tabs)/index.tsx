/**
 * Home Screen
 * 
 * Landing page with featured content and quick actions.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScanPortalButton } from '@/shared/components/ScanPortalButton';
import { GlassCard } from '@/shared/components/GlassCard';

export default function HomeScreen() {
  const router = useRouter();

  const handleScanPress = () => {
    router.push('/ar');
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
    marginBottom: 32,
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

