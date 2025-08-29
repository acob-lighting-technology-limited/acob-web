'use client';

import { useEffect, useState } from 'react';

export function OfflineSafeWebVitals() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Only run in production and when online
    if (process.env.NODE_ENV !== 'production' || !isOnline) {
      return;
    }

    const sendToAnalytics = (metric: {
      name: string;
      value: number;
      id: string;
    }) => {
      // Send to Vercel Analytics
      if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
          action: metric.name,
          category: 'Web Vitals',
          label: metric.id,
          value: Math.round(
            metric.name === 'CLS' ? metric.value * 1000 : metric.value,
          ),
        });
      }

      // Log to console for development (only in non-production)
      if (process.env.NODE_ENV !== 'production') {
        console.log('Web Vital:', metric);
      }
    };

    // Import and initialize web-vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    });
  }, [isOnline]);

  return null;
}
