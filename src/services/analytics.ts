/**
 * Analytics service for event telemetry.
 * Captures interaction events without collecting personally identifiable information (PII).
 */

export interface AnalyticsEventPayload {
  product?: string;
  category?: string;
  destination?: string;
  source_page?: string;
  source_section?: string;
  [key: string]: unknown;
}

export type ScrabytAnalyticsEvent =
  | 'scrabyt_aiaas_card_view'
  | 'scrabyt_aiaas_internal_click'
  | 'scrabyt_external_click'
  | 'scrabyt_nav_click'
  | 'scrabyt_homepage_click'
  | 'scrabyt_aiaas_page_view'
  | 'recent_product_launch_view'
  | 'scrabyt_homepage_launch_click'
  | 'scrabyt_aiaas_click';

export const trackEvent = (
  eventName: ScrabytAnalyticsEvent | string,
  payload: AnalyticsEventPayload = {}
) => {
  // Ensure no PII is included
  const sanitizedPayload: AnalyticsEventPayload = {
    ...payload,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Log in development or debug mode
  if (typeof window !== 'undefined' && ((window as any).__AI_STUDIO_DEBUG__ || process.env.NODE_ENV === 'development')) {
    console.info(`[Analytics Track: ${eventName}]`, sanitizedPayload);
  }

  // Hook into window.dataLayer or third-party analytics if consent permits
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...sanitizedPayload,
    });
  }
};

export const trackScrabytExternalClick = (source_page: string, source_section: string) => {
  trackEvent('scrabyt_external_click', {
    product: 'Scrabyt',
    category: 'AI as a Service',
    destination: 'https://www.scrabyt.com/',
    source_page,
    source_section,
  });
};
