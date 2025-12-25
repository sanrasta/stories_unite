/**
 * SettingsScreen
 * 
 * User settings, account management, and preferences.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface SettingsScreenProps {
  // Props will be added as features are implemented
}

export function SettingsScreen({}: SettingsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        {/* Settings sections will be added here */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>⚙️</Text>
          <Text style={styles.placeholderText}>
            Settings coming soon
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

export default SettingsScreen;

