/**
 * Analytics
 * 
 * Analytics abstraction layer for tracking user events.
 */

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

type AnalyticsProvider = {
  track: (event: AnalyticsEvent) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  reset: () => void;
};

// Default no-op provider
let provider: AnalyticsProvider = {
  track: () => {},
  identify: () => {},
  reset: () => {},
};

/**
 * Set the analytics provider
 */
export function setAnalyticsProvider(newProvider: AnalyticsProvider): void {
  provider = newProvider;
}

/**
 * Track an event
 */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  provider.track({ name, properties });
}

/**
 * Identify a user
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  provider.identify(userId, traits);
}

/**
 * Reset user identity
 */
export function resetIdentity(): void {
  provider.reset();
}

// Pre-defined event helpers
export const Analytics = {
  // AR Events
  arSessionStarted: (bookId: string) => {
    trackEvent('ar_session_started', { book_id: bookId });
  },
  arAnchorFound: (bookId: string) => {
    trackEvent('ar_anchor_found', { book_id: bookId });
  },
  arFallbackTriggered: (bookId: string, reason: string) => {
    trackEvent('ar_fallback_triggered', { book_id: bookId, reason });
  },

  // Library Events
  bookOpened: (bookId: string) => {
    trackEvent('book_opened', { book_id: bookId });
  },
  libraryViewed: () => {
    trackEvent('library_viewed');
  },

  // Shop Events
  productViewed: (productId: string) => {
    trackEvent('product_viewed', { product_id: productId });
  },
  addedToCart: (productId: string, price: number) => {
    trackEvent('added_to_cart', { product_id: productId, price });
  },
  purchaseCompleted: (orderId: string, total: number) => {
    trackEvent('purchase_completed', { order_id: orderId, total });
  },

  // User Events
  signedUp: () => {
    trackEvent('signed_up');
  },
  signedIn: () => {
    trackEvent('signed_in');
  },
  signedOut: () => {
    trackEvent('signed_out');
  },
};

export default Analytics;

