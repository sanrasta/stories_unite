/**
 * Platform Utilities
 * 
 * Platform detection and device information helpers.
 */

import { Platform, Dimensions, PixelRatio } from 'react-native';

/**
 * Platform checks
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

/**
 * Get OS version
 */
export const osVersion = Platform.Version;

/**
 * Device dimensions
 */
export function getScreenDimensions() {
  const { width, height } = Dimensions.get('screen');
  return { width, height };
}

export function getWindowDimensions() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}

/**
 * Pixel ratio helpers
 */
export const pixelRatio = PixelRatio.get();
export const fontScale = PixelRatio.getFontScale();

/**
 * Check if device has notch/dynamic island
 */
export function hasNotch(): boolean {
  const { height, width } = getWindowDimensions();
  
  if (isIOS) {
    // iPhone X and later have notch (height >= 812 or width >= 812 for landscape)
    return (
      (height >= 812 || width >= 812) &&
      pixelRatio >= 2
    );
  }
  
  return false;
}

/**
 * Get safe area insets (approximate for non-expo environments)
 */
export function getSafeAreaInsets() {
  if (isIOS && hasNotch()) {
    return {
      top: 47,
      bottom: 34,
      left: 0,
      right: 0,
    };
  }
  
  return {
    top: isIOS ? 20 : 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
}

/**
 * Check if device supports ARKit/ARCore
 */
export function supportsAR(): boolean {
  // This is a placeholder - actual AR support detection
  // would require native module integration
  if (isIOS) {
    // iOS 11+ supports ARKit
    const version = typeof osVersion === 'string' ? parseInt(osVersion, 10) : osVersion;
    return version >= 11;
  }
  
  if (isAndroid) {
    // Android 7.0+ with ARCore support
    const version = typeof osVersion === 'string' ? parseInt(osVersion, 10) : osVersion;
    return version >= 24;
  }
  
  return false;
}

/**
 * Platform-specific value selector
 */
export function select<T>(config: { ios?: T; android?: T; default: T }): T {
  if (isIOS && config.ios !== undefined) {
    return config.ios;
  }
  if (isAndroid && config.android !== undefined) {
    return config.android;
  }
  return config.default;
}

export default {
  isIOS,
  isAndroid,
  isWeb,
  osVersion,
  pixelRatio,
  fontScale,
  getScreenDimensions,
  getWindowDimensions,
  hasNotch,
  getSafeAreaInsets,
  supportsAR,
  select,
};

