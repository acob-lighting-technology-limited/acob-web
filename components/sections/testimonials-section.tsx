'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  project: string;
  image?: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    position: 'CEO',
    company: 'Green Energy Solutions Ltd',
    content:
      'ACOB Lighting transformed our energy infrastructure with their innovative mini-grid solution. The project was completed on time and exceeded our expectations. Our energy costs have reduced by 60% since implementation.',
    rating: 5,
    project: 'Mini-Grid Installation',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Operations Manager',
    company: 'Nigerian Manufacturing Co.',
    content:
      'The captive power system installed by ACOB has been running flawlessly for over 18 months. Their professional energy audit helped us identify significant savings opportunities. Highly recommended!',
    rating: 5,
    project: 'Captive Power System',
    verified: true,
  },
  {
    id: 3,
    name: 'Aisha Mohammed',
    position: 'Director',
    company: 'Community Development Initiative',
    content:
      'ACOB Lighting brought reliable electricity to our rural community for the first time. Their commitment to sustainable development and community engagement is outstanding. The impact has been life-changing.',
    rating: 5,
    project: 'Community Solar Project',
    verified: true,
  },
  {
    id: 4,
    name: 'David Okonkwo',
    position: 'Facility Manager',
    company: 'Lagos Industrial Complex',
    content:
      'The energy audit conducted by ACOB revealed inefficiencies we never knew existed. Their recommendations saved us ₦15 million annually. The team is professional, knowledgeable, and reliable.',
    rating: 5,
    project: 'Energy Audit & Optimization',
    verified: true,
  },
  {
    id: 5,
    name: 'Grace Williams',
    position: 'Project Coordinator',
    company: 'Sustainable Development NGO',
    content:
      'Working with ACOB Lighting on our solar street lighting project was a pleasure. They delivered quality work, maintained excellent communication, and completed the project under budget.',
    rating: 5,
    project: 'Solar Street Lighting',
    verified: true,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-muted/50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied
            clients have to say about their experience with ACOB Lighting
            Technology Limited.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote className="h-12 w-12" />
              </div>

              {/* Testimonial Content */}
              <div className="mb-6">
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  &quot;{currentTestimonial.content}&quot;
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(currentTestimonial.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {currentTestimonial.rating}/5
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.position}, {currentTestimonial.company}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {currentTestimonial.project}
                    </Badge>
                    {currentTestimonial.verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Verified Client
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-primary'
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-muted-foreground">Support Available</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
