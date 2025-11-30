'use client';

// React and Next.js imports

import React, { useMemo, useEffect, useState } from 'react';

import Link from 'next/link';

// Third-party library imports
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// UI component imports
import { Button, Container, Card, CardContent } from '@/components/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';

// Local component imports
import { MaskText } from '../animations/MaskText';
import { FadeIn } from '../animations/FadeIn';
import { StaggerChildren, staggerItem } from '../animations/StaggerChildren';

// Data imports
import { servicesData } from '@/lib/data';

const ServicesSection = React.memo(function ServicesSection() {
  const primaryServices = useMemo(() => servicesData.slice(0, 3), []);
  const additionalServices = useMemo(() => servicesData.slice(3, 6), []);
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
    if (!api || primaryServices.length <= 1) {
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
  }, [api, primaryServices.length]);

  return (
    <section className="border-b border-border-[0.5px] bg-[radial-gradient(circle_at_top,_rgba(8,_145,_63,_0.07),_transparent_55%)] py-12 sm:py-16 lg:py-20 xl:py-24 transition-all duration-500 dark:bg-zinc-950">
      <Container className="px-4">
        <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <FadeIn delay={0.3}>
            <div className="space-y-6">
              <MaskText
                phrases={['Integrated renewable energy for every scale']}
                className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
              />
              <MaskText
                phrases={[
                  'Our multidisciplinary team supports governments, developers, and operators with end-to-end solar, hybrid mini-grid, and clean energy infrastructure. From concept to long term O&M, we help you unlock reliable, efficient power.',
                ]}
                className="max-w-xl text-base md:text-lg text-muted-foreground"
              />
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="inline-block min-h-[48px]">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-base min-h-[48px]"
                  >
                    View all services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="inline-block min-h-[48px]">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-base min-h-[48px] "
                  >
                    Partner with us
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.3} className="grid gap-4">
            {additionalServices.map(service => (
              <motion.div
                key={service.slug as string}
                variants={staggerItem}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl transition-all duration-500 hover:shadow-lg cursor-pointer"
              >
                <div className="relative h-16 w-36 overflow-hidden rounded-xl bg-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:scale-105">
                  {/* Animated fill effect */}
                  <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 origin-center" />
                  <Image
                    src={service.icon || service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="object-contain p-1 relative z-10 transition-all duration-500 group-hover:brightness-0 group-hover:invert"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base md:text-lg font-semibold text-foreground transition-colors duration-500 group-hover:text-primary">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                    {service.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>

        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {primaryServices.map(service => (
                <CarouselItem
                  key={service.slug as string}
                  className="pl-2 md:pl-4"
                >
                  <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      <Image
                        src={service.image || '/placeholder.svg'}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                      <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                        {service.category ?? 'Renewable Solutions'}
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                      <div className="space-y-3">
                        <h3 className="text-xl  font-semibold text-foreground line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                          {service.fullDescription ?? service.excerpt}
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <Link href={`/services/${service.slug}`}>
                          <Button
                            variant="outline"
                            className="relative w-full justify-center gap-2 border-primary bg-background text-foreground overflow-hidden transition-colors duration-500 group-hover:text-primary-foreground"
                          >
                            <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                            <span className="relative z-10 flex items-center gap-2">
                              See solution details
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <StaggerChildren
          staggerDelay={0.3}
          className="hidden lg:grid gap-6 lg:grid-cols-3"
        >
          {primaryServices.map(service => (
            <motion.div key={service.slug as string} variants={staggerItem}>
              <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                  <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                    {service.category ?? 'Renewable Solutions'}
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold mb-3 text-foreground line-clamp-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {service.fullDescription ?? service.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <Link href={`/services/${service.slug}`}>
                      <Button
                        variant="outline"
                        className="relative w-full justify-center gap-2 border-primary bg-background text-foreground overflow-hidden transition-colors duration-500 group-hover:text-primary-foreground"
                      >
                        <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        <span className="relative z-10 flex items-center gap-2">
                          See solution details
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
});

export { ServicesSection };
