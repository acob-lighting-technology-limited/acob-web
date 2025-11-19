'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MaskText } from '@/components/animations/MaskText';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeroCarousel } from '@/components/ui/page-hero-carousel';
import { SectionHeader } from '@/components/ui/section-header';
import { aboutSections } from '@/lib/data/about-data';

export default function AboutPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'About Us' }];

  // Images from about sub-routes - use the same images as the cards
  const aboutImages = aboutSections.map(section => ({
    src: section.image.split('?')[0], // Remove query params if any
    alt: section.title,
  }));

  return (
    <>
      <PageHeroCarousel
        images={aboutImages}
        title="About ACOB Lighting"
        description="Pioneering Nigeria's Energy Access Revolution with Sustainable Solar Solutions"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <section className="mb-20 rounded-3xl border border-border bg-surface p-4 sm:p-6 xl:p-8 shadow-sm backdrop-blur">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              <MaskText
                phrases={["Pioneering Nigeria's Energy Access Revolution"]}
              />
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              ACOB Lighting Technology Limited delivers dependable solar energy
              infrastructure to rural and peri-urban communities across Nigeria.
              We help local businesses, health facilities, and households thrive
              with sustainable power solutions.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeader
            badge="Discover More"
            title="Dive deeper into our story, mission, and operations"
            className="mb-8"
          />

          <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutSections.map(section => (
              <Link key={section.href} href={section.href}>
                <Card className="group flex h-full flex-col overflow-hidden rounded-xl md:rounded-3xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square md:aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={section.image || '/placeholder.svg'}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-2 md:gap-4 p-3 md:p-4">
                    <div className="flex-1">
                      <h4 className="text-sm md:text-lg font-semibold text-foreground line-clamp-2">
                        {section.title}
                      </h4>
                      <p className="mt-1 md:mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-none">
                        {section.description}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      className="w-full mt-auto text-xs md:text-sm py-2 md:py-2.5 h-auto"
                    >
                      <span className="hidden md:inline">Learn More</span>
                      <span className="md:hidden">More</span>
                      <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
