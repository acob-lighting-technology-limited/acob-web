'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MaskText } from '@/components/animations/MaskText';
import { stats } from '@/lib/data/transition-data';
import { AnimatedCounter } from '../ui/animated-counter';
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
          location: 'Powering communities across Nigeria',
          slug: '',
        },
      ];
    }

    return projects.slice(0, 6).map(project => ({
      id: `project-${project._id}`,
      title: project.title,
      image: project.projectImage || '/images/olooji-community.webp',
      location:
        project.location && project.state
          ? `${project.location}, ${project.state}`
          : project.location || project.state || 'Across Nigeria',
      slug: project.slug?.current ?? '',
    }));
  }, [projects]);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
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

  const heroMetrics = useMemo(() => {
    if (!stats || stats.length === 0) {
      return [];
    }

    const [miniGrids, totalCapacity, communities, experience] = stats;
    return [miniGrids, totalCapacity, communities ?? miniGrids, experience]
      .filter(Boolean)
      .slice(0, 3)
      .map(item => ({
        label: item.label,
        number: item.number,
        suffix: item.suffix ?? '',
      }));
  }, []);

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-black">
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
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container px-4">
          <div className="w-full">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-5 max-w-3xl">
              <Badge className="bg-primary/20 backdrop-blur-sm text-white border-primary/30 text-xs font-medium uppercase tracking-wide">
                Renewable Energy Experts
              </Badge>

              <div className="space-y-3 md:space-y-4">
                <MaskText
                  phrases={[
                    'Powering sustainable futures for homes, businesses, and communities.',
                  ]}
                  className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
                />
                <p className="max-w-2xl text-sm md:text-base text-gray-200">
                  We deliver dependable solar, mini-grid, and energy storage
                  solutions that unlock productivity and resilience for
                  communities across Nigeria.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid gap-3 sm:gap-3.5 grid-cols-3 max-w-2xl">
                {heroMetrics.map(metric => (
                  <Card
                    key={metric.label}
                    className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border-white/20 hover:border-primary/50 transition-colors duration-300"
                  >
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                      <AnimatedCounter
                        end={metric.number}
                        suffix={metric.suffix}
                        duration={2000}
                      />
                    </div>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-gray-300">
                      {metric.label}
                    </p>
                  </Card>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-5 md:px-7 py-4 md:py-5 text-sm bg-primary hover:bg-primary/90"
                  >
                    Get Your Custom Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-5 md:px-7 py-4 md:py-5 text-sm bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
                  >
                    Explore recent projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Project Info Card - Bottom Right */}
      <div className="hidden lg:block absolute bottom-6 right-0 z-30">
        <div className="2xl:container max-w-7xl mx-auto px-4">
          <div className="flex justify-end">
            <Card className="relative overflow-hidden border-white/20 bg-white/10 backdrop-blur-lg p-3 max-w-xs">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-wide text-gray-300 mb-2">
                <span>Featured Project</span>
                <span>
                  {String(current + 1).padStart(2, '0')} /{' '}
                  {String(allSlides.length).padStart(2, '0')}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-1.5 text-[10px] text-gray-300">
                  <MapPin className="h-2.5 w-2.5 flex-shrink-0 mt-0.5 text-primary" />
                  <span className="line-clamp-1">
                    {allSlides[current].location}
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-white line-clamp-2">
                  {allSlides[current].title}
                </h2>

                {/* Slide Indicators */}
                <div className="flex gap-1.5 mt-3">
                  {allSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrent(index);
                          setTimeout(() => setIsAnimating(false), 800);
                        }
                      }}
                      className={cn(
                        'h-0.5 rounded-full transition-all duration-300',
                        index === current
                          ? 'w-6 bg-primary'
                          : 'w-3 bg-white/30 hover:bg-white/50'
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Mobile Project Info */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-30">
        <div className="container px-4 pb-4">
          <Card className="relative overflow-hidden border-white/20 bg-white/10 backdrop-blur-lg p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-300 mb-2">
              <span>Featured Project</span>
              <span>
                {String(current + 1).padStart(2, '0')} /{' '}
                {String(allSlides.length).padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5 text-primary" />
                <span className="line-clamp-1">
                  {allSlides[current].location}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white line-clamp-1">
                {allSlides[current].title}
              </h2>

              {/* Slide Indicators */}
              <div className="flex gap-2 mt-3">
                {allSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrent(index);
                        setTimeout(() => setIsAnimating(false), 800);
                      }
                    }}
                    className={cn(
                      'h-1 rounded-full transition-all duration-300',
                      index === current ? 'w-8 bg-primary' : 'w-4 bg-white/30'
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
