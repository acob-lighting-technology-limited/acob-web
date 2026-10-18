'use client';

import { useState, useMemo } from 'react';
import Image from '@/components/ui/image';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
} from '@portabletext/react';
import { Lightbox } from '@/components/ui/lightbox';
import { urlFor } from '@/sanity/lib/queries';

interface UpdateContentProps {
  content: PortableTextBlock[];
}

type LightboxMediaItem = { src: string; alt: string; type: 'image' | 'video' };
type MediaBlock = PortableTextBlock & {
  asset?: { url?: string; _ref?: string; _type?: string } | null;
  alt?: string;
  title?: string;
};

function getLightboxImageUrl(source: Parameters<typeof urlFor>[0]) {
  try {
    return (
      urlFor(source).width(1920).fit('max').auto('format').quality(90).url() ||
      null
    );
  } catch {
    return null;
  }
}

function getMediaFromBlock(block: PortableTextBlock): LightboxMediaItem | null {
  const mediaBlock = block as MediaBlock;

  if (!mediaBlock.asset || typeof mediaBlock.asset !== 'object') {
    return null;
  }

  if (mediaBlock._type === 'image') {
    const src = getLightboxImageUrl(mediaBlock);

    if (!src) {
      return null;
    }

    return {
      src,
      alt: mediaBlock.alt || 'Update post image',
      type: 'image',
    };
  }

  if (
    (mediaBlock._type === 'file' || mediaBlock._type === 'video') &&
    typeof mediaBlock.asset.url === 'string'
  ) {
    return {
      src: mediaBlock.asset.url,
      alt: mediaBlock.title || mediaBlock.alt || 'Update post video',
      type: 'video',
    };
  }

  return null;
}

