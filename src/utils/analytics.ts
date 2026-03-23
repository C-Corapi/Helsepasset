/**
 * Umami analytics utility helpers.
 *
 * The `umami` object is injected globally by the tracking script loaded in Layout.astro.
 * These helpers provide a typed wrapper and graceful fallback when Umami is not available
 * (e.g. in development or when blocked by an ad-blocker).
 *
 * Usage:
 *   import { trackEvent } from '../utils/analytics';
 *   trackEvent('button-click', { label: 'hero CTA' });
 */

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
    };
  }
}

/**
 * Track a custom event with optional metadata.
 *
 * @param event - The event name (e.g. 'contact-form-submit')
 * @param data  - Optional key-value payload attached to the event
 *
 * @example
 * trackEvent('contact-form-submit', { subject: 'Pricing question' });
 */
export function trackEvent(
  event: string,
  data?: Record<string, unknown>,
): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(event, data);
  }
}

/**
 * Identify the current visitor with custom attributes.
 * Useful for tagging logged-in users (without PII).
 *
 * @param data - Key-value object describing the visitor
 *
 * @example
 * identifyVisitor({ plan: 'free', locale: 'nb' });
 */
export function identifyVisitor(data: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.identify(data);
  }
}
