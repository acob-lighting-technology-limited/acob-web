'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MaskText } from '@/components/animations/MaskText';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  projects: Array<{
    _id: string;
    title: string;
    projectImage?: string;
    location?: string;
    state?: string;
    slug?: { current: string };
  }>;
}

export const HeroSection = React.memo(function HeroSection({
  projects,
}: HeroSectionProps) {
  const allSlides = useMemo(() => {
    if (!projects || projects.length === 0) {
      return [
        {
          id: 'fallback',
          title: 'Empowering Communities with Reliable Solar',
          image: '/images/olooji-community.webp',
          location: 'Powering communities',
          state: 'across Nigeria',
        },
      ];
    }

    return projects.slice(0, 6).map(project => ({
      id: `project-${project._id}`,
      title: project.title,
      image: project.projectImage || '/images/olooji-community.webp',
      location: project.location || '',
      state: project.state || '',
    }));
  }, [projects]);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (allSlides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(timer);
  }, [current, isAnimating, allSlides.length]);

  const handlePrevious = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setCurrent(prev => (prev === 0 ? allSlides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleNext = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setCurrent(prev => (prev === allSlides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === current) {
      return;
    }
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Format title: "{state} State" except for FCT
  const getTitle = (slide: (typeof allSlides)[0]) => {
    if (!slide.state) {
      return slide.location || 'Across Nigeria';
    }

    // If state is FCT, just return "FCT"
    if (slide.state.toUpperCase() === 'FCT') {
      return 'FCT';
    }

    // Otherwise return "{state} State"
    return `${slide.state} State`;
  };

  const currentSlide = allSlides[current];
  const title = getTitle(currentSlide);
  const description = currentSlide.title;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-black">
      {/* Background Images with Ken Burns Effect */}
      <div className="absolute inset-0">
        {allSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <div
              className={cn(
                'absolute inset-0',
                index === current && 'animate-ken-burns'
              )}
            >
              <Image
                src={slide.image}
                alt={slide.title}
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
        ))}
      </div>

      {/* Navigation Arrows */}
      {allSlides.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Content Overlay - Title and Description (PageHeroCarousel style) */}
      <div className="absolute inset-0 z-20 flex items-end pb-10">
        <div className="2xl:container max-w-7xl mx-auto px-4 w-full">
          <div className="text-white max-w-5xl space-y-3">
            {/* Title with background badge */}
            {title && (
              <div className="inline-block">
                <div className="text-sm md:text-base font-semibold text-white bg-primary/90 px-4 py-2 rounded-md uppercase tracking-wider backdrop-blur-sm">
                  <MaskText key={`title-${current}`} phrases={[title]} />
                </div>
              </div>
            )}

            {/* Description as main heading */}
            {description && (
              <MaskText
                key={`description-${current}`}
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                {description}
              </MaskText>
            )}
          </div>
        </div>
      </div>

      {/* Dot Indicators - Bottom Center */}
      {allSlides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="2xl:container max-w-7xl mx-auto px-4">
            <div className="flex gap-2 justify-center">
              {allSlides.map((_, index) => (
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

HeroSection.displayName = 'HeroSection';
