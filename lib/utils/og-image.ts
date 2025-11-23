import { existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { addSanityImageParams } from './sanity-image';

/**
 * OG Image optimization settings
 * Standard og image size: 1200x630px (1.91:1 aspect ratio)
 * Format: JPG (best compatibility across platforms)
 * Quality: 90 (good balance between quality and file size)
 */
const OG_IMAGE_CONFIG = {
  w: 1200,
  h: 630,
  fit: 'crop' as const,
  q: 90,
};

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
 * Gets the OG image URL, optimizing for OpenGraph standards
 * - Sanity images: Optimized to 1200x630px JPG
 * - Local images: Converted to JPG if needed
 * - External images: Returned as-is (assumed optimized)
 * @param imageUrl - The original image URL (can be relative or absolute)
 * @returns The OG image URL (optimized for og images)
 */
export function getOgImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return 'https://www.acoblighting.com/images/og-image.jpg';
  }

  // Handle absolute URLs (Sanity, Cloudinary, etc.)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // Optimize Sanity images for og images
    if (isSanityImageUrl(imageUrl)) {
      // Use Sanity's image URL builder to optimize for og images
      // Force JPG format and og image dimensions
      return addSanityImageParams(imageUrl, {
        ...OG_IMAGE_CONFIG,
        // Remove auto=format and force JPG by using .jpg extension or format param
        // Sanity will serve JPG when we specify the dimensions and quality
      });
    }

    // For our domain images, handle conversion if needed
    if (imageUrl.includes('acoblighting.com')) {
      const urlPath = new URL(imageUrl).pathname;
      if (
        urlPath.endsWith('.jpg') ||
        urlPath.endsWith('.jpeg') ||
        urlPath.endsWith('.png')
      ) {
        return imageUrl;
      }
      // For our domain webp images, convert extension (actual conversion happens separately)
      return imageUrl.replace(/\.(webp|svg|gif)$/i, '.jpg');
    }

    // For other external URLs (Cloudinary, etc.), return as-is
    // They should already be optimized by their CDN
    return imageUrl;
  }

  // Handle relative paths in public folder
  const publicPath = join(process.cwd(), 'public');
  const relativePath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
  const imagePath = join(publicPath, relativePath);

  // Check if image exists
  if (!existsSync(imagePath)) {
    return 'https://www.acoblighting.com/images/og-image.jpg';
  }

  // Get file extension
  const ext = imagePath.split('.').pop()?.toLowerCase();

  // If already jpg or png, return as absolute URL
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
    const absoluteUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `https://www.acoblighting.com${absoluteUrl}`;
  }

  // Convert webp/svg/gif to jpg for og images
  const ogDir = join(publicPath, 'images', 'og');
  if (!existsSync(ogDir)) {
    try {
      execSync(`mkdir -p "${ogDir}"`, { stdio: 'ignore' });
    } catch {
      // If can't create dir, return default
      return 'https://www.acoblighting.com/images/og-image.jpg';
    }
  }

  // Generate og image path
  const imageName =
    imagePath
      .split('/')
      .pop()
      ?.replace(/\.[^.]+$/, '') || 'og-image';
  const ogImagePath = join(ogDir, `${imageName}.jpg`);
  const ogImageUrl = `/images/og/${imageName}.jpg`;

  // Convert if og image doesn't exist
  if (!existsSync(ogImagePath)) {
    try {
      // Use ImageMagick to convert
      execSync(`magick "${imagePath}" -quality 90 "${ogImagePath}"`, {
        stdio: 'ignore',
      });
    } catch (error) {
      // If conversion fails, fallback to default og image
      console.warn(`Failed to convert ${imagePath} to JPG:`, error);
      return 'https://www.acoblighting.com/images/og-image.jpg';
    }
  }

  return `https://www.acoblighting.com${ogImageUrl}`;
}
