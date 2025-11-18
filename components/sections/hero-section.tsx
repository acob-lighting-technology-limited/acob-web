'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowRight, MapPin } from 'lucide-react';
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
          ? `${project.location}, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State.`}`
          : project.location ||
            (project.state
              ? project.state.toUpperCase() === 'FCT'
                ? 'FCT'
                : `${project.state} State.`
              : 'Across Nigeria'),
      slug: project.slug?.current ?? '',
    }));
  }, [projects]);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRefsMap = React.useRef<Map<number, HTMLDivElement>>(new Map());

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(timer);
  }, [current, isAnimating, allSlides.length]);

  const handleNext = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setCurrent(prev => (prev === allSlides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
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
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0',
            )}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                ref={el => {
                  if (el) {
                    imageRefsMap.current.set(index, el);
                  }
                }}
                className="absolute inset-0"
                style={{
                  transform: 'scale(1) translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
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
            </div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-end pb-6 lg:pb-6">
        <div className=" px-4 sm:px-8 pb-6 sm:pb-2">
          <div className="w-full">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-5 max-w-xl">
              <Badge className="bg-primary/20 backdrop-blur-sm text-white border-primary/30 text-xs font-medium uppercase tracking-wide">
                Renewable Energy Experts
              </Badge>

              <div className="space-y-3">
                <MaskText
                  phrases={[
                    'Powering sustainable futures for homes, businesses, and communities.',
                  ]}
                  className="font-bold leading-tight text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white"
                />
                <p className="max-w-xl text-sm md:text-base text-gray-200">
                  We deliver dependable solar, mini-grid, and energy storage
                  solutions that unlock productivity and resilience for
                  communities across Nigeria.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid gap-2 sm:gap-2.5 grid-cols-3 max-w-xl">
                {heroMetrics.map(metric => (
                  <Card
                    key={metric.label}
                    className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border-white/20 hover:border-primary/50 transition-colors duration-300"
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
              <div className="grid grid-cols-2 gap-3">
                <Link href="/services" className="w-full">
                  <Button
                    size="lg"
                    className="w-full px-5 md:px-7 py-4 md:py-5 text-sm bg-primary hover:bg-primary/90"
                  >
                    <span className="hidden md:inline">View Our Services</span>
                    <span className="md:hidden">Services</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects" className="w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full px-5 md:px-7 py-4 md:py-5 text-sm bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
                  >
                    <span className="hidden md:inline">
                      Explore recent projects
                    </span>
                    <span className="md:hidden">Projects</span>
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
            <div className="relative overflow-hidden p-3 pb-2 max-w-md mr-6">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-200">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span className="line-clamp-1">
                    {allSlides[current].location}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white line-clamp-2">
                  {allSlides[current].title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Project Info - Hidden on mobile */}

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="flex gap-2">
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
                index === current
                  ? 'w-8 bg-primary'
                  : 'w-4 bg-white/30 hover:bg-white/50',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
