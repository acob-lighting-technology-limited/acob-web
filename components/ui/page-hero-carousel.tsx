'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MaskText } from '../animations/MaskText';

interface PageHeroCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  title?: string;
  description?: string;
  height?: string;
  autoPlayInterval?: number;
}

export const PageHeroCarousel = React.memo(function PageHeroCarousel({
  images,
  title,
  description,
  height = 'h-[50vh] md:h-[60vh]',
  autoPlayInterval = 5000,
}: PageHeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = useMemo(() => {
    if (!images || images.length === 0) {
      return [
        {
          src: '/images/olooji-community.webp',
          alt: 'ACOB Lighting',
        },
      ];
    }
    return images;
  }, [images]);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    // Clear any existing timer
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    autoPlayTimerRef.current = setInterval(() => {
      setPrevious(current);
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [current, slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    if (index === current) {
      return;
    }
    setPrevious(current);
    setCurrent(index);
  };

  const handleNext = () => {
    setPrevious(current);
    setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setPrevious(current);
    setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    // Pause auto-play while user is interacting
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
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

    // Reset and restart auto-play
    touchStartX.current = 0;
    touchEndX.current = 0;

    // Restart auto-play after a delay
    if (slides.length > 1) {
      setTimeout(() => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
        autoPlayTimerRef.current = setInterval(() => {
          setPrevious(current);
          setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, autoPlayInterval);
      }, 1000); // Wait 1 second before restarting
    }
  };

  return (
    <div
      className={cn('relative w-full overflow-hidden touch-pan-y', height)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with seamless carousel transition */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          let position = 'translate-x-full'; // Default: off-screen right
          let zIndex = 'z-0';

          if (index === current) {
            position = 'translate-x-0'; // Current slide: center
            zIndex = 'z-20';
          } else if (index === previous) {
            position = '-translate-x-full'; // Previous slide: exit left
            zIndex = 'z-10';
          }

          return (
            <div
              key={`${slide.src}-${index}`}
              className={cn(
                'absolute inset-0 transition-transform duration-1000 ease-in-out',
                position,
                zIndex
              )}
            >
              <div className="absolute inset-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={95}
                  sizes="100vw"
                />
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Content Overlay - Title and Description */}
      {(title || description) && (
        <div className="absolute inset-0 z-20 flex items-end pb-10">
          <div className="2xl:container max-w-7xl mx-auto px-4 w-full">
            <div className="text-white max-w-5xl space-y-3">
              {/* Title with background badge */}
              {title && (
                <div className="inline-block">
                  <p className="text-sm md:text-base font-semibold text-white bg-primary/90 px-4 py-2 rounded-md uppercase tracking-wider backdrop-blur-sm">
                    {title}
                  </p>
                </div>
              )}

              {/* Description as main heading */}
              {description && (
                <MaskText className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {description}
                </MaskText>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dot Indicators - Only show if more than 1 image */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="2xl:container max-w-7xl mx-auto px-4">
            <div className="flex gap-2 justify-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === current
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

PageHeroCarousel.displayName = 'PageHeroCarousel';
