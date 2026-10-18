'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Lightbox } from '@/components/ui/lightbox';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export function GalleryClient({ images }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map(img => img.category)));
    return ['All', ...cats];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return images;
    }
    return images.filter(img => img.category === selectedCategory);
  }, [selectedCategory, images]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-6">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-none',
              selectedCategory === category ? '' : 'border-border',
            )}
          >
            {category}
            {category === 'All'
              ? ` (${images.length})`
              : ` (${images.filter(img => img.category === category).length})`}
          </Button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {filteredImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden border border-border bg-muted transition-colors duration-300 hover:border-primary/50 rounded-lg"
          >
            <Image
              src={applySanityImagePreset(image.src, 'card')}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-left text-white transition-transform duration-300 group-hover:translate-y-0">
              <p className="line-clamp-2 text-sm font-semibold">{image.alt}</p>
              <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/80">
                {image.category}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filteredImages.length === 0 && (
        <div className="mt-10 border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No images found in this category.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {filteredImages.length > 0 && (
        <Lightbox
          media={filteredImages.map(img => ({
            src: img.src,
            alt: img.alt,
            type: 'image' as const,
          }))}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
