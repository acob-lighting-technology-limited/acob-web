'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
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

interface HeroSectionProps {
  projects: any[];
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
        value: `${item.number}${item.suffix ?? ''}`,
      }));
  }, []);

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background pb-4 pt-4 sm:pb-4 sm:pt-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl dark:from-primary/15"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-16 hidden h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:block dark:bg-primary/25"
      />

      <Container className="relative px-4">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-20">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-sm font-medium uppercase tracking-wide">
              Renewable Energy Experts
            </Badge>
            <div className="space-y-4">
              <MaskText
                phrases={["Powering sustainable futures for homes, businesses, and communities."]}
                className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
              />
              <MaskText
                phrases={["We deliver dependable solar, mini-grid, and energy storage solutions that unlock productivity and resilience for communities across Nigeria."]}
                className="max-w-xl text-lg text-muted-foreground"
              />
            </div>

            <div className="grid gap-2 sm:gap-4 grid-cols-3">
              {heroMetrics.map(metric => (
                <Card
                  key={metric.label}
                  className="p-4 bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </Card>
              ))}
            </div>

            <div className="flex  flex-wrap gap-4">
              <Link href="/contact/quote" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base">
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

          <div className="relative">
            <div
              className="absolute -inset-x-6 -inset-y-4 rounded-[2.5rem] bg-primary/10 blur-2xl dark:bg-primary/15"
              aria-hidden="true"
            />
            
            <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <Card className="relative overflow-hidden border-border bg-card p-4">
                
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground mb-4">
                  <span>Featured project</span>
                  <span>{String(current + 1).padStart(2, '0')}</span>
                </div>

                <div className="space-y-6">
                  {/* Carousel - Only image, location, and title slide */}
                  <div className="relative">
                    <CarouselContent>
                      {allSlides.map((slide, index) => (
                        <CarouselItem key={slide.id}>
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
                          
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{slide.location}</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground line-clamp-2">
                              {slide.title}
                            </h2>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </div>

                  {/* Static Controls - Dots and View Project button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {allSlides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => api?.scrollTo(dotIndex)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            current === dotIndex
                              ? 'w-6 bg-primary'
                              : 'w-2 bg-border hover:w-4 hover:bg-primary/70'
                          }`}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>

                    {allSlides[current]?.slug && (
                      <Link href={`/projects/${allSlides[current].slug}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          View project
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
