/**
 * Sanity Client Configuration
 *
 * Base Sanity client setup for server and browser environments.
 * Import this client in query files to execute GROQ queries.
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

const token = process.env.SANITY_API_TOKEN;

// ============================================================================
// VALIDATION
// ============================================================================

if (!projectId) {
  throw new Error(
    'SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID is required',
  );
}

if (!dataset) {
  throw new Error(
    'SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET is required',
  );
}

if (!token) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Sanity API token not found. Some features may not work properly.',
    );
  }
}

// ============================================================================
// CLIENT INSTANCES
// ============================================================================

/**
 * Server-side Sanity client
 *
 * Use this client for:
 * - API routes
 * - Server-side rendering (SSR)
 * - Server components
 *
 * Features:
 * - Includes API token for write operations
 * - CDN enabled in production for faster reads
 * - Caching enabled
 */
export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2025-07-16',
  token: token,
});

/**
 * Browser-side Sanity client
 *
 * Use this client for:
 * - Client-side data fetching (use sparingly)
 * - Real-time subscriptions
 *
 * Features:
 * - No API token (read-only)
 * - CDN always enabled
 * - For security, prefer using API routes instead
 */
export const clientForBrowser = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2025-07-16',
  // No token for client-side requests (security)
});

// ============================================================================
// IMAGE URL BUILDER
// ============================================================================

const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity image references
 *
 * @param source - Sanity image reference
 * @returns Image URL builder instance
 *
 * @example
 * ```typescript
 * const imageUrl = urlFor(image)
 *   .width(800)
 *   .height(600)
 *   .quality(85)
 *   .url();
 * ```
 */
export function urlFor(source: unknown) {
  return builder.image(source);
}

// ============================================================================
// CLIENT CONFIGURATION
// ============================================================================

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion: '2025-07-16',
} as const;
