/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowRight, MapPin } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { stats } from '@/lib/data/transition-data';
import { AnimatedCounter } from '../ui/animated-counter';
import { CAROUSEL_AUTOPLAY_DELAY } from '@/lib/constants/ui';

interface HeroSectionProps {
  projects: Array<{
    _id: string;
    title: string;
    projectImage?: string;
    location?: string;
    slug?: { current: string };
  }>;
}

const HeroSection = React.memo(function HeroSection({
  projects,
}: HeroSectionProps) {
  const allSlides = useMemo(() => {
    if (!projects || projects.length === 0) {
      return [
        {
          id: 'fallback',
          title: 'Empowering Communities with Reliable Solar',
          image: '/images/olooji-community.webp?height=800&width=1400',
          location: 'Powering communities across Nigeria',
          slug: '',
        },
      ];
    }

    return projects.slice(0, 6).map(project => ({
      id: `project-${project._id}`,
      title: project.title,
      image: project.projectImage
        ? applySanityImagePreset(project.projectImage, 'card')
        : '/images/olooji-community.webp?height=800&width=1400',
      location: project.location || 'Across Nigeria',
      slug: project.slug?.current ?? '',
    }));
  }, [projects]);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
    <section className="relative transition-all duration-500 isolate border-b border-border-[0.5px] bg-background pb-4 pt-4 sm:pb-4 sm:pt-12 overflow-x-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl dark:from-primary/15"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-16 hidden h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:block dark:bg-primary/25"
      />

      <Container className="relative px-4 !pt-6 overflow-x-hidden">
        <div className="grid items-start gap-12 lg:grid-cols-2 xl:gap-16">
          <div className="space-y-8 min-w-0">
            <Badge className="bg-primary/10 text-foreground/60 border-primary/20 text-sm font-medium uppercase tracking-wide">
              Renewable Energy Experts
            </Badge>
            <div className="space-y-4">
              <MaskText
                phrases={[
                  'Powering sustainable futures for homes, businesses, and communities.',
                ]}
                className="text-3xl font-bold leading-tight md:text-4xl lg:text-5.5xl text-primary dark:text-foreground"
              />
              <MaskText
                phrases={[
                  'We deliver dependable solar, mini-grid, and energy storage solutions that unlock productivity and resilience for communities across Nigeria.',
                ]}
                className="max-w-xl text-base md:text-lg text-muted-foreground"
              />
            </div>

            <div className="grid gap-2 sm:gap-4 grid-cols-3">
              {heroMetrics.map(metric => (
                <Card
                  key={metric.label}
                  className="p-3 bg-card border-border hover:border-primary/50 "
                >
                  <div className="text-xl sm:text-2xl font-semibold text-foreground">
                    <AnimatedCounter
                      end={metric.number}
                      suffix={metric.suffix}
                      duration={2000}
                    />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact/quote" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-base"
                >
                  Request an energy audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-base"
                >
                  Explore recent projects
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative min-w-0 w-full">
            <div
              className="absolute inset-0 sm:-inset-x-4 -inset-y-4 rounded-[3.5rem] bg-primary/10 blur-2xl dark:bg-primary/15"
              aria-hidden="true"
            />

            <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full relative"
            >
              <Card className="relative overflow-hidden border-border rounded-3xl bg-background p-3 sm:p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground mb-4">
                  <span>Featured project</span>
                  <span>{String(current + 1).padStart(2, '0')}</span>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Carousel - Only image, location, and title slide */}
                  <div className="relative">
                    <CarouselContent className="-ml-2 sm:-ml-4">
                      {allSlides.map((slide, index) => (
                        <CarouselItem key={slide.id} className="pl-2 sm:pl-4">
                          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              width={720}
                              height={480}
                              className="w-full h-full object-cover aspect-[16/10]"
                              priority={index === 0}
                            />
                          </div>

                          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{slide.location}</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground line-clamp-2">
                              {slide.title}
                            </h2>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-0 sm:left-2 hidden md:flex" />
                    <CarouselNext className="right-0 sm:right-2 hidden md:flex" />
                  </div>

                  {/* Static Controls - Dots and View Project button */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {allSlides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => api?.scrollTo(dotIndex)}
                          className={`h-2 rounded-full transition-all duration-500 ${
                            current === dotIndex
                              ? 'w-6 bg-primary'
                              : 'w-2 bg-border hover:w-4 hover:bg-primary/70'
                          }`}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>

                    {allSlides[current]?.slug && (
                      <Link
                        href={`/projects/${allSlides[current].slug}`}
                        className="flex-shrink-0"
                      >
                        <Button size="sm" variant="outline" className="gap-2">
                          <span className="hidden sm:inline">View project</span>
                          <span className="sm:hidden">View</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
  );
});

export { HeroSection };
