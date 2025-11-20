/**
 * Image optimization utilities with quality tiers
 * Maintains high quality for lightbox/gallery while optimizing thumbnails
 */

export type ImageQuality = 'thumbnail' | 'card' | 'hero' | 'lightbox' | 'full';

export interface ImageSizeConfig {
  width?: number;
  height?: number;
  quality: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

/**
 * Quality presets for different use cases
 */
export const IMAGE_QUALITY_PRESETS: Record<ImageQuality, ImageSizeConfig> = {
  // Small thumbnails (partners, logos, avatars)
  thumbnail: {
    width: 200,
    height: 200,
    quality: 75,
    fit: 'crop',
  },
  // Card images (project cards, service cards)
  card: {
    width: 800,
    height: 600,
    quality: 80,
    fit: 'crop',
  },
  // Hero/carousel images
  hero: {
    width: 1920,
    height: 1080,
    quality: 85,
    fit: 'crop',
  },
  // Lightbox/gallery preview (high quality)
  lightbox: {
    width: 2400,
    height: 1600,
    quality: 95,
    fit: 'max',
  },
  // Full resolution (for download/print)
  full: {
    quality: 100,
    fit: 'max',
  },
};

/**
 * Get blur placeholder data URL
 */
export function getBlurDataURL(): string {
  // Simple gray gradient SVG
  const svg = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" fill="url(#grad)" />
    </svg>
  `;

  const base64 =
    typeof window === 'undefined'
      ? Buffer.from(svg).toString('base64')
      : typeof btoa !== 'undefined'
        ? // eslint-disable-next-line no-undef
          btoa(svg)
        : Buffer.from(svg).toString('base64');

  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get shimmer placeholder with animation
 */
export function getShimmerDataURL(width = 100, height = 100): string {
  const shimmer = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1a1a1a" />
          <stop offset="50%" stop-color="#2a2a2a" />
          <stop offset="100%" stop-color="#1a1a1a" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#1a1a1a" />
      <rect width="${width}" height="${height}" fill="url(#g)">
        <animate attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  `;

  const base64 =
    typeof window === 'undefined'
      ? Buffer.from(shimmer).toString('base64')
      : typeof btoa !== 'undefined'
        ? // eslint-disable-next-line no-undef
          btoa(shimmer)
        : Buffer.from(shimmer).toString('base64');

  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(quality: ImageQuality = 'card') {
  return {
    placeholder: 'blur' as const,
    blurDataURL: getBlurDataURL(),
    quality: IMAGE_QUALITY_PRESETS[quality].quality,
  };
}

/**
 * Get responsive sizes attribute based on usage
 */
export function getResponsiveSizes(
  usage:
    | 'full-width'
    | 'half-width'
    | 'third-width'
    | 'card'
    | 'thumbnail'
    | 'hero',
): string {
  const SIZES_MAP = {
    'full-width': '100vw',
    'half-width': '(max-width: 768px) 100vw, 50vw',
    'third-width': '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
    card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    thumbnail: '200px',
    hero: '100vw',
  };

  return SIZES_MAP[usage];
}

/**
 * Priority loading for above-the-fold images
 */
export function shouldPriority(index: number, maxPriority = 3): boolean {
  if (index < maxPriority) {
    return true;
  }
  return false;
}

/**
 * Get loading strategy for images
 */
export function getLoadingStrategy(
  index: number,
  isPriority = false,
): 'eager' | 'lazy' {
  if (isPriority) {
    return 'eager';
  }
  if (index < 3) {
    return 'eager';
  }
  return 'lazy';
}
