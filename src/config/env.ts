/**
 * Environment Configuration
 * 
 * Centralized environment variable access.
 */

import Constants from 'expo-constants';

export interface Environment {
  API_BASE_URL: string;
  SHOPIFY_STORE_DOMAIN: string;
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: string;
  CDN_BASE_URL: string;
  IS_DEV: boolean;
}

/**
 * Get environment configuration
 */
export function getEnv(): Environment {
  const extra = Constants.expoConfig?.extra || {};

  return {
    API_BASE_URL: extra.API_BASE_URL || 'https://api.storyverse.app',
    SHOPIFY_STORE_DOMAIN: extra.SHOPIFY_STORE_DOMAIN || '',
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: extra.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    CDN_BASE_URL: extra.CDN_BASE_URL || 'https://cdn.storyverse.app',
    IS_DEV: __DEV__,
  };
}

/**
 * Validate required environment variables
 */
export function validateEnv(): string[] {
  const env = getEnv();
  const missing: string[] = [];

  if (!env.API_BASE_URL) missing.push('API_BASE_URL');
  // Add more validation as needed

  return missing;
}

export default getEnv;

