'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import type { Project } from '@/lib/types';
import Link from 'next/link';
import SimpleSpinnerExit from '../loader/simple-spinner-exit';

const HeroSection = React.memo(function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isPaused] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const fetchedProjects = await response.json();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Convert projects to slides format with optimized images
  const allSlides = useMemo(() => {
    return projects.map(project => ({
      id: `project-${project._id}`,
      title: project.title,
      image:
        project.images &&
        project.images.length > 0 &&
        project.images[0]?.asset?.url
          ? `${project.images[0].asset.url}?w=1920&h=1080&fit=crop&auto=format&q=75`
          : '/images/olooji-community.jpg?height=800&width=1400', // fallback
      location: project.location,
      slug: project.slug.current,
    }));
  }, [projects]);

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isTransitioning || newIndex === currentSlide) return;

      setIsTransitioning(true);
      setShowContent(false);

      setTimeout(() => {
        setCurrentSlide(newIndex);
        setTimeout(() => {
          setShowContent(true);
          setIsTransitioning(false);
        }, 200);
      }, 800);
    },
    [isTransitioning, currentSlide]
  );

  const nextSlide = useCallback(() => {
    changeSlide((currentSlide + 1) % allSlides.length);
  }, [currentSlide, allSlides.length, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((currentSlide - 1 + allSlides.length) % allSlides.length);
  }, [currentSlide, allSlides.length, changeSlide]);

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  // Auto-play functionality with pause on hover
  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (!isPaused && !isTransitioning) {
          nextSlide();
        }
      }, 10000); // 10 seconds
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isPaused, isTransitioning, nextSlide]);

  const currentSlideData = useMemo(
    () => allSlides[currentSlide],
    [currentSlide, allSlides]
  );

  // Preload critical images for better LCP
  useEffect(() => {
    if (allSlides.length > 0) {
      // Preload first image with high priority
      const preloadImage = new Image();
      preloadImage.src = allSlides[0].image;
      preloadImage.onload = () => {
        console.log('Hero image preloaded successfully');
      };

      // Preload second image for smooth transitions
      if (allSlides.length > 1) {
        const preloadImage2 = new Image();
        preloadImage2.src = allSlides[1].image;
      }
    }
  }, [allSlides]);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center relative h-[80vh] min-h-[500px] sm:min-h-[700px] overflow-hidden w-full bg-black">
        <SimpleSpinnerExit preview={true} />
      </section>
    );
  }

  return (
    <section className="relative h-[80vh] min-h-[500px] sm:min-h-[700px] overflow-hidden w-full">
      <div className="absolute inset-0 bg-black">
        {allSlides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className={`absolute inset-0 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat ${
                index === currentSlide && !isPaused ? 'ken-burns-zoom' : ''
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                transform: 'scale(1.05)',
                transformOrigin: 'center center',
              }}
            />
            {/* Preload next image for smooth transitions */}
            {index === (currentSlide + 1) % allSlides.length && (
              <div
                className="hidden"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full text-primary-foreground hover:scale-110 transition-all  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
      >
        <ChevronLeft className="h-24 w-24 text-primary-foreground opacity-30 hover:opacity-70 hover:text-primary-foreground group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full text-primary-foreground hover:scale-110 transition-all  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
      >
        <ChevronRight className="h-24 w-24 text-primary-foreground opacity-30 hover:opacity-70 hover:text-primary-foreground group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Content with smooth animations */}
      <div className="relative z-10 2xl:max-w-6xl text-primary-foreground  flex items-end p-6 sm:p-12 h-[80vh] sm:h-full min-h-[500px] sm:min-h-[700px] w-full">
        <div className="2xl:px-8 max-w-7xl ">
          <div className="w-full max-w-4xl">
            {/* Animated Title */}
            <div className="overflow-hidden mb-4 sm:mb-6">
              <h1
                className={`text-4xl md:text-7xl font-extrabold leading-tight text-left transition-all duration-1000 ease-out ${
                  showContent
                    ? 'transform translate-x-0 opacity-100 blur-0'
                    : 'transform -translate-x-full opacity-0 '
                }`}
                style={{ transitionDelay: showContent ? '400ms' : '0ms' }}
              >
                {currentSlideData.title}
              </h1>
            </div>

            {/* Animated Description */}
            <div className="overflow-hidden mb-8">
              <p
                className={`text-lg md:text-xl opacity-90 text-left max-w-3xl transition-all duration-1000 ease-out ${
                  showContent
                    ? 'transform translate-x-0 opacity-90 blur-0'
                    : 'transform -translate-x-full opacity-0 '
                }`}
                style={{ transitionDelay: showContent ? '600ms' : '0ms' }}
              >
                {currentSlideData.location}
              </p>
            </div>

            {/* Animated Buttons */}
            <div className="flex  gap-4 justify-start">
              {/* View Project - slides in from left */}
              <div className="overflow-hidden">
                <Link href={`/projects/${currentSlideData.slug}`}>
                  <Button
                    size="lg"
                    className={`bg-primary border border-primary hover:border-primary/90   hover:bg-primary/90 text-lg py-6 text-primary-foreground transition-opacity ease-out duration-1000 ${
                      showContent
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full opacity-0'
                    }`}
                    style={{
                      transitionDelay: showContent ? '800ms' : '0ms',
                      transform: showContent
                        ? 'translateX(0)'
                        : 'translateX(-100%)',
                      transition: showContent
                        ? 'transform 1000ms ease-out 800ms, opacity 1000ms ease-out 800ms'
                        : 'transform 1000ms ease-out, opacity 1000ms ease-out',
                    }}
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Our Projects - slides in from right */}
              <Link href="/projects">
                <Button
                  size="lg"
                  className={`text-lg py-6  border border-white/50 bg-white text-primary hover:bg-primary  dark:hover:bg- hover:text-white dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900 dark:hover:text-zinc-100  shadow-lg transition-opacity ease-out duration-1000 ${
                    showContent
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    transitionDelay: showContent ? '1000ms' : '0ms',
                    transform: showContent
                      ? 'translateX(0)'
                      : 'translateX(100%)',
                    transition: showContent
                      ? 'transform 1000ms ease-out 1000ms, opacity 1000ms ease-out 1000ms'
                      : 'transform 1000ms ease-out, opacity 1000ms ease-out',
                  }}
                >
                  Our Projects
                </Button>
              </Link>
            </div>
            {/* Custom Indicators - directly above title */}
            <div className="flex space-x-2 mt-8">
              {allSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`transition-all  rounded-full cursor-pointer hover:opacity-80 disabled:cursor-not-allowed ${
                    currentSlide === index
                      ? 'w-8 h-1 bg-primary shadow-lg'
                      : 'w-6 h-0.5 bg-primary-foreground/50 hover:bg-primary-foreground/70 hover:w-7'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for iPhone-style Ken Burns effect */}
      <style jsx>{`
        .ken-burns-zoom {
          animation: kenBurnsZoom 10s ease-out forwards;
        }

        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.18);
          }
        }

        /* Pause animation on hover */
        .ken-burns-zoom:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
});

export { HeroSection };
