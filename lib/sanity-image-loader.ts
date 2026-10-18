import type { ImageLoaderProps } from 'next/image';

const SANITY_CDN_PREFIX = 'https://cdn.sanity.io/images/';

export function isSanityImageUrl(src: unknown): src is string {
  return typeof src === 'string' && src.startsWith(SANITY_CDN_PREFIX);
}

/**
 * Resizes Sanity images on Sanity's own CDN instead of Vercel's image
 * optimizer, so they keep loading when the Vercel optimization quota runs out.
 * Existing params from urlFor() (crop, rect, fit) are kept; a fixed height is
 * scaled with the width so the aspect ratio does not change.
 */
export function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  const params = url.searchParams;

  const baseWidth = Number(params.get('w'));
  const baseHeight = Number(params.get('h'));
  if (baseWidth && baseHeight) {
    params.set('h', String(Math.round((baseHeight * width) / baseWidth)));
  }

  params.set('w', String(width));
  params.set('q', String(quality ?? 75));
  params.set('auto', 'format');
  if (!params.has('fit')) {
    params.set('fit', 'max');
  }

  return url.toString();
}
