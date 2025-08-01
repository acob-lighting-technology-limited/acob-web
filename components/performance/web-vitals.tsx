'use client';

import { useEffect } from 'react';

export function WebVitals() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    const sendToAnalytics = (metric: any) => {
      // Send to Google Analytics or your analytics service
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(
            metric.name === 'CLS' ? metric.value * 1000 : metric.value
          ),
          non_interaction: true,
        });
      }

      // Log to console for development
      console.log('Web Vital:', metric);
    };

    // Import and initialize web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }, []);

  return null;
}
