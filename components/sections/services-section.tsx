'use client';

// React and Next.js imports

import React, { useState, useEffect } from 'react';

import Link from 'next/link';

// Third-party library imports
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';

// UI component imports
import {
  Button,
  Container,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui';
import type { CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';

// Local component imports
import { MaskText } from '../animations/MaskText';

// Data imports
import { servicesData } from '@/lib/data';

const ServicesSection = React.memo(function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on('select', () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const goToSlide = (index: number) => {
    if (!carouselApi || isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    carouselApi.scrollTo(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="py-10 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-700 overflow-hidden">
      <Container className="px-4">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <MaskText
              phrases={[
                'A Leading Supplier Of Solar Materials',
                'For Manufacturers Installers & Contractors,',
                'Mini-Grid Solutions.',
              ]}
              className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8 transition-colors duration-700"
            />
          </div>

          <div>
            <MaskText
              phrases={[
                'Together with our experienced technical team, ACOB Lighting provides emergency response to electricity outages for customers, standard technical O&M activities, and design and installation of streetlighting infrastructure.',
              ]}
              className="text-muted-foreground text-lg leading-relaxed mb-4 transition-colors duration-700"
            />

            <MaskText
              phrases={[
                'We ensure quality control of indoor installations and provide safety training for customers.',
              ]}
              className="text-muted-foreground text-lg leading-relaxed mb-8 transition-colors duration-700"
            />

            <div className="flex gap-4">
              <Link
                href="/services"
                className="w-1/2 md:auto"
                aria-label="View all our services"
              >
                <Button className="w-full bg-primary dark:bg-primary text-lg hover:bg-primary text-primary-foreground px-8 py-6 transition-colors duration-700">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/contact" className="w-1/2 md:auto">
                <Button
                  variant="outline"
                  className="w-full border-border text-lg shadow-md text-foreground hover:bg-muted px-8 py-6 bg-transparent transition-colors duration-700"
                >
                  Find Your Solution
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Services Carousel */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          className=" lg:mx-16"
          setApi={setCarouselApi}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className=" pt-10">
            {servicesData.map((service, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="   shadow-lg  transition-shadow duration-300 group  relative overflow-hidden h-full !py-0">
                  <CardContent className="relative p-10 flex flex-col h-full  border-0  ">
                    <div className="mb-6 w-fit transition-transform duration-700 group-hover:scale-x-[-1]">
                      <span>
                        <Image
                          src={service.icon || '/placeholder.svg'}
                          alt={service.title}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-8 line-clamp-[3]">
                      {service.excerpt}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <Button
                          size="lg"
                          className="bg-foreground dark:!bg-primary !h-12 hover:bg-primary duration-500 transition-colors text-primary-foreground px-6 py-4 text-sm"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                  {/* Green accent line at bottom */}
                  <div className="!ml-0 !pl-0 absolute bottom-0 group-hover:h-2 h-1 w-full bg-primary dark:bg-primary transition-all duration-700 ease-in-out"></div>{' '}
                  {/* <div className="absolute bottom-0 left-0 right-0 h-1 group-hover:!h-6 bg-primary"></div> */}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden sm:flex -left-8  !bg-white" />
          <CarouselNext className="hidden sm:flex -right-8  !bg-white" /> */}
        </Carousel>

        {/* Custom Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {servicesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-500 rounded-full cursor-pointer hover:opacity-80 disabled:cursor-not-allowed ${
                currentSlide === index
                  ? 'w-8 h-1.5 bg-primary dark:bg-primary shadow-lg'
                  : 'w-6 h-1 bg-zinc-400 hover:bg-zinc-600 hover:w-7'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
});

export { ServicesSection };
