/**
 * Tab Layout
 * 
 * Bottom tab navigation for main app screens.
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

type TabIconProps = {
  focused: boolean;
  color: string;
  emoji: string;
  label: string;
};

function TabIcon({ focused, color, emoji, label }: TabIconProps) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.emoji, { opacity: focused ? 1 : 0.6 }]}>{emoji}</Text>
      <Text style={[styles.label, { color, fontWeight: focused ? '600' : '400' }]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#ffc834',
        tabBarInactiveTintColor: '#757575',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} emoji="🏠" label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} emoji="📚" label="Library" />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} emoji="📷" label="Scan" />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} emoji="🛒" label="Shop" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} emoji="⚙️" label="Settings" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a2575',
    borderTopWidth: 0,
    height: 80,
    paddingTop: 8,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
  },
});

