/**
 * Cache Headers Utility
 * Helper functions to add caching headers to API responses
 */

import { CACHE_DURATION } from '@/lib/constants/ui';

export interface CacheConfig {
  maxAge: number; // seconds
  sMaxAge?: number; // seconds (CDN cache)
  staleWhileRevalidate?: number; // seconds
  staleIfError?: number; // seconds
  public?: boolean;
}

/**
 * Generate Cache-Control header value
 */
export function getCacheControlHeader(config: CacheConfig): string {
  const parts: string[] = [];

  // Public or private
  parts.push(config.public !== false ? 'public' : 'private');

  // Max age
  parts.push(`max-age=${config.maxAge}`);

  // S-maxage (CDN cache)
  if (config.sMaxAge !== undefined) {
    parts.push(`s-maxage=${config.sMaxAge}`);
  }

  // Stale while revalidate
  if (config.staleWhileRevalidate !== undefined) {
    parts.push(`stale-while-revalidate=${config.staleWhileRevalidate}`);
  }

  // Stale if error
  if (config.staleIfError !== undefined) {
    parts.push(`stale-if-error=${config.staleIfError}`);
  }

  return parts.join(', ');
}

/**
 * Predefined cache configurations
 */
export const CACHE_CONFIGS = {
  // No caching
  NO_CACHE: {
    maxAge: 0,
    sMaxAge: 0,
    public: false,
  },

  // Short-lived cache (5 minutes)
  SHORT: {
    maxAge: CACHE_DURATION.SHORT,
    sMaxAge: CACHE_DURATION.SHORT,
    staleWhileRevalidate: CACHE_DURATION.SHORT,
  },

  // Medium cache (30 minutes)
  MEDIUM: {
    maxAge: CACHE_DURATION.MEDIUM,
    sMaxAge: CACHE_DURATION.MEDIUM,
    staleWhileRevalidate: CACHE_DURATION.MEDIUM * 2,
  },

  // Long cache (1 hour)
  LONG: {
    maxAge: CACHE_DURATION.LONG,
    sMaxAge: CACHE_DURATION.LONG,
    staleWhileRevalidate: CACHE_DURATION.LONG * 2,
  },

  // Static content (1 day)
  STATIC: {
    maxAge: CACHE_DURATION.DAY,
    sMaxAge: CACHE_DURATION.DAY,
    staleWhileRevalidate: CACHE_DURATION.DAY * 7,
  },
} as const;

/**
 * Add cache headers to Response headers
 */
export function withCacheHeaders(
  headers: Record<string, string>,
  config: CacheConfig | keyof typeof CACHE_CONFIGS,
): Record<string, string> {
  const cacheConfig =
    typeof config === 'string' ? CACHE_CONFIGS[config] : config;

  return {
    ...headers,
    'Cache-Control': getCacheControlHeader(cacheConfig),
  };
}

/**
 * Example usage in API route:
 *
 * return NextResponse.json(data, {
 *   headers: withCacheHeaders({}, 'MEDIUM'),
 * });
 */
