'use client';

import { useState } from 'react';
import Image from '@/components/ui/image';
import { Lightbox } from '@/components/ui/lightbox';

/**
 * Width for each photo so no row is left with a lone image: phones lead with
 * a full-width photo when the count is odd; desktop puts the remainder that
 * doesn't fill a row of three into rows of two, ahead of the threes.
 */
function itemWidth(index: number, count: number) {
  const mobile = count % 2 === 1 && index === 0 ? 'w-full' : 'w-1/2';
  if (count === 1) {
    return 'w-full';
  }
  const remainder = count % 3;
  // 4 → 2+2, 5 → 2+3, 7 → 2+2+3: the first `halves` photos sit two per row.
  const halves = remainder === 0 ? 0 : remainder === 2 ? 2 : 4;
  const desktop = index < halves ? 'lg:w-1/2' : 'lg:w-1/3';
  return `${mobile} ${desktop}`;
}

interface ServiceGalleryProps {
  images: string[];
  serviceTitle: string;
}

export function ServiceGallery({ images, serviceTitle }: ServiceGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  // Convert gallery images to lightbox format
  const lightboxMedia = images.map((image, index) => ({
    src: image.split('?')[0], // Remove query params if any
    alt: `${serviceTitle} image ${index + 1}`,
    type: 'image' as const,
  }));

  return (
    <>
      <div className="mt-6 flex flex-wrap -mx-2">
        {images.map((image, index) => {
          const imageSrc = image.split('?')[0]; // Remove query params if any
          return (
            <div
              key={index}
              className={`inline-block px-2 my-4 ${itemWidth(index, images.length)}`}
            >
              <button
                onClick={() => handleImageClick(index)}
                className={`group relative w-full cursor-zoom-in overflow-hidden rounded-lg border border-border ${images.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={imageSrc}
                  alt={`${serviceTitle} image ${index + 1}`}
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20 rounded-lg">
                  <span className="bg-black/50 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 rounded-full">
                    Click to expand
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxMedia.length > 0 && (
        <Lightbox
          media={lightboxMedia}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
