'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { servicesData } from '@/lib/data';

export function ServicesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentSlide(newIndex);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    changeSlide((currentSlide + 1) % servicesData.length);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((currentSlide - 1 + servicesData.length) % servicesData.length);
  }, [currentSlide, changeSlide]);

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (!isTransitioning) {
          nextSlide();
        }
      }, 5000); // 5 seconds
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isTransitioning, nextSlide]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solar energy solutions tailored to your needs
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md hover:bg-background/90 text-foreground hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-border"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md hover:bg-background/90 text-foreground hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-border"
            aria-label="Next service"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {servicesData.map((service, index) => (
                <div
                  key={typeof service.slug === 'string' ? service.slug : service.slug.current}
                  className="w-full flex-shrink-0"
                  style={{ width: '100%' }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8">
                    {/* Service Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={service.image || '/placeholder.svg'}
                        alt={service.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Service Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-4">
                          {service.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {service.fullDescription}
                        </p>
                      </div>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-foreground">
                            Key Features:
                          </h4>
                          <ul className="space-y-2">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-3 text-muted-foreground"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Link href={`/services/${service.slug}`}>
                          <Button size="lg" className="group">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {servicesData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full cursor-pointer hover:opacity-80 disabled:cursor-not-allowed ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-primary shadow-lg'
                    : 'w-6 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
