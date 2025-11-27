'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
} from '@portabletext/react';
import { Lightbox } from '@/components/ui/lightbox';
import { urlFor } from '@/sanity/lib/client';

interface UpdateContentProps {
  content: PortableTextBlock[];
}

export function UpdateContent({ content }: UpdateContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [contentMedia, setContentMedia] = useState<
    Array<{ src: string; alt: string; type: 'image' | 'video' }>
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract all images and videos from content for the lightbox
  const extractMedia = (blocks: PortableTextBlock[]) => {
    const media: Array<{ src: string; alt: string; type: 'image' | 'video' }> =
      [];
    blocks.forEach(block => {
      if (
        block._type === 'image' &&
        'asset' in block &&
        typeof block.asset === 'object'
      ) {
        const imageUrl =
          urlFor(block)
            .width(1920)
            .height(1080)
            .fit('max')
            .auto('format')
            .quality(90)
            .url() || '/placeholder.svg';
        media.push({
          src: imageUrl,
          alt:
            ('alt' in block && typeof block.alt === 'string'
              ? block.alt
              : '') || 'Update post image',
          type: 'image',
        });
      } else if (
        block._type === 'file' &&
        'asset' in block &&
        typeof block.asset === 'object'
      ) {
        // Handle video files
        const asset = block.asset as { url?: string; _ref?: string };
        if (asset.url) {
          media.push({
            src: asset.url,
            alt:
              ('alt' in block && typeof block.alt === 'string'
                ? block.alt
                : '') || 'Update post video',
            type: 'video',
          });
        }
      }
    });
    return media;
  };

  // Initialize media when component mounts
  useEffect(() => {
    setContentMedia(extractMedia(content));
  }, [content]);

  const handleImageClick = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setLightboxOpen(true);
  };

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

        const currentMediaIndex = mediaCounter;
        mediaCounter++;

        return (
          <div
            key={currentMediaIndex}
            className="inline-block w-1/2 lg:w-1/3 px-2 my-4"
          >
            <button
              onClick={() => handleImageClick(currentMediaIndex)}
              className="relative w-full group cursor-zoom-in"
            >
              <Image
                src={imageUrl}
                alt={value.alt || 'Update post image'}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="rounded-lg object-cover w-full h-auto transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
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
        value: { asset: { url?: string; _ref?: string }; alt?: string };
      }) => {
        if (!value.asset || !value.asset.url) {
          return null;
        }

        // Check if it's a video file
        const isVideo = value.asset.url.match(/\.(mp4|webm|ogg|mov)$/i);
        const currentMediaIndex = mediaCounter;
        mediaCounter++;

        if (isVideo) {
          return (
            <div
              key={currentMediaIndex}
              className="inline-block w-full px-2 my-4"
            >
              <button
                onClick={() => handleImageClick(currentMediaIndex)}
                className="relative w-full group cursor-pointer"
              >
                <video
                  src={value.asset.url}
                  className="rounded-lg w-full h-auto transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
                  controls={false}
                  muted
                  playsInline
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
  };

  return (
    <>
      <div className="prose prose-lg max-w-none">
        <PortableText value={content} components={components} />
      </div>

      {/* Lightbox - Rendered via portal to ensure full page coverage */}
      {mounted &&
        contentMedia.length > 0 &&
        lightboxOpen &&
        createPortal(
          <Lightbox
            media={contentMedia}
            initialIndex={selectedImageIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}
