import { addSanityImageParams } from './sanity-image';

const OG_IMAGE_CONFIG = {
  w: 1200,
  h: 630,
  fit: 'crop' as const,
  q: 90,
};

const DEFAULT_OG_IMAGE = 'https://www.acoblighting.com/images/og-image.jpg';

/**
 * Checks if a URL is from Sanity CDN
 */
function isSanityImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.includes('cdn.sanity.io') ||
      urlObj.hostname.includes('sanity.io')
    );
  } catch {
    return false;
  }
}

/**
 * Gets the OG image URL
 * - Sanity images: Adds optimization params
 * - Local images: Maps to static JPG in /images/og/
 */
export function getOgImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return DEFAULT_OG_IMAGE;
  }

  // Handle Sanity CDN images - add optimization params
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    if (isSanityImageUrl(imageUrl)) {
      return addSanityImageParams(imageUrl, OG_IMAGE_CONFIG);
    }
    // External URLs - return as-is
    return imageUrl;
  }

  // Local images - map to static JPG in /images/og/
  const imageName = imageUrl
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '');

  if (!imageName) {
    return DEFAULT_OG_IMAGE;
  }

  return `https://www.acoblighting.com/images/og/${imageName}.jpg`;
}
