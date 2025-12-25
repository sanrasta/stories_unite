/**
 * AR Feature
 * 
 * Public exports for the AR scanning and video overlay feature.
 */

// Screens
export { ArScreen } from './screens/ArScreen';
export type { ArScreenProps } from './screens/ArScreen';

// Components
export { ArScene } from './components/ArScene';
export type { ArSceneProps } from './components/ArScene';

export { ArHud } from './components/ArHud';
export type { ArHudProps } from './components/ArHud';

export { ArFallback } from './components/ArFallback';
export type { ArFallbackProps } from './components/ArFallback';

export { ArPermissionGate } from './components/ArPermissionGate';
export type { ArPermissionGateProps } from './components/ArPermissionGate';

export { ArSimulatorMode } from './components/ArSimulatorMode';
export type { ArSimulatorModeProps } from './components/ArSimulatorMode';

// Hooks
export { useArPermissions } from './hooks/useArPermissions';
export type { UseArPermissionsResult } from './hooks/useArPermissions';

export { useArFallbackTimer } from './hooks/useArFallbackTimer';
export type { UseArFallbackTimerOptions, UseArFallbackTimerResult } from './hooks/useArFallbackTimer';

export { useArPerformanceMode } from './hooks/useArPerformanceMode';
export type { UseArPerformanceModeOptions, UseArPerformanceModeResult } from './hooks/useArPerformanceMode';

export { useArExperience } from './hooks/useArExperience';
export type { UseArExperienceOptions, UseArExperienceResult } from './hooks/useArExperience';

// Library functions
export {
  getArConfig,
  getAllBookTargets,
  getBookTargetById,
  getBookTargetByTargetKey,
  getTargetImagePath,
  getVideoPath,
  getPhysicalDimensions,
  buildImageMarkerConfig,
} from './lib/arConfig';

export {
  ArEvents,
  createArEvent,
  emitArEvent,
  subscribeToArEvents,
  toAnalyticsPayload,
} from './lib/arEvents';

// Types
export type {
  BookTarget,
  ArConfig,
  ArTrackingState,
  ArPermissionState,
  ArSessionState,
  ArError,
  ArErrorCode,
  ArEvent,
  ArEventType,
  ArExperience,
  ArHudState,
} from './types';

