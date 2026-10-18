'use client';

import NextImage, { type ImageProps } from 'next/image';
import { isSanityImageUrl, sanityImageLoader } from '@/lib/sanity-image-loader';

/**
 * Drop-in replacement for next/image. Sanity CDN images are resized by Sanity
 * directly; everything else (local /images/*) still uses Next's optimizer.
 */
export default function Image(props: ImageProps) {
  if (!props.loader && !props.unoptimized && isSanityImageUrl(props.src)) {
    return <NextImage {...props} loader={sanityImageLoader} />;
  }
  return <NextImage {...props} />;
}
