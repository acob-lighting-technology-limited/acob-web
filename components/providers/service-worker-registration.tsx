'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker for offline support.
 * The SW pre-caches a static offline fallback page and serves it
 * whenever a navigation request fails (i.e. the user is offline).
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          // Check for updates periodically (every 60 minutes)
          setInterval(
            () => {
              registration.update();
            },
            60 * 60 * 1000,
          );
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
