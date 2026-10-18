'use client';

import { useState, useMemo } from 'react';
import Image from '@/components/ui/image';
import {
  PortableText,
  type PortableTextComponentProps,
} from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Lightbox } from '@/components/ui/lightbox';
import { urlFor } from '@/sanity/lib/queries';
import type {
  ProjectContent as ProjectContentType,
  Project,
} from '@/lib/types';
import { generateProjectDescription } from '@/lib/utils/project-description';

interface ProjectContentProps {
  content?: PortableTextBlock[];
  projectContent?: ProjectContentType;
  descriptionTemplate?: string;
  gallery?: Array<{
    _type?: string;
    asset?: { url?: string; _ref?: string };
    alt?: string;
    title?: string;
  }>;
  project?: Project;
}

export function ProjectContent({
  content,
  projectContent,
  descriptionTemplate,
  gallery,
  project,
}: ProjectContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const rawMediaItems = useMemo(() => {
    if (projectContent?.images && projectContent.images.length > 0) {
      return projectContent.images;
    }
    if (gallery && gallery.length > 0) {
      return gallery;
    }
    if (project?.gallery && project.gallery.length > 0) {
      return project.gallery;
    }
    return [];
  }, [projectContent, gallery, project]);

  const useStructuredFormat =
    !!projectContent ||
    !!descriptionTemplate ||
    !!project?.descriptionTemplate ||
    rawMediaItems.length > 0 ||
    !!(project?.coverImage || project?.projectImage);

  // Built synchronously — no useEffect delay, always in sync with props
  const contentMedia = useMemo(() => {
    let items: Array<{
      src: string;
      alt: string;
      type: 'image' | 'video';
    }> = [];

    if (rawMediaItems.length > 0) {
      items = rawMediaItems
        .filter(item => item?.asset?.url)
        .map(item => {
          const url = item.asset!.url!;
          const isVideo =
            item._type === 'file' ||
            item._type === 'video' ||
            !!url.match(/\.(mp4|webm|ogg|mov)$/i);
          return {
            src: url,
            alt:
              item.title ||
              item.alt ||
              (isVideo ? 'Project video' : 'Project image'),
            type: (isVideo ? 'video' : 'image') as 'image' | 'video',
          };
        });
    } else if (content && Array.isArray(content)) {
      content.forEach(block => {
        if (
          block._type === 'image' &&
          'asset' in block &&
          typeof block.asset === 'object' &&
          block.asset !== null
        ) {
          const imageUrl =
            urlFor(block)
              .width(1920)
              .height(1080)
              .fit('max')
              .auto('format')
              .quality(90)
              .url() || '/placeholder.svg';
          items.push({
            src: imageUrl,
            alt:
              ('alt' in block && typeof block.alt === 'string'
                ? block.alt
                : '') || 'Project image',
            type: 'image',
          });
        }
      });
    }

    // Automatically include hero coverImage as the first gallery item if not already present
    const coverUrl = project?.coverImage || project?.projectImage;
    if (coverUrl && typeof coverUrl === 'string') {
      const alreadyIncluded = items.some(item => item.src === coverUrl);
      if (!alreadyIncluded) {
        items.unshift({
          src: coverUrl,
          alt: project?.title
            ? `${project.title} - Main Cover`
            : 'Project cover image',
          type: 'image',
        });
      }
    }

    return items;
  }, [content, rawMediaItems, project]);

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

  // Render structured content format (description template and/or gallery)
  if (useStructuredFormat) {
    const rawDescription =
      projectContent?.description ||
      descriptionTemplate ||
      project?.descriptionTemplate;
    const isHealthcare =
      Array.isArray(project?.categories) &&
      project.categories.includes('healthcare-projects');
    const description =
      rawDescription || (isHealthcare ? 'healthcare1' : 'description1');
    const customDescription =
      projectContent?.customDescription ||
      (typeof project?.content === 'string' ? project.content : undefined);

    // Get description paragraphs based on template or custom
    const descriptionParagraphs =
      description && description !== 'custom'
        ? generateProjectDescription(
            description as Parameters<typeof generateProjectDescription>[0],
            {
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
              bess: project?.impactMetrics?.bess,
              dieselReduc: project?.impactMetrics?.dieselReduc,
              costSavings: project?.impactMetrics?.costSavings,
              patientCareInc: project?.impactMetrics?.patientCareInc,
              uptime: project?.impactMetrics?.uptime,
            },
          )
        : [];

    return (
      <>
        <div className="prose prose-lg max-w-none">
          {/* Render template description */}
          {description !== 'custom' && descriptionParagraphs.length > 0 && (
            <div className="text-foreground/90 dark:text-foreground/70 text-base lg:text-lg leading-relaxed w-full basis-full">
              {descriptionParagraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="mb-4 last:mb-0">
                  {paragraph.map((segment, segmentIndex) =>
                    segment.bold ? (
                      <strong
                        key={segmentIndex}
                        className="font-bold text-foreground"
                      >
                        {segment.text}
                      </strong>
                    ) : (
                      <span key={segmentIndex}>{segment.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>
          )}

          {/* Render custom description */}
          {description === 'custom' && customDescription && (
            <p className="text-foreground/90 dark:text-foreground/70 text-base lg:text-lg leading-relaxed">
              {customDescription}
            </p>
          )}
        </div>

        {/* Render images and videos in grid */}
        {contentMedia.length > 0 && (
          <div className="mt-6 flex flex-wrap -mx-2">
            {contentMedia.map((media, index) => {
              const isVideo = media.type === 'video';
              return (
                <div
                  key={index}
                  className="inline-block w-1/2 lg:w-1/3 px-2 my-4"
                >
                  <button
                    onClick={() => handleImageClick(index)}
                    className="relative w-full aspect-[4/3] group cursor-zoom-in overflow-hidden rounded-lg"
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={media.src}
                          className="rounded-lg object-cover w-full h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]"
                          controls={false}
                          muted
                          playsInline
                          aria-label={media.alt}
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
                          src={media.src}
                          alt={media.alt}
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
