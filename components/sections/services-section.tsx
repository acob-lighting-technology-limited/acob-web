'use client';

// React and Next.js imports

import React, { useMemo } from 'react';

import Link from 'next/link';

// Third-party library imports
import { ArrowRight } from 'lucide-react';

// UI component imports
import { Button, Container, Card, CardContent } from '@/components/ui';
import Image from 'next/image';

// Local component imports
import { MaskText } from '../animations/MaskText';

// Data imports
import { servicesData } from '@/lib/data';

const ServicesSection = React.memo(function ServicesSection() {
  const primaryServices = useMemo(() => servicesData.slice(0, 3), []);
  const additionalServices = useMemo(() => servicesData.slice(3, 6), []);

  return (
    <section className="border-b border-border bg-[radial-gradient(circle_at_top,_rgba(8,_145,_63,_0.07),_transparent_55%)] py-20 transition-colors duration-700 dark:bg-zinc-950">
      <Container className="px-4">
        <div className="mb-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="space-y-6">
            <MaskText
              phrases={["Integrated renewable energy for every scale"]}
              className="text-3xl font-semibold leading-tight md:text-4xl"
            />
            <MaskText
              phrases={["Our multidisciplinary team supports governments, developers, and operators with end-to-end solar, hybrid mini-grid, and clean energy infrastructure. From concept to long term O&M, we help you unlock reliable, efficient power."]}
              className="max-w-xl text-lg text-muted-foreground"
            />
            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <Button size="lg" className="px-8 py-6 text-base">
                  View all services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base"
                >
                  Partner with us
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {additionalServices.map(service => (
              <div
                key={service.slug as string}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl"
              >
                <div className="relative h-16 w-36 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={service.icon || service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {service.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {primaryServices.map(service => (
            <Card
              key={service.slug as string}
              className="group flex h-full flex-col overflow-hidden border border-border bg-card/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image || '/placeholder.svg'}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                <div className="absolute bottom-4 left-4 text-sm font-medium uppercase tracking-wide text-white/80">
                  {service.category ?? 'Renewable Solutions'}
                </div>
              </div>

              <CardContent className="flex flex-1 flex-col p-8">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold leading-snug text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {service.fullDescription ?? service.excerpt}
                  </p>
                </div>

                {Array.isArray(service.features) && service.features.length > 0 && (
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {service.features.slice(0, 4).map(feature => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8">
                  <Link href={`/services/${service.slug}`}>
                    <Button size="lg" variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      See solution details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
});

export { ServicesSection };
