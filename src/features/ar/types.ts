/**
 * AR Feature Types
 * 
 * Type definitions for AR-related data structures and states.
 */

export interface BookTarget {
  bookId: string;
  title: string;
  theme: string;
  targetKey: string;
  videoKey: string;
  physicalWidthMeters: number;
  physicalHeightMeters: number;
  locale: string;
  description?: string;
  author?: string;
  ageRange?: string;
  tags?: string[];
}

export interface ArConfig {
  defaultPhysicalWidth: number;
  defaultPhysicalHeight: number;
  aspectRatio: number;
  fallbackTimeoutMs: number;
  fadeInDurationMs: number;
  fadeOutDurationMs: number;
}

export type ArTrackingState = 
  | 'initializing'
  | 'scanning'
  | 'tracking'
  | 'lost'
  | 'error';

export type ArPermissionState =
  | 'undetermined'
  | 'granted'
  | 'denied'
  | 'restricted';

export interface ArSessionState {
  trackingState: ArTrackingState;
  permissionState: ArPermissionState;
  currentAnchorId: string | null;
  currentBookId: string | null;
  isVideoPlaying: boolean;
  videoOpacity: number;
  error: ArError | null;
}

export interface ArError {
  code: ArErrorCode;
  message: string;
  recoverable: boolean;
}

export type ArErrorCode =
  | 'CAMERA_PERMISSION_DENIED'
  | 'AR_NOT_SUPPORTED'
  | 'TARGET_NOT_FOUND'
  | 'VIDEO_LOAD_ERROR'
  | 'TRACKING_LOST'
  | 'UNKNOWN_ERROR';

export interface ArEvent {
  type: ArEventType;
  bookId: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export type ArEventType =
  | 'session_started'
  | 'anchor_found'
  | 'anchor_lost'
  | 'video_started'
  | 'video_paused'
  | 'video_completed'
  | 'fallback_triggered'
  | 'session_ended'
  | 'error';

export interface ArExperience {
  bookId: string;
  target: BookTarget;
  videoUrl: string;
  targetImageUrl: string;
  unlocked: boolean;
  lastPlayed?: string;
}

export interface ArHudState {
  showInstructions: boolean;
  showFallbackButton: boolean;
  fallbackCountdown: number | null;
  trackingQuality: 'poor' | 'fair' | 'good';
}

