/**
 * Scan Tab
 * 
 * Quick access to the AR scanner from the tab bar.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScanPortalButton } from '@/shared/components/ScanPortalButton';

export default function ScanTab() {
  const router = useRouter();

  const handleScanPress = () => {
    router.push('/ar');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan a Book</Text>
        <Text style={styles.description}>
          Point your camera at a book cover to unlock the magic
        </Text>
        
        <View style={styles.scanContainer}>
          <ScanPortalButton
            onPress={handleScanPress}
            label="Open Scanner"
            size="xl"
          />
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for best results:</Text>
          <Text style={styles.tip}>• Hold phone 8-12 inches from book</Text>
          <Text style={styles.tip}>• Ensure good lighting</Text>
          <Text style={styles.tip}>• Keep the book cover flat</Text>
          <Text style={styles.tip}>• Avoid reflections and glare</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d1a',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fafafa',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#9e9e9e',
    textAlign: 'center',
    marginBottom: 48,
  },
  scanContainer: {
    marginBottom: 48,
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fafafa',
    marginBottom: 12,
  },
  tip: {
    fontSize: 13,
    color: '#9e9e9e',
    marginBottom: 8,
  },
});

