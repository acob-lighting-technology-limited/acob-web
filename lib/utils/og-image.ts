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
 * Gets the OG image URL - STATIC ONLY, NO RUNTIME CONVERSION
 * - Sanity images: Adds optimization params (Sanity handles it)
 * - Local images: Returns static JPG path from /images/og/
 * - ALL OG IMAGES MUST EXIST IN /public/images/og/ AS .jpg FILES
 */
export function getOgImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return DEFAULT_OG_IMAGE;
  }

  // Handle absolute URLs (Sanity CDN or external)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    if (isSanityImageUrl(imageUrl)) {
      return addSanityImageParams(imageUrl, OG_IMAGE_CONFIG);
    }
    return imageUrl;
  }

  // Local images - extract filename and map to /images/og/{name}.jpg
  // Input: /images/about/mission-vision.webp or /images/about/mission-vision.webp?height=400
  // Output: https://www.acoblighting.com/images/og/mission-vision.jpg
  // Remove query parameters first
  const urlWithoutQuery = imageUrl.split('?')[0];
  const imageName = urlWithoutQuery
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '');

  if (!imageName) {
    return DEFAULT_OG_IMAGE;
  }

  return `https://www.acoblighting.com/images/og/${imageName}.jpg`;
}