export function UpdateContent({ content }: UpdateContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fallbackMedia, setFallbackMedia] = useState<LightboxMediaItem | null>(
    null,
  );

  // Built synchronously from content — no useEffect delay, always in sync
  const contentMedia = useMemo(() => {
    const media: LightboxMediaItem[] = [];
    (content ?? []).forEach(block => {
      const item = getMediaFromBlock(block);

      if (item) {
        media.push(item);
      }
    });
    return media;
  }, [content]);

  const handleMediaClick = (
    mediaIndex: number,
    fallback: LightboxMediaItem,
  ) => {
    if (contentMedia[mediaIndex]) {
      setFallbackMedia(null);
      setSelectedImageIndex(mediaIndex);
    } else {
      setFallbackMedia(fallback);
      setSelectedImageIndex(0);
    }

    setLightboxOpen(true);
  };

  const lightboxMedia = fallbackMedia ? [fallbackMedia] : contentMedia;

  // Track current media index for the lightbox
  let mediaCounter = 0;

  const components = {
    types: {
      image: ({
        value,
      }: {
        value: { asset: { _ref: string }; alt?: string };
      }) => {
        if (!value.asset) {
          return null;
        }

        const imageUrl =
          urlFor(value)
            .width(800)
            .height(600)
            .fit('crop')
            .auto('format')
            .quality(75)
            .url() || '/placeholder.svg';
        const imageAlt = value.alt || 'Update post image';
        const lightboxItem: LightboxMediaItem = {
          src: getLightboxImageUrl(value) || imageUrl,
          alt: imageAlt,
          type: 'image',
        };

        const currentMediaIndex = mediaCounter;
        mediaCounter++;

        return (
          <div
            key={currentMediaIndex}
            className="inline-block w-1/2 lg:w-1/3 px-2 my-4"
          >
            <button
              onClick={e => {
                e.stopPropagation();
                handleMediaClick(currentMediaIndex, lightboxItem);
              }}
              className="relative w-full aspect-[4/3] group cursor-zoom-in overflow-hidden rounded-lg"
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="rounded-lg object-cover w-full h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
              />
              {/* Overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  Click to expand
                </span>
              </div>
            </button>
          </div>
        );
      },
      file: ({
        value,
      }: {
        value: {
          asset: { url?: string; _ref?: string };
          alt?: string;
          title?: string;
        };
      }) => {
        if (!value.asset || !value.asset.url) {
          return null;
        }

        // Check if it's a video file
        const isVideo = value.asset.url.match(/\.(mp4|webm|ogg|mov)$/i);

        if (isVideo) {
          const videoTitle = value.title || value.alt || 'Update post video';
          const currentMediaIndex = mediaCounter;
          mediaCounter++;
          const lightboxItem: LightboxMediaItem = {
            src: value.asset.url,
            alt: videoTitle,
            type: 'video',
          };

          return (
            <div
              key={currentMediaIndex}
              className="inline-block w-1/2 lg:w-1/3 px-2 my-4"
            >
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleMediaClick(currentMediaIndex, lightboxItem);
                }}
                className="relative w-full aspect-[4/3] group cursor-zoom-in overflow-hidden rounded-lg"
              >
                <video
                  src={value.asset.url}
                  className="rounded-lg object-cover w-full h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
                  controls={false}
                  muted
                  playsInline
                  aria-label={videoTitle}
                />
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    Click to expand
                  </span>
                </div>
              </button>
            </div>
          );
        }

        return null;
      },
      video: ({
        value,
      }: {
        value: {
          asset: { url?: string; _ref?: string };
          alt?: string;
          title?: string;
        };
      }) => {
        if (!value.asset || !value.asset.url) {
          return null;
        }

        const currentMediaIndex = mediaCounter;
        mediaCounter++;
        const videoTitle = value.title || value.alt || 'Update post video';
        const lightboxItem: LightboxMediaItem = {
          src: value.asset.url,
          alt: videoTitle,
          type: 'video',
        };

        return (
          <div
            key={currentMediaIndex}
            className="inline-block w-1/2 lg:w-1/3 px-2 my-4"
          >
            <button
              onClick={e => {
                e.stopPropagation();
                handleMediaClick(currentMediaIndex, lightboxItem);
              }}
              className="relative w-full aspect-[4/3] group cursor-zoom-in overflow-hidden rounded-lg"
            >
              <video
                src={value.asset.url}
                className="rounded-lg object-cover w-full h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
                controls={false}
                muted
                playsInline
                aria-label={videoTitle}
              />
              {/* Overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  Click to expand
                </span>
              </div>
            </button>
          </div>
        );
      },
    },
    block: {
      h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h1 className="text-4xl font-bold my-4 w-full basis-full">
          {children}
        </h1>
      ),
      h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h2 className="text-3xl font-bold my-3 w-full basis-full">
          {children}
        </h2>
      ),
      h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h3 className="text-2xl font-bold my-2 w-full basis-full">
          {children}
        </h3>
      ),
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="my-2 text-muted-foreground dark:text-foreground/80 leading-relaxed w-full basis-full">
          {children}
        </p>
      ),
      blockquote: ({
        children,
      }: PortableTextComponentProps<PortableTextBlock>) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4 w-full basis-full">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <ul className="list-disc pl-5 my-2 w-full basis-full">{children}</ul>
      ),
      number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <ol className="list-decimal pl-5 my-2 w-full basis-full">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <li className="my-1">{children}</li>
      ),
      number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <li className="my-1">{children}</li>
      ),
    },
    marks: {
      link: ({
        children,
        value,
      }: {
        children: React.ReactNode;
        value?: { href?: string };
      }) => {
        const href = value?.href || '#';
        const isExternal = href.startsWith('http');

        return (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="!font-semibold !text-primary !underline !decoration-primary/40 !decoration-2 !underline-offset-2 transition-colors duration-200 hover:!decoration-primary"
            style={{
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '2px',
            }}
          >
            {children}
            {isExternal && (
              <span
                className="ml-1 inline-block !text-primary"
                aria-label="(opens in new tab)"
              >
                ↗
              </span>
            )}
          </a>
        );
      },
    },
  };

  return (
    <>
      <div className="prose prose-lg max-w-none">
        <PortableText value={content} components={components} />
      </div>

      {/* Lightbox */}
      <Lightbox
        media={lightboxMedia}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
