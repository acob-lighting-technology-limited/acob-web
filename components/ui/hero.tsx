'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MaskText } from '../animations/MaskText';
import { useSiteReveal } from '@/components/loader/site-reveal-provider';
import { getBlurDataURL } from '@/lib/utils/image-optimization';

interface HeroProps {
  title: string;
  description: string;
  image?:
    | string
    | Array<{
        src: string;
        alt: string;
        href?: string;
      }>;
  imagePosition?: 'top' | 'middle' | 'bottom';
  /**
   * 'default' — standard heading size.
   * 'display' — oversized, uppercase, extra-bold heading for editorial pages
   * where the Hero carries the page's single big title.
   */
  titleSize?: 'default' | 'display';
}

const DEFAULT_HERO_IMAGE = '/images/contact/office-location-hero.webp';

const DESCRIPTION_CLASS: Record<'default' | 'display', string> = {
  default: 'text-2xl sm:text-4xl lg:text-5xl short:text-4xl font-bold',
  display:
    'text-xl sm:text-3xl md:text-4xl lg:text-5xl short:text-4xl font-extrabold uppercase tracking-tight leading-[0.95]',
};

export const Hero = React.memo(function Hero({
  title,
  description,
  image,
  imagePosition = 'middle',
  titleSize = 'default',
}: HeroProps) {
  const { revealed } = useSiteReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  // Slow-exit parallax: as the Hero scrolls from fully in view to fully
  // scrolled past, the image only travels a small fraction of that distance
  // instead of 100% — so it visually lags behind the rest of the page as it
  // leaves, without pinning the Hero itself (no sticky, no stacking-order
  // issues to fight). Kept subtle on purpose — it should read as a bit of
  // polish, not as an obvious "sticky" gimmick.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  // Use default image if not provided
  const imageToUse = image || DEFAULT_HERO_IMAGE;

  // Determine if we have a single image or carousel
  const isSingleImage = typeof imageToUse === 'string';

  if (isSingleImage) {
    // Static Hero
    const positionClass = {
      top: 'object-top',
      middle: 'object-center',
      bottom: 'object-bottom',
    }[imagePosition];

    return (
      <div
        ref={heroRef}
        className="relative w-full h-[calc(50vh+6rem)] md:h-[calc(45vh+6rem)] lg:h-[calc(60vh+6rem)] short:h-[calc(45vh+3rem)] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ y: imageY }}
          >
            <Image
              src={imageToUse}
              alt={title || description || 'Hero image'}
              fill
              className={cn('object-cover hero-slide-zoom', positionClass)}
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-end pb-4 sm:pb-6 xl:pb-10 short:pb-6">
          <div className="2xl:container max-w-7xl mx-auto px-4 w-full">
            <div className="text-white max-w-5xl space-y-3">
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm md:text-base font-semibold text-white bg-primary/90 px-4 py-2 rounded-md uppercase tracking-wider backdrop-blur-sm">
                  {title}
                </p>
              </motion.div>
              <div>
                <MaskText className={DESCRIPTION_CLASS[titleSize]}>
                  {description}
                </MaskText>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Carousel Hero
  return (
    <HeroCarousel
      images={imageToUse as Array<{ src: string; alt: string; href?: string }>}
      title={title}
      description={description}
      titleSize={titleSize}
    />
  );
});

Hero.displayName = 'Hero';

// Internal Carousel Component
interface HeroCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    href?: string;
  }>;
  title: string;
  description: string;
  titleSize?: 'default' | 'display';
}

const HeroCarousel = React.memo(function HeroCarousel({
  images,
  title,
  description,
  titleSize = 'default',
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  // Same slow-exit parallax as the static Hero — see comment there.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const imageRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());
  const hasSwiped = useRef<boolean>(false);
  const autoPlayInterval = 5000;

  const slides = useMemo(() => {
    if (!images || images.length === 0) {
      return [
        {
          src: '/images/olooji-community.webp',
          alt: 'ACOB Lighting',
        },
      ];
    }
    return images.slice(0, 9);
  }, [images]);

  // Reset slide index when images change (e.g. pagination)
  useEffect(() => {
    setCurrent(0);
    setPrevious(0);
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
  }, [current, slides.length]);

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

  // Restart animation when slide becomes current
  useEffect(() => {
    const currentImageDiv = imageRefsMap.current.get(current);
    if (currentImageDiv) {
      // Force reflow to restart animation
      currentImageDiv.style.animation = 'none';
      void currentImageDiv.offsetHeight; // Trigger reflow
      currentImageDiv.style.animation = 'ken-burns 25s ease-out forwards';
    }
  }, [current]);

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    hasSwiped.current = false;
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
      hasSwiped.current = true;
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

    // Reset swipe flag after a short delay to allow normal clicks
    if (hasSwiped.current) {
      setTimeout(() => {
        hasSwiped.current = false;
      }, 300);
    }

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
      ref={heroRef}
      className="relative w-full overflow-hidden touch-pan-y h-[calc(50vh+6rem)] md:h-[calc(45vh+6rem)] lg:h-[calc(60vh+6rem)] short:h-[calc(45vh+3rem)]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with seamless carousel transition */}
      <motion.div className="absolute inset-0 bg-black" style={{ y: imageY }}>
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
                zIndex,
              )}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 overflow-hidden bg-black">
                {slide.href ? (
                  <Link
                    href={slide.href}
                    className="absolute inset-0 cursor-pointer z-10 block"
                    onClick={e => {
                      // Prevent navigation if user swiped
                      if (hasSwiped.current) {
                        e.preventDefault();
                        hasSwiped.current = false;
                      }
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <div
                      ref={el => {
                        if (el) {
                          imageRefsMap.current.set(index, el);
                        }
                      }}
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        transform: 'scale(1) translateZ(0)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'scale(1) translateZ(0)',
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover object-center transition-opacity duration-300 hover:opacity-90"
                        priority={index === 0}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        quality={85}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL()}
                        style={{ objectPosition: 'center' }}
                      />
                    </div>
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                  </Link>
                ) : (
                  <>
                    <div
                      ref={el => {
                        if (el) {
                          imageRefsMap.current.set(index, el);
                        }
                      }}
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        transform: 'scale(1) translateZ(0)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'scale(1) translateZ(0)',
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover object-center"
                        priority={index === 0}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        quality={85}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL()}
                      />
                    </div>
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/60" />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Content Overlay - Title and Description */}
      <div
        className="absolute inset-0 z-30 flex items-end pb-10 pointer-events-none"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        <div className="2xl:container max-w-7xl mx-auto px-4 w-full pointer-events-auto">
          <div className="text-white max-w-5xl space-y-3">
            {/* Title with background badge */}
            <div className="inline-block">
              <p className="text-sm md:text-base font-semibold text-white bg-primary/90 px-4 py-2 rounded-md uppercase tracking-wider backdrop-blur-sm">
                {title}
              </p>
            </div>

            {/* Description as main heading */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <MaskText className={DESCRIPTION_CLASS[titleSize]}>
                {description}
              </MaskText>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators - Only show if more than 1 image */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-30">
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
                      : 'w-2 bg-white/50 hover:bg-white/70',
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

HeroCarousel.displayName = 'HeroCarousel';
