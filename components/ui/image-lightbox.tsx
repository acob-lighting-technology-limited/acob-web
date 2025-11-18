'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  images: Array<{ src: string; alt: string }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [previousIndex, setPreviousIndex] = useState(initialIndex);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll and hide background when lightbox is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;

      // Lock the body completely
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Also lock html element
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
    } else {
      // Restore scroll position and styles
      const scrollY = scrollPosition.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';

      window.scrollTo(0, scrollY);
    }

    return () => {
      // Cleanup on unmount
      const scrollY = scrollPosition.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';

      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setPreviousIndex(currentIndex);
    setSlideDirection('left'); // Slide current image to left, new image comes from right
    setCurrentIndex(prev => (prev + 1) % images.length);
    setIsZoomed(false);
    setTimeout(() => setSlideDirection(null), 500);
  }, [images.length, currentIndex]);

  const handlePrevious = useCallback(() => {
    setPreviousIndex(currentIndex);
    setSlideDirection('right'); // Slide current image to right, new image comes from left
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
    setTimeout(() => setSlideDirection(null), 500);
  }, [images.length, currentIndex]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) {
      return;
    } // Don't swipe when zoomed
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isZoomed) {
      return;
    }
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isZoomed) {
      return;
    }

    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next image
        handleNext();
      } else {
        // Swiped right - go to previous image
        handlePrevious();
      }
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!isOpen || images.length === 0 || !images[currentIndex]) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black touch-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitOverflowScrolling: 'auto',
        overscrollBehavior: 'contain',
        touchAction: 'none',
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
          {images[currentIndex]?.alt && (
            <span className="text-white text-sm font-medium hidden sm:block">
              {images[currentIndex].alt}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleZoom();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            {isZoomed ? (
              <ZoomOut className="h-5 w-5" />
            ) : (
              <ZoomIn className="h-5 w-5" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Previous Image (sliding out) */}
          {slideDirection && previousIndex !== currentIndex && (
            <div
              key={`prev-${previousIndex}`}
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                slideDirection === 'left' && 'slide-out-left',
                slideDirection === 'right' && 'slide-out-right',
              )}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[previousIndex]?.src || ''}
                  alt={images[previousIndex]?.alt || ''}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={95}
                />
              </div>
            </div>
          )}

          {/* Current Image (sliding in from appropriate side) */}
          <div
            key={`current-${currentIndex}`}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              slideDirection === 'left' && 'slide-in-from-right',
              slideDirection === 'right' && 'slide-in-from-left',
              isZoomed && 'scale-150 cursor-move overflow-auto',
            )}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]?.src || ''}
                alt={images[currentIndex]?.alt || ''}
                fill
                className={cn(
                  'object-contain transition-all duration-300',
                  isZoomed && 'object-cover',
                )}
                sizes="100vw"
                priority
                quality={95}
                loading="eager"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={e => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setIsZoomed(false);
                }}
                className={cn(
                  'relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300',
                  index === currentIndex
                    ? 'border-primary scale-110 shadow-lg shadow-primary/50'
                    : 'border-white/30 hover:border-white/60 opacity-60 hover:opacity-100',
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
