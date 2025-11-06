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
  }
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
 * Quality levels: High quality settings (90-95) for crisp, professional images
 * This provides maximum visual quality with acceptable file sizes
 */
export const SANITY_IMAGE_PRESETS = {
  thumbnail: {
    w: 300,
    h: 200,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 90,
  },
  card: {
    w: 600,
    h: 400,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 92,
  },
  featured: {
    w: 1200,
    h: 675,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 95,
  },
  hero: {
    w: 1600,
    h: 686,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 95,
  },
  gallery: {
    w: 800,
    h: 600,
    fit: 'crop' as const,
    auto: 'format' as const,
    q: 92,
  },
} as const;

/**
 * Apply a preset to a Sanity image URL
 */
export function applySanityImagePreset(
  imageUrl: string,
  preset: keyof typeof SANITY_IMAGE_PRESETS
): string {
  return addSanityImageParams(imageUrl, SANITY_IMAGE_PRESETS[preset]);
}
