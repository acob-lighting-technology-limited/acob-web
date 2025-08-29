import React from 'react';

/**
 * Utility to detect offline status and prevent server-side fetch operations
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Check if we're offline
export function isOffline(): boolean {
  if (!isBrowser) {
    // Server-side: assume online by default
    return false;
  }
  return !navigator.onLine;
}

// Safe fetch wrapper that checks offline status first
export function safeServerFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T | null> {
  if (isOffline()) {
    console.warn('Offline detected, skipping fetch request:', url);
    return Promise.resolve(null);
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return null;
    });
}

// Hook to detect online/offline status
export function useOfflineStatus() {
  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    // Set initial status
    updateOnlineStatus();

    // Add event listeners
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOffline;
}
