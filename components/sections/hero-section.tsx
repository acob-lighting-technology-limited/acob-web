'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

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
          image: '/images/olooji-community.jpg?height=800&width=1400',
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
        : '/images/olooji-community.jpg?height=800&width=1400',
      location: project.location || 'Across Nigeria',
      slug: project.slug?.current ?? '',
    }));
  }, [projects]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const advanceSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % allSlides.length);
  }, [allSlides.length]);

  useEffect(() => {
    if (allSlides.length <= 1) {
      return;
    }

    const timer = setInterval(advanceSlide, 8000);
    return () => clearInterval(timer);
  }, [advanceSlide, allSlides.length]);

  const currentSlideData = allSlides[currentSlide];

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
            <span className="inline-flex border border-border items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-primary dark:bg-primary/20">
              Renewable energy experts
            </span>
            <div className="space-y-4">
              <MaskText
                phrases={["Powering sustainable futures for homes, businesses, and communities"]}
                className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
              />
              <MaskText
                phrases={["We deliver dependable solar, mini-grid, and energy storage solutions that unlock productivity and resilience for communities across Nigeria."]}
                className="max-w-xl text-lg text-muted-foreground"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {heroMetrics.map(metric => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl"
                >
                  <div className="text-3xl font-semibold text-foreground">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact/quote">
                <Button size="lg" className="px-8 py-6 text-base">
                  Request an energy audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base"
                >
                  Explore recent projects
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-6 -inset-y-4 rounded-[2.5rem] bg-primary/10 blur-2xl dark:bg-primary/15" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-6 shadow-xl backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                <span>Featured project</span>
                <span>{String(currentSlide + 1).padStart(2, '0')}</span>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-muted/40">
                <Image
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  width={720}
                  height={480}
                  className="h-full w-full object-cover transition-transform duration-500 will-change-transform"
                  priority={currentSlide === 0}
                />
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{currentSlideData.location}</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {currentSlideData.title}
                </h2>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {allSlides.map((_, index) => (
                    <button
                      key={`${currentSlideData.id}-${index}`}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? 'w-6 bg-primary'
                          : 'w-2 bg-border hover:w-4 hover:bg-primary/70'
                      }`}
                      aria-label={`Show slide ${index + 1}`}
                    />
                  ))}
                </div>

                {currentSlideData.slug && (
                  <Link href={`/projects/${currentSlideData.slug}`}>
                    <Button size="sm" variant="outline" className="gap-2">
                      View project
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

export { HeroSection };
