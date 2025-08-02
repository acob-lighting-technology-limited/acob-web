/**
 * Custom fetch wrapper that intercepts network errors and prevents Next.js error handling
 */

// Store original fetch
const originalFetch = globalThis.fetch;

// Check if we're offline
function isOffline(): boolean {
  if (typeof window === 'undefined') return false;
  return !navigator.onLine;
}

// Check if it's a Next.js internal request
function isNextJSInternal(url: string): boolean {
  return (
    url.includes('__next') ||
    url.includes('webpack') ||
    url.includes('react-server') ||
    url.includes('layout-router') ||
    url.includes('error-boundary') ||
    url.includes('resolveErrorDev') ||
    url.includes('processFullStringRow') ||
    url.includes('processFullBinaryRow') ||
    url.includes('__nextjs_original-stack-frames') ||
    url.includes('__nextjs_original-stack-frame') ||
    url.startsWith('/_next/') ||
    url.includes('webpack-internal')
  );
}

// Check if it's a NextAuth request
function isNextAuthRequest(url: string): boolean {
  return url.includes('/api/auth') || url.includes('next-auth');
}

// Check if it's a Sanity API request
function isSanityRequest(url: string): boolean {
  return url.includes('sanity.io') || url.includes('apicdn.sanity.io');
}

// Custom fetch wrapper
export function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const url = typeof input === 'string' ? input : input.toString();

  // If offline, handle different types of requests
  if (isOffline()) {
    // For Next.js internal requests, return empty response
    if (isNextJSInternal(url)) {
      console.log('🔄 Offline: Intercepted Next.js internal request:', url);
      return Promise.resolve(new Response('', { status: 200 }));
    }

    // For NextAuth requests, return empty session
    if (isNextAuthRequest(url)) {
      console.log('🔄 Offline: Intercepted NextAuth request:', url);
      return Promise.resolve(
        new Response(JSON.stringify({ user: null, expires: null }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }

    // For Sanity API requests, return empty result
    if (isSanityRequest(url)) {
      console.log('🔄 Offline: Intercepted Sanity request:', url);
      return Promise.resolve(
        new Response(JSON.stringify({ result: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }

    // For all other requests, return service unavailable
    console.log('🔄 Offline: Intercepted external request:', url);
    return Promise.resolve(
      new Response(
        JSON.stringify({ error: 'Service unavailable when offline' }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );
  }

  // If online, use original fetch but catch errors
  return originalFetch(input, init).catch(error => {
    console.log('🔄 Network error caught:', error.message);

    // For Next.js internal requests, return empty response
    if (isNextJSInternal(url)) {
      return new Response('', { status: 200 });
    }

    // For NextAuth requests, return empty session
    if (isNextAuthRequest(url)) {
      return new Response(JSON.stringify({ user: null, expires: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // For Sanity API requests, return empty result
    if (isSanityRequest(url)) {
      return new Response(JSON.stringify({ result: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // For all other requests, return service unavailable
    return new Response(JSON.stringify({ error: 'Network error occurred' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  });
}

// Install the custom fetch wrapper
export function installFetchWrapper(): void {
  if (typeof window !== 'undefined') {
    globalThis.fetch = customFetch;
    console.log('✅ Custom fetch wrapper installed');
  }
}

// Restore original fetch
export function restoreOriginalFetch(): void {
  if (typeof window !== 'undefined') {
    globalThis.fetch = originalFetch;
    console.log('✅ Original fetch restored');
  }
}
