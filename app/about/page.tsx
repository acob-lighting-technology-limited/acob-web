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

  // Images from about sub-routes
  const aboutImages = [
    { src: '/images/about/acob-team.webp', alt: 'ACOB Team' },
    { src: '/images/about/mission-vision.webp', alt: 'Our Mission & Vision' },
    { src: '/images/company-team.webp', alt: 'Our Company' },
  ];

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

        {/* <section className="mb-20 rounded-3xl border border-border bg-card/80 p-4 sm:p-6 xl:p-8 shadow-sm">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Project Portfolio
                  </span>
            <h3 className="text-3xl font-semibold text-foreground md:text-4xl">
              Proven delivery across productive-use mini-grids
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Our track record spans commercial estates, government programs, rural
              communities, and industrial clients. We deliver dependable power that keeps
              businesses running and families connected.
            </p>
                </div>

          <AutoCarousel
            items={aboutMediaFeatures}
            renderItem={(item: typeof aboutMediaFeatures[0]) => (
              <Card className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{item.category}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span>{item.year}</span>
              </div>
                  <h4 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )}
          />
        </section> */}

        <section className="mb-10">
          <SectionHeader
            badge="Discover More"
            title="Dive deeper into our story, mission, and operations"
            className="mb-8"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutSections.map(section => (
              <Link key={section.href} href={section.href}>
                <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={section.image || '/placeholder.svg'}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-4 p-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {section.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                    <Button variant="default" className="w-full mt-auto">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
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
