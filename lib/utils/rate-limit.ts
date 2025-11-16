import { NextRequest, NextResponse } from 'next/server';
import { RATE_LIMITS } from '@/lib/constants/ui';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, TokenBucket>();

/**
 * Simple token bucket rate limiter
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns true if rate limit exceeded, false otherwise
 */
export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: RATE_LIMITS.GENERAL_API.interval,
    uniqueTokenPerInterval: RATE_LIMITS.GENERAL_API.maxRequests,
  },
): boolean {
  // Get client identifier (IP address or custom header)
  const identifier =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  const now = Date.now();
  const bucket = rateLimitStore.get(identifier);

  if (!bucket) {
    // First request from this identifier
    rateLimitStore.set(identifier, {
      tokens: config.uniqueTokenPerInterval - 1,
      lastRefill: now,
    });
    return false;
  }

  // Calculate time since last refill
  const timeSinceLastRefill = now - bucket.lastRefill;

  // Refill tokens if interval has passed
  if (timeSinceLastRefill >= config.interval) {
    bucket.tokens = config.uniqueTokenPerInterval - 1;
    bucket.lastRefill = now;
    rateLimitStore.set(identifier, bucket);
    return false;
  }

  // Check if tokens available
  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    rateLimitStore.set(identifier, bucket);
    return false;
  }

  // Rate limit exceeded
  return true;
}

/**
 * Middleware wrapper for rate limiting
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config?: RateLimitConfig,
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const isRateLimited = rateLimit(request, config);

    if (isRateLimited) {
      return NextResponse.json(
        {
          error: {
            message: 'Too many requests. Please try again later.',
            code: 'RATE_LIMIT_EXCEEDED',
          },
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(
              Math.ceil((config?.interval || 60000) / 1000),
            ),
          },
        },
      );
    }

    return handler(request);
  };
}

/**
 * Clean up old entries periodically to prevent memory leaks
 */
setInterval(
  () => {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour

    for (const [key, bucket] of rateLimitStore.entries()) {
      if (now - bucket.lastRefill > maxAge) {
        rateLimitStore.delete(key);
      }
    }
  },
  10 * 60 * 1000,
); // Run every 10 minutes
