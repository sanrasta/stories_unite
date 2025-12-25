/**
 * Shared Library Functions
 */

export { Analytics, trackEvent, identifyUser, resetIdentity, setAnalyticsProvider } from './analytics';
export { Logger, createLogger, setLogLevel } from './logger';
export {
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
} from './platform';

