/**
 * Shared Components
 * 
 * Centralized export of all shared UI components.
 * Import from '@/shared/components' for clean imports.
 */

// Core components
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { Card } from './Card';
export type { CardProps, CardVariant } from './Card';

export { Loading } from './Loading';
export type { LoadingProps, LoadingVariant, LoadingSize } from './Loading';

export { ErrorState } from './ErrorState';
export type { ErrorStateProps, ErrorSeverity } from './ErrorState';

// Glass and visual effect components
export { GlassCard } from './GlassCard';
export type { GlassCardProps, GlassIntensity } from './GlassCard';

// Book-related components
export { BookCoverCard } from './BookCoverCard';
export type { BookCoverCardProps, BookCoverSize } from './BookCoverCard';

// AR/Scanner components
export { ScanPortalButton } from './ScanPortalButton';
export type { ScanPortalButtonProps } from './ScanPortalButton';

// Loading state components
export { SkeletonRow, SkeletonBookCard, SkeletonListItem } from './SkeletonRow';
export type { SkeletonRowProps } from './SkeletonRow';

// Magic/Preview components
export { MagicPreviewCard } from './MagicPreviewCard';
export type { MagicPreviewCardProps, PreviewStatus } from './MagicPreviewCard';

