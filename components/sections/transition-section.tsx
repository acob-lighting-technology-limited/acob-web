'use client';

import { Container } from '@/components/ui/container';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { MaskText } from '../animations/MaskText';

import { stats } from '@/lib/data/transition-data';
import {
  getRandomProjectImages,
  getRandomBackgroundImage,
  RandomImage,
} from '@/lib/utils/random-images';

// Cache for random images to avoid refetching
const CACHE_KEY = 'transition-section-images';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface CachedImages {
  images: RandomImage[];
  backgroundImage: string;
  timestamp: number;
}

// Utility function to get cached images
const getCachedImages = (): CachedImages | null => {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed: CachedImages = JSON.parse(cached);
    const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

// Utility function to cache images
const cacheImages = (images: RandomImage[], backgroundImage: string) => {
  if (typeof window === 'undefined') return;

  try {
    const cached: CachedImages = {
      images,
      backgroundImage,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {
    // Silently fail if localStorage is not available
  }
};

function CounterAnimation({
  end,
  suffix,
  duration = 2.5,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div
      ref={countRef}
      className="text-2xl font-bold text-primary-foreground mb-2"
    >
      {count}
      {suffix}
    </div>
  );
}

export function TransitionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [randomImages, setRandomImages] = useState<RandomImage[]>([]);
  const [backgroundImage, setBackgroundImage] = useState(
    '/images/transition-bg.jpg'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Memoized loading function to prevent unnecessary re-renders
  const loadRandomImages = useCallback(async () => {
    // Check cache first
    const cached = getCachedImages();
    if (cached) {
      setRandomImages(cached.images);
      setBackgroundImage(cached.backgroundImage);
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    try {
      setIsLoading(true);
      const [images, bgImage] = await Promise.all([
        getRandomProjectImages(4),
        getRandomBackgroundImage(),
      ]);

      setRandomImages(images);
      setBackgroundImage(bgImage);

      // Cache the results
      cacheImages(images, bgImage);
    } catch (error) {
      console.error('Error loading random images:', error);
      // Use fallback images on error
      setRandomImages([
        {
          url: '/images/obadore-ondo.jpg',
          alt: 'Solar Installation',
          projectTitle: 'Fallback Image',
        },
        {
          url: '/images/makami-kaduna.jpg',
          alt: 'Team at Work',
          projectTitle: 'Fallback Image',
        },
        {
          url: '/images/olooji-community.jpg',
          alt: 'Solar Panels',
          projectTitle: 'Fallback Image',
        },
        {
          url: '/images/adebayo-community.jpg',
          alt: 'Community Impact',
          projectTitle: 'Fallback Image',
        },
      ]);
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      loadRandomImages();
    }
  }, [loadRandomImages, hasLoaded]);

  return (
    <section
      ref={ref}
      className="relative py-16 bg-cover bg-center bg-no-repeat overflow-hidden transition-colors duration-700"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/90 dark:bg-gradient-to-b dark:from-zinc-950 from-0% dark:to-black/5 to-80%  z-0 transition-colors duration-700"></div>
      <Container className="relative px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <MaskText
              phrases={[
                'Feeling The Transition To Renewable Power,',
                'To deploy 100 micro-grids impacting the lives of over ten thousand Nigerians by 2030.',
              ]}
              className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground transition-colors duration-700"
            />
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.3,
                    ease: 'easeOut',
                  }}
                  className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5 text-center"
                >
                  <CounterAnimation
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                  <div className="text-sm text-zinc-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {useMemo(() => {
              if (isLoading) {
                // Loading skeleton
                return Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden shadow-lg bg-gray-300 animate-pulse ${
                      index === 1 || index === 2 ? 'mt-8' : ''
                    } ${index === 2 ? '-mt-8' : ''}`}
                    style={{ height: '250px' }}
                  />
                ));
              }

              // Random images
              return randomImages.map((image, index) => (
                <div
                  key={`${image.projectTitle}-${index}`}
                  className={`relative rounded-lg overflow-hidden shadow-lg ${
                    index === 1 || index === 2 ? 'mt-8' : ''
                  } ${index === 2 ? '-mt-8' : ''}`}
                >
                  <motion.img
                    src={`${image.url}?height=250&width=300&fit=crop&auto=format&q=75`}
                    alt={image.alt}
                    className="w-full h-[250px] object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                </div>
              ));
            }, [isLoading, randomImages, isInView])}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
