'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button, Container } from '@/components/ui';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { servicesData } from '@/lib/data';
import { FadeIn } from '../animations/FadeIn';
import { Magnetic } from '../animations/Magnetic';
import { SectionEyebrow } from '../animations/SectionEyebrow';

const EASE = [0.22, 1, 0.36, 1] as const;
const LIST_COUNT = 6;

/**
 * Desktop: a compact two-column index of numbered rows, each with a small
 * photo card and a one-line excerpt. Phones keep a swipeable card carousel.
 */
const ServicesSection = React.memo(function ServicesSection() {
  const services = useMemo(() => servicesData.slice(0, LIST_COUNT), []);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-background bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.07),_transparent_55%)] py-16 sm:py-20 lg:py-24 xl:py-28">
      <Container className="px-4">
        {/* Header */}
        <div className="mb-10 grid gap-8 md:mb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <SectionEyebrow>What we do</SectionEyebrow>
            <FadeIn delay={0.1}>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-4xl lg:text-5xl text-foreground">
                Integrated Energy for Every Scale.
              </h2>
            </FadeIn>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              From concept to long-term O&amp;M, we help governments,
              developers, and operators unlock reliable, efficient power.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap gap-4 lg:justify-end"
          >
            <Magnetic>
              <Link href="/services" className="inline-block min-h-[48px]">
                <Button
                  size="lg"
                  className="group min-h-[48px] px-8 py-6 text-base"
                >
                  View all services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </Magnetic>
            <Link href="/contact" className="inline-block min-h-[48px]">
              <Button
                size="lg"
                variant="outline"
                className="min-h-[48px] px-8 py-6 text-base"
              >
                Partner with us
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Desktop: numbered index with a mini photo card per row */}
        <div
          className="relative hidden md:block"
          onPointerLeave={() => setActive(null)}
        >
          {/* Fills column by column, so the numbers read 01–03, then 04–06. */}
          <motion.ul
            className="grid auto-cols-fr grid-flow-col gap-x-10 lg:gap-x-14"
            style={{
              gridTemplateRows: `repeat(${Math.ceil(services.length / 2)}, auto)`,
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {services.map((service, i) => {
              const on = active === i;
              return (
                <motion.li
                  key={service.slug}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: EASE },
                    },
                  }}
                  className={cn(
                    'relative border-b border-border',
                    // Top rule on the first row of each column.
                    (i === 0 || i === Math.ceil(services.length / 2)) &&
                      'border-t',
                  )}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="group grid grid-cols-[2rem_4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4 lg:grid-cols-[2.5rem_5.5rem_minmax(0,1fr)_auto] lg:gap-5 lg:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:py-8"
                  >
                    {/* Fill sweeping in from the left on hover */}
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute inset-0 origin-left bg-primary/[0.06] transition-transform duration-500 ease-out',
                        on ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                    <span
                      className={cn(
                        'relative text-sm font-extrabold tabular-nums transition-colors duration-300',
                        on ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Mini card — decorative; the title carries the meaning. */}
                    <span
                      aria-hidden
                      className={cn(
                        'relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border transition-all duration-500',
                        on ? '-rotate-2 shadow-lg ring-primary/40' : '',
                      )}
                    >
                      <Image
                        src={service.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="5.5rem"
                        className={cn(
                          'object-cover transition-transform duration-700 ease-out',
                          on ? 'scale-110' : 'scale-100',
                        )}
                      />
                    </span>
                    <div className="relative min-w-0">
                      <h3
                        className={cn(
                          'text-base font-extrabold uppercase leading-tight tracking-tight transition-all duration-500 line-clamp-2 lg:text-lg',
                          on ? 'translate-x-1 text-primary' : 'text-foreground',
                        )}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {service.excerpt}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 lg:h-10 lg:w-10',
                        on
                          ? 'rotate-45 border-primary bg-primary text-primary-foreground'
                          : 'border-border text-foreground',
                      )}
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Phones: swipeable cards */}
        <div className="md:hidden">
          <Carousel
            opts={{ align: 'start', containScroll: 'trimSnaps' }}
            className="-mr-4"
          >
            <CarouselContent className="-ml-4">
              {services.map(service => (
                <CarouselItem key={service.slug} className="basis-[82%] pl-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        <Image
                          src={service.image || '/placeholder.svg'}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="85vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                          {service.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                          See solution
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-4 pr-4" />
          </Carousel>
        </div>
      </Container>
    </section>
  );
});

export { ServicesSection };
