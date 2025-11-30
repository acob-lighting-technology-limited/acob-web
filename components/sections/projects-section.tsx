'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  StaggerChildren,
  staggerItem,
} from '@/components/animations/StaggerChildren';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowRight, MapPin, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Project } from '@/lib/types';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { getBlurDataURL } from '@/lib/utils/image-optimization';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const displayProjects = projects.slice(0, 3);
  const hasProjects = displayProjects.length > 0;
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      // Track current slide if needed in the future
    });
  }, [api]);

  // Auto-scroll functionality (disabled on mobile)
  useEffect(() => {
    if (!api || displayProjects.length <= 1) {
      return;
    }

    let interval: NodeJS.Timeout | null = null;

    const checkAndStartAutoScroll = () => {
      // Clear existing interval
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      // Check if screen is lg or larger (1024px+)
      const isLargeScreen = window.innerWidth >= 1024;
      if (isLargeScreen) {
        interval = setInterval(() => {
          api.scrollNext();
        }, 5000); // Auto-scroll every 5 seconds
      }
    };

    // Initial check
    checkAndStartAutoScroll();

    // Listen for resize events
    window.addEventListener('resize', checkAndStartAutoScroll);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener('resize', checkAndStartAutoScroll);
    };
  }, [api, displayProjects.length]);

  if (!hasProjects) {
    return (
      <section className="border-b border-border-[0.5px] bg-background py-12 sm:py-16 lg:py-20 xl:py-24">
        <Container className="px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Featured Deployments
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our project portfolio is being refreshed. Check back soon or
              explore our full project stories.
            </p>
            <Link href="/projects" className="mt-8">
              <Button size="lg">View Projects Archive</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-border-[0.5px] bg-background py-12 sm:py-16 lg:py-20 xl:py-24">
      <Container className="px-4">
        <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <MaskText
                phrases={['Selected Energy Deployments']}
                className="text-3xl font-semibold md:text-4xl lg:text-5xl"
              />
              <MaskText
                phrases={[
                  'Each project is engineered to deliver bankable returns, resilient operations, and measurable socio-economic impact for communities across Nigeria.',
                ]}
                className="max-w-xl text-base md:text-lg text-muted-foreground"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 uppercase tracking-wide">
                <MapPin className="h-4 w-4" /> Nationwide coverage
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 uppercase tracking-wide">
                <Clock3 className="h-4 w-4" /> Active operations
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 uppercase tracking-wide">
                Impact-driven delivery
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayProjects.map(project => {
                const projectImage = project.projectImage
                  ? applySanityImagePreset(project.projectImage, 'card')
                  : '/images/olooji-community.webp?height=600&width=900';

                return (
                  <CarouselItem key={project._id} className="pl-2 md:pl-4">
                    <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                      {/* Project Image */}
                      <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                        <Image
                          src={projectImage}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-active:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          loading="lazy"
                          quality={80}
                          placeholder="blur"
                          blurDataURL={getBlurDataURL()}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                        <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                          {project.location && project.state
                            ? `${project.location}, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State.`}`
                            : project.location ||
                              (project.state
                                ? project.state.toUpperCase() === 'FCT'
                                  ? 'FCT'
                                  : `${project.state} State.`
                                : 'Nigeria')}
                        </div>
                      </div>

                      {/* Project Content */}
                      <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                        <div className="space-y-3">
                          <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-3">
                            {project.title}
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                            {project.excerpt ||
                              project.description ||
                              'Project details coming soon.'}
                          </p>
                        </div>

                        <div className="mt-auto pt-6">
                          <Link href={`/projects/${project.slug?.current}`}>
                            <Button
                              variant="outline"
                              className="relative w-full justify-center gap-2 border-primary bg-background text-foreground overflow-hidden transition-colors duration-500 group-hover:text-primary-foreground"
                            >
                              <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                              <span className="relative z-10 flex items-center gap-2">
                                View project
                                <ArrowRight className="h-4 w-4" />
                              </span>
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <StaggerChildren
          staggerDelay={0.3}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {displayProjects.map(project => {
            const projectImage = project.projectImage
              ? applySanityImagePreset(project.projectImage, 'card')
              : '/images/olooji-community.webp?height=600&width=900';

            return (
              <motion.div key={project._id} variants={staggerItem}>
                <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                  {/* Project Image */}
                  <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                    <Image
                      src={projectImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      priority={false}
                      loading="lazy"
                      quality={80}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                    <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                      {project.location && project.state
                        ? `${project.location}, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State`}`
                        : project.location ||
                          (project.state
                            ? project.state.toUpperCase() === 'FCT'
                              ? 'FCT'
                              : `${project.state} State`
                            : 'Nigeria')}
                    </div>
                  </div>

                  {/* Project Content */}
                  <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold mb-3 text-foreground line-clamp-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.excerpt ||
                          project.description ||
                          'Project details coming soon.'}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <Link href={`/projects/${project.slug?.current}`}>
                        <Button
                          variant="outline"
                          className="relative w-full justify-center gap-2 border-primary bg-background text-foreground overflow-hidden transition-colors duration-500 group-hover:text-primary-foreground"
                        >
                          <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                          <span className="relative z-10 flex items-center gap-2">
                            View project
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </StaggerChildren>

        {/* View All Button */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button className="px-8 py-3">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
