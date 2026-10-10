'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import { Button, Container } from '@/components/ui';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { servicesData } from '@/lib/data';
import { MaskWords } from '../animations/MaskWords';
import { Magnetic } from '../animations/Magnetic';
import { SectionEyebrow } from '../animations/SectionEyebrow';

const EASE = [0.22, 1, 0.36, 1] as const;
const LIST_COUNT = 6;

/**
 * Desktop: an index of services as large numbered rows. Hovering a row brings
 * up that service's photo, which follows the cursor on a spring. Phones keep a
 * swipeable card carousel, since there is no hover.
 */
const ServicesSection = React.memo(function ServicesSection() {
  const services = useMemo(() => servicesData.slice(0, LIST_COUNT), []);
  const [active, setActive] = useState<number | null>(null);

  // Floating preview position, relative to the list.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(py, { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <section className="relative overflow-hidden border-b border-border-[0.5px] bg-[radial-gradient(circle_at_top,_rgba(8,_145,_63,_0.07),_transparent_55%)] py-16 sm:py-20 lg:py-24 xl:py-28 dark:bg-zinc-950">
      <Container className="px-4">
        {/* Header */}
        <div className="mb-10 grid gap-8 md:mb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <SectionEyebrow>What we do</SectionEyebrow>
            <MaskWords
              as="h2"
              text="Integrated Energy for Every Scale."
              className="mt-3 max-w-xl text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl"
            />
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

        {/* Desktop: hover index with a cursor-following photo */}
        <div
          className="relative hidden md:block"
          onPointerMove={e => {
            const r = e.currentTarget.getBoundingClientRect();
            // Follow the cursor, kept to the right half of the list. The rows
            // render above the photo, so titles stay readable over it.
            const x = e.clientX - r.left;
            px.set(Math.min(Math.max(x, r.width * 0.5), r.width - 300));
            py.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setActive(null)}
        >
          <motion.ul
            className="relative z-10 border-t border-border"
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
                  className="relative border-b border-border"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="group grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-6 py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:py-8"
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
                    <div className="relative min-w-0">
                      <h3
                        className={cn(
                          'text-2xl font-extrabold uppercase tracking-tight transition-all duration-500 lg:text-4xl',
                          on ? 'translate-x-3 text-primary' : 'text-foreground',
                        )}
                      >
                        {service.title}
                      </h3>
                      <div
                        className={cn(
                          'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                          on
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <p className="max-w-2xl overflow-hidden pl-3 pt-2 text-sm text-muted-foreground lg:text-base">
                          {service.excerpt}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500',
                        on
                          ? 'rotate-45 border-primary bg-primary text-primary-foreground'
                          : 'border-border text-foreground',
                      )}
                    >
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Floating preview — decorative; the row link carries the meaning. */}
          <motion.div
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative ml-8 -mt-[9rem] h-[18rem] w-[14rem] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 xl:h-[20rem] xl:w-[16rem]"
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active}
                      initial={{ clipPath: 'inset(100% 0 0 0)' }}
                      animate={{ clipPath: 'inset(0% 0 0 0)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={services[active]?.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="16rem"
                        className="object-cover brightness-[0.65] saturate-[0.85]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Phones: swipeable cards */}
        <div className="md:hidden">
          <Carousel opts={{ containScroll: false }}>
            <CarouselContent className="-ml-4">
              {services.map(service => (
                <CarouselItem key={service.slug} className="basis-[85%] pl-4">
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
                        <span className="absolute bottom-3 left-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/90">
                          {service.category ?? 'Renewable Solutions'}
                        </span>
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
            <CarouselDots className="mt-6" />
          </Carousel>
        </div>
      </Container>
    </section>
  );
});

export { ServicesSection };
