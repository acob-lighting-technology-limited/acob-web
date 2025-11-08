'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';

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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map(img => img.category)));
    return ['All', ...cats];
  }, [images]);

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return images;
    }
    return images.filter(img => img.category === selectedCategory);
  }, [selectedCategory, images]);

  // Open lightbox at specific image
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
            {category === 'All'
              ? ` (${images.length})`
              : ` (${images.filter(img => img.category === category).length})`}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <Card
            key={index}
            className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50 cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] overflow-hidden relative bg-muted">
              <Image
                src={applySanityImagePreset(image.src, 'card')}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium line-clamp-2">{image.alt}</p>
                <p className="text-xs text-white/80 mt-1">{image.category}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No images found in this category.
          </p>
        </div>
      )}

      {/* Image Lightbox */}
      {filteredImages.length > 0 && (
        <ImageLightbox
          images={filteredImages.map(img => ({
            src: img.src,
            alt: img.alt,
          }))}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
