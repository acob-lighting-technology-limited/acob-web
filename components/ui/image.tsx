'use client';

import NextImage, { type ImageProps } from 'next/image';
import { isSanityImageUrl, sanityImageLoader } from '@/lib/sanity-image-loader';

/** A file from /public (or a static import), served as-is. */
function isLocalImage(src: ImageProps['src']): boolean {
  if (typeof src === 'string') {
    return src.startsWith('/') && !src.startsWith('//');
  }
  return true; // StaticImageData from a static import
}

/**
 * Drop-in replacement for next/image that never depends on Vercel's image
 * optimizer, whose quota ran out (it returns 402 for any size it hasn't
 * cached, which rendered images broken):
 * - Sanity CDN images are resized by Sanity directly.
 * - Local /public images are served as static files, so keep those assets
 *   reasonably sized (e.g. the logos ship as 800px WebP).
 * Anything else still goes through Next's optimizer.
 */
export default function Image(props: ImageProps) {
  if (props.loader || props.unoptimized) {
    return <NextImage {...props} />;
  }
  if (isSanityImageUrl(props.src)) {
    return <NextImage {...props} loader={sanityImageLoader} />;
  }
  if (isLocalImage(props.src)) {
    return <NextImage {...props} unoptimized />;
  }
  return <NextImage {...props} />;
}
