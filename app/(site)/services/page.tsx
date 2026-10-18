'use client';

import { useState, useEffect, useMemo } from 'react';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { servicesData } from '@/lib/data';
import Image from '@/components/ui/image';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import { cn } from '@/lib/utils';

/**
 * A card left alone on the last row spans the row instead, laid out side by
 * side so it doesn't become one giant photo. Tablet rows hold 2, desktop 3.
 * Class names stay literal so Tailwind can see them.
 */
function wideCard(index: number, count: number) {
  const last = index === count - 1;
  const aloneSm = last && count % 2 === 1;
  const aloneLg = last && count % 3 === 1;
  return {
    cell: cn(
      aloneSm && 'sm:col-span-2',
      aloneLg ? 'lg:col-span-3' : aloneSm && 'lg:col-span-1',
    ),
    article: cn(
      aloneSm && 'sm:flex-row',
      aloneLg ? 'lg:flex-row' : aloneSm && 'lg:flex-col',
    ),
    image: cn(
      aloneSm && 'sm:aspect-auto sm:w-1/2 sm:min-h-[16rem]',
      aloneLg
        ? 'lg:aspect-auto lg:w-1/2 lg:min-h-[18rem]'
        : aloneSm && 'lg:aspect-[16/10] lg:w-full lg:min-h-0',
    ),
    body: cn(
      aloneSm && 'sm:justify-center md:p-8',
      !aloneLg && aloneSm && 'lg:justify-start lg:p-5',
    ),
  };
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(servicesData);

  useEffect(() => {
    let filtered = servicesData;
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredServices(filtered);
  }, [searchQuery]);

  const handleClearSearch = () => setSearchQuery('');

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Services' }];

  const serviceImages = useMemo(
    () =>
      servicesData.map(service => ({ src: service.image, alt: service.title })),
    [],
  );

  return (
    <>
      <Hero
        image={serviceImages}
        title="Our Services"
        description="Clean Energy, End to End."
        titleSize="display"
      />

      <Container className="px-4 py-8">
        {/* Breadcrumb + Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <div className="relative w-full sm:w-96">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-11 border-2 bg-background pl-10 pr-10 transition-all duration-300 focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-muted"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Standfirst */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>What we do</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            End-to-end renewable energy — from feasibility and engineering to
            installation and long-term O&amp;M, delivered across Nigeria.
          </p>
        </div>

        {/* Search result count */}
        {searchQuery && (
          <p className="mt-8 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredServices.length}
            </span>{' '}
            service{filteredServices.length !== 1 ? 's' : ''} found for{' '}
            <span className="font-semibold text-foreground">
              &ldquo;{searchQuery}&rdquo;
            </span>
          </p>
        )}

        {/* Grid */}
        {filteredServices.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-2xl font-bold tracking-tight">
              No services found
            </h3>
            <p className="mb-6 text-muted-foreground">
              Try adjusting your search terms or browse all services.
            </p>
            <Button onClick={handleClearSearch}>
              <X className="mr-2 h-4 w-4" />
              View All Services
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {filteredServices.map((service, index) => {
              const wide = wideCard(index, filteredServices.length);
              return (
                <FadeIn
                  key={service.id}
                  delay={index * 0.06}
                  direction="up"
                  className={cn('h-full', wide.cell)}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article
                      className={cn(
                        'flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg',
                        wide.article,
                      )}
                    >
                      <div
                        className={cn(
                          'relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted',
                          wide.image,
                        )}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div
                        className={cn(
                          'flex flex-1 flex-col p-4 md:p-5',
                          wide.body,
                        )}
                      >
                        <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2 md:text-lg">
                          {service.title}
                        </h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                          {service.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                          See solution
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
