'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageLightbox } from '@/components/ui/image-lightbox';

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
  const lightboxImages = images.map((image, index) => ({
    src: image.split('?')[0], // Remove query params if any
    alt: `${serviceTitle} image ${index + 1}`,
  }));

  return (
    <>
      <div className="mt-6 flex flex-wrap -mx-2">
        {images.map((image, index) => {
          const imageSrc = image.split('?')[0]; // Remove query params if any
          return (
            <div key={index} className="inline-block w-1/2 lg:w-1/3 px-2 my-4">
              <button
                onClick={() => handleImageClick(index)}
                className="relative w-full aspect-[4/3] group cursor-zoom-in overflow-hidden rounded-lg"
              >
                <Image
                  src={imageSrc}
                  alt={`${serviceTitle} image ${index + 1}`}
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
              </button>
            </div>
          );
        })}
      </div>

      {/* Image Lightbox */}
      {lightboxImages.length > 0 && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
