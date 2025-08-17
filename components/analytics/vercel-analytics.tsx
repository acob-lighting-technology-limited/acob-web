'use client';

import { Analytics } from '@vercel/analytics/react';

export function VercelAnalytics() {
  return <Analytics />;
}

// Helper function to track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', {
      action,
      category,
      label,
      value,
    });
  }
};

// Helper function to track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('pageview', {
      url,
    });
  }
};
