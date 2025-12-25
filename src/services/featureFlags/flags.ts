/**
 * Feature Flags
 * 
 * Runtime feature flag management.
 */

export interface FeatureFlags {
  AR_ENABLED: boolean;
  SHOP_ENABLED: boolean;
  PERSONALIZATION_ENABLED: boolean;
  DEBUG_MODE: boolean;
  SIMULATOR_MODE: boolean; // Bypasses AR for simulator testing
}

// Default feature flags
const defaultFlags: FeatureFlags = {
  AR_ENABLED: true,
  SHOP_ENABLED: true,
  PERSONALIZATION_ENABLED: true,
  DEBUG_MODE: __DEV__,
  SIMULATOR_MODE: true, // 👈 Set to true to test in simulator without AR
};

// Current flags state
let currentFlags: FeatureFlags = { ...defaultFlags };

/**
 * Get all feature flags
 */
export function getFeatureFlags(): FeatureFlags {
  return { ...currentFlags };
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  return currentFlags[flag];
}

/**
 * Set feature flags (e.g., from remote config)
 */
export function setFeatureFlags(flags: Partial<FeatureFlags>): void {
  currentFlags = { ...currentFlags, ...flags };
}

/**
 * Reset to default flags
 */
export function resetFeatureFlags(): void {
  currentFlags = { ...defaultFlags };
}

export const featureFlags = {
  get: getFeatureFlags,
  isEnabled: isFeatureEnabled,
  set: setFeatureFlags,
  reset: resetFeatureFlags,
};

export default featureFlags;

