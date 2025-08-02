/**
 * Global fetch interceptor to prevent fetch calls when offline
 */

// Store the original fetch function
const originalFetch = globalThis.fetch;

// Check if we're offline
function isOffline(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: assume online by default
    return false;
  }
  return !navigator.onLine;
}

// Intercept fetch calls
function interceptedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  // Check if we're offline
  if (isOffline()) {
    console.warn('Offline detected, preventing fetch request:', input);

    // Return a rejected promise that mimics a network error
    return Promise.reject(new TypeError('fetch failed - offline'));
  }

  // If online, proceed with the original fetch
  return originalFetch(input, init);
}

// Install the interceptor
export function installFetchInterceptor() {
  if (typeof window !== 'undefined') {
    // Only install in browser environment
    globalThis.fetch = interceptedFetch;
  }
}

// Restore the original fetch
export function restoreFetch() {
  if (typeof window !== 'undefined') {
    globalThis.fetch = originalFetch;
  }
}

// Auto-install the interceptor when this module is imported
if (typeof window !== 'undefined') {
  installFetchInterceptor();
}
