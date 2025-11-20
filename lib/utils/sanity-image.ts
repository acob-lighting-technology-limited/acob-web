/**
 * Utility functions for handling Sanity image URLs
 */

/**
 * Adds optimization parameters to a Sanity image URL
 * Handles cases where the URL already has query parameters
 */
export function addSanityImageParams(
  imageUrl: string,
  params: {
    w?: number;
    h?: number;
    fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
    auto?: 'format';
    q?: number;
  },
): string {
  if (!imageUrl) {
    return imageUrl;
  }

  // Parse existing URL and query parameters
  const url = new URL(imageUrl);

  // Add or update parameters
  if (params.w !== undefined) {
    url.searchParams.set('w', params.w.toString());
  }
  if (params.h !== undefined) {
    url.searchParams.set('h', params.h.toString());
  }
  if (params.fit !== undefined) {
    url.searchParams.set('fit', params.fit);
  }
  if (params.auto !== undefined) {
    url.searchParams.set('auto', params.auto);
  }
  if (params.q !== undefined) {
    url.searchParams.set('q', params.q.toString());
  }

  return url.toString();
}

/**
 * Common image optimization presets
 * Balanced quality settings for web performance
 * - Thumbnails: Lower quality (75) for small sizes
 * - Cards: Medium quality (80) for grid displays
 * - Hero: High quality (85) for large displays
 * - Lightbox/Gallery: Maximum quality (95-98) for full-screen viewing
 */
export const SANITY_IMAGE_PRESETS = {
  thumbnail: {
    w: 200,
    h: 200,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 75,
  },
  card: {
    w: 800,
    h: 600,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 80,
  },
  featured: {
    w: 1200,
    h: 675,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 85,
  },
  hero: {
    w: 1920,
    h: 1080,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 85,
  },
  gallery: {
    w: 1200,
    h: 900,
    fit: 'max' as const,
    auto: 'format' as const,
    q: 95,
  },
  lightbox: {
    w: 2400,
    h: 1600,
    fit: 'max' as const,
    auto: 'format' as const,
    q: 98,
  },
} as const;

/**
 * Apply a preset to a Sanity image URL
 */
export function applySanityImagePreset(
  imageUrl: string,
  preset: keyof typeof SANITY_IMAGE_PRESETS,
): string {
  return addSanityImageParams(imageUrl, SANITY_IMAGE_PRESETS[preset]);
}
