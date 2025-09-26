'use client';

import { useMemo } from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MaskText } from '@/components/animations/MaskText';
import { Star, Quote, Building, UserCheck } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials-data';

const testimonialHighlight = testimonials.slice(0, 3);

export function TestimonialsSection() {
  const aggregateStats = useMemo(
    () => [
      { label: 'Client satisfaction', value: '98%' },
      { label: 'Energy assets delivered', value: '500+' },
      { label: 'Active partnerships', value: '30+' },
    ],
    [],
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  return (
    <section className="border-b border-border bg-muted/20 py-12 sm:py-16 md:py-20 lg:py-24">
      <Container className="px-4">
        {/* Header Section - Stack on mobile, side-by-side on larger screens */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="text-center sm:text-left">
            <Badge className="bg-primary/10 text-primary mb-4 sm:mb-6">Trusted partners</Badge>
            <MaskText
              phrases={["Verified testimonials from the organisations we power"]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4 sm:mb-6"
            />
            <MaskText
              phrases={["Utilities, enterprises, and development agencies across Nigeria choose ACOB Lighting for dependable clean energy infrastructure and measurable local impact."]}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto sm:mx-0"
            />
          </div>
        </div>

        {/* Stats Section - Responsive grid */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {aggregateStats.map(stat => (
              <div
                key={stat.label}
                className="rounded-xl sm:rounded-2xl border border-border bg-background/80 p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section - Responsive layout */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {testimonialHighlight.map(testimonial => (
            <Card
              key={testimonial.name}
              className="relative overflow-hidden border border-border bg-card/90 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
            >
              <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 lg:p-8 h-full flex flex-col">
                {/* Quote Icon - Responsive positioning */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 text-primary/20">
                  <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16" />
                </div>

                {/* Rating Section */}
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                    {testimonial.rating}/5
                  </span>
                </div>

                {/* Quote Content */}
                <div className="flex-1 pr-8 sm:pr-10 md:pr-12 lg:pr-16">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                {/* Author Info - Responsive layout */}
                <div className="border-t border-border pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                  {/* Author details */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-xs sm:text-sm md:text-base leading-tight">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-tight break-words">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Project tag */}
                  <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-muted px-2 sm:px-3 py-1 w-fit">
                    <UserCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 flex-shrink-0" /> 
                    <span className="text-xs sm:text-xs font-medium uppercase tracking-wide text-muted-foreground truncate max-w-[120px] sm:max-w-none">
                      {testimonial.project}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section - Responsive layout */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="rounded-2xl sm:rounded-3xl border border-primary/30 bg-primary/10 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
              <div className="flex-1 space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
                  See how we enable energy access at scale
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-primary/80 leading-relaxed">
                  Read through case studies, metrics, and deployment models tailored for utilities, municipalities, and enterprise estates.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button 
                  
                  size="lg" 
                  className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
                >
                  Explore impact stories
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
