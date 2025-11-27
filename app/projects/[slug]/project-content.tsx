'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  PortableText,
  type PortableTextComponentProps,
} from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Lightbox } from '@/components/ui/lightbox';
import { urlFor } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import type {
  ProjectContent as ProjectContentType,
  Project,
} from '@/lib/types';
import { generateProjectDescription } from '@/lib/utils/project-description';

interface ProjectContentProps {
  content?: PortableTextBlock[];
  projectContent?: ProjectContentType;
  project?: Project;
}

export function ProjectContent({
  content,
  projectContent,
  project,
}: ProjectContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [contentMedia, setContentMedia] = useState<
    Array<{ src: string; alt: string; type: 'image' | 'video' }>
  >([]);

  // Determine if we're using new or old content structure
  const useNewStructure = !!projectContent;

  // Extract all images from content for the lightbox (old structure)
  const extractImagesLegacy = (blocks: PortableTextBlock[]) => {
    const images: Array<{ src: string; alt: string }> = [];
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
        images.push({
          src: imageUrl,
          alt:
            ('alt' in block && typeof block.alt === 'string'
              ? block.alt
              : '') || 'Project image',
        });
      }
    });
    return images;
  };

  // Extract images and videos from new structure
  const extractMediaNew = (
    media?: Array<{ asset: { url?: string }; alt?: string; _type?: string }>,
  ) => {
    if (!media) {
      return [];
    }
    return media
      .filter(item => item?.asset?.url)
      .map(item => {
        const url = item.asset.url!;
        const isVideo =
          item._type === 'file' || url.match(/\.(mp4|webm|ogg|mov)$/i);
        return {
          src: url,
          alt: item.alt || (isVideo ? 'Project video' : 'Project image'),
          type: (isVideo ? 'video' : 'image') as 'image' | 'video',
        };
      });
  };

  // Initialize media when component mounts
  useEffect(() => {
    if (useNewStructure && projectContent?.images) {
      setContentMedia(extractMediaNew(projectContent.images));
    } else if (content) {
      setContentMedia(
        extractImagesLegacy(content).map(img => ({
          ...img,
          type: 'image' as const,
        })),
      );
    }
  }, [content, projectContent, useNewStructure]);

  const handleImageClick = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  // Track current image index for the lightbox
  let imageCounter = 0;

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

        const currentImageIndex = imageCounter;
        imageCounter++;

        return (
          <div
            key={currentImageIndex}
            className="inline-block w-1/2 lg:w-1/3 px-2 my-4"
          >
            <button
              onClick={() => handleImageClick(currentImageIndex)}
              className="relative w-full aspect-[4/3] group cursor-zoom-in overflow-hidden rounded-lg"
            >
              <Image
                src={imageUrl}
                alt={value.alt || 'Project image'}
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
    },
    block: {
      h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h1 className="text-4xl font-bold my-4  w-full basis-full">
          {children}
        </h1>
      ),
      h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h2 className="text-3xl font-bold my-3  w-full basis-full">
          {children}
        </h2>
      ),
      h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h3 className="text-2xl font-bold my-2  w-full basis-full">
          {children}
        </h3>
      ),
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="my-2 text-muted-foreground leading-relaxed  w-full basis-full">
          {children}
        </p>
      ),
      blockquote: ({
        children,
      }: PortableTextComponentProps<PortableTextBlock>) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4  w-full basis-full">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <ul className="list-disc list-inside my-4 space-y-2  w-full basis-full">
          {children}
        </ul>
      ),
      number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <ol className="list-decimal list-inside my-4 space-y-2  w-full basis-full">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <li className="text-muted-foreground">{children}</li>
      ),
      number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <li className="text-muted-foreground">{children}</li>
      ),
    },
  };

  // Render new content structure
  if (useNewStructure && projectContent) {
    const { description, customDescription } = projectContent;

    // Get description text based on template or custom
    let descriptionText = '';
    if (description && description !== 'custom') {
      descriptionText = generateProjectDescription(description, {
        kwp: project?.impactMetrics?.kwp,
        systemType: project?.impactMetrics?.systemType,
        location: project?.location,
        lga: project?.lga,
        state: project?.state,
        beneficiaries: project?.impactMetrics?.beneficiaries,
        jobsDirect: project?.impactMetrics?.jobsCreatedDirectly,
        jobsIndirect: project?.impactMetrics?.jobsCreatedIndirectly,
        annualEnergyOutput: project?.impactMetrics?.annualEnergyOutput,
        annualCO2Reduction: project?.impactMetrics?.annualCO2Reduction,
      });
    }

    return (
      <>
        <div className="prose prose-lg max-w-none">
          {/* Render template description */}
          {description !== 'custom' && descriptionText && (
            <div
              className="whitespace-pre-wrap text-foreground/90 dark:text-foreground/70 text-base lg:text-lg leading-relaxed w-full basis-full [&_strong]:font-bold [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: descriptionText }}
            />
          )}

          {/* Render custom description */}
          {description === 'custom' && customDescription && (
            <PortableText value={customDescription} components={components} />
          )}
        </div>

        {/* Render images and videos in grid */}
        {projectContent.images && projectContent.images.length > 0 && (
          <div className="mt-6 flex flex-wrap -mx-2">
            {projectContent.images.map((item, index) => {
              if (!item?.asset?.url) {
                return null;
              }

              const url = item.asset.url;
              const isVideo =
                (item as { _type?: string })._type === 'file' ||
                url.match(/\.(mp4|webm|ogg|mov)$/i);

              return (
                <div
                  key={index}
                  className={cn(
                    'inline-block px-2 my-4',
                    isVideo ? 'w-full' : 'w-1/2 lg:w-1/3',
                  )}
                >
                  <button
                    onClick={() => handleImageClick(index)}
                    className={cn(
                      'relative w-full group cursor-pointer overflow-hidden rounded-lg',
                      !isVideo && 'aspect-[4/3] cursor-zoom-in',
                    )}
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={url}
                          className="rounded-lg w-full h-auto transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
                          controls={false}
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                            Click to expand
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          src={url}
                          alt={item.alt || 'Project image'}
                          width={800}
                          height={600}
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="rounded-lg object-cover w-full h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                            Click to expand
                          </span>
                        </div>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox */}
        {contentMedia.length > 0 && (
          <Lightbox
            media={contentMedia}
            initialIndex={selectedImageIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  }

  // Fallback to legacy content structure
  if (!content) {
    return null;
  }

  return (
    <>
      <div className="prose prose-lg max-w-none">
        <PortableText value={content} components={components} />
      </div>

      {/* Lightbox */}
      {contentMedia.length > 0 && (
        <Lightbox
          media={contentMedia}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
