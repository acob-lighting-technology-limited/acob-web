'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MaskText } from '@/components/animations/MaskText';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHero } from '@/components/ui/page-hero';
import { aboutSections } from '@/lib/data/about-data';
import {
  aboutImpactMetrics,
  aboutHighlights,
  aboutLeadershipQuotes,
  aboutMediaFeatures,
} from '@/lib/data/about-overview-data';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'About Us' }];

  return (
    <>
      <PageHero
        title="Lighting Nigeria with Trusted Solar Infrastructure"
        eyebrow="About ACOB Lighting"
        align="center"
        backgroundImage="/images/about/acob-team.webp?height=800&width=1600"
      >
        <p className="mx-auto max-w-3xl text-balance text-lg text-white/90 md:text-xl">
          We are a vertically integrated renewable energy company delivering
          solar mini-grids, industrial hybrid systems, and smart lighting
          solutions that power economic inclusion across Nigeria.
        </p>
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <section className="mb-20 rounded-3xl border border-border bg-card/80 p-10 shadow-sm backdrop-blur">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Our Purpose
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              <MaskText
                phrases={["Pioneering Nigeria's Energy Access Revolution"]}
              />
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              ACOB Lighting Technology Limited accelerates inclusive economic growth
              by delivering dependable solar energy infrastructure to rural and
              peri-urban communities. We close the energy gap with solutions tailored
              for productive use, helping local businesses, health facilities, and
              households thrive.
            </p>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-border bg-gradient-to-br from-background via-background to-primary/5 p-10 shadow-sm">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Our Journey
            </span>
            <h3 className="text-3xl font-semibold text-foreground">
              From street lighting pioneers to national solar infrastructure partner
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Founded in 2016, ACOB Lighting began by delivering large-scale LED
                street lighting and maintenance projects across 23 states in Nigeria.
                These early contracts built the field expertise, supply chain
                partnerships, and technical rigor that underpin our renewable energy
                practice today.
              </p>
              <p>
                In 2018 we pivoted to off-grid and interconnected solar mini-grid
                systems, becoming one of the pioneer developers in the Rural
                Electrification Agency&apos;s pilot program. Our EPC teams now deploy
                productive-use solar systems for markets, health centres, agro-processors,
                and commercial estates.
              </p>
              <p>
                With an in-house engineering and O&M team of 75+ specialists, we can
                commission a 15 kWp EPC project within 2–3 weeks. Our financing
                partnerships and data-driven asset monitoring ensure long-term reliability
                and community impact wherever we operate.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-sm">
              <h4 className="text-lg font-semibold text-foreground">Impact Snapshot</h4>
              <p className="mt-3 text-sm text-muted-foreground">
                Our infrastructure powers inclusive growth across Nigeria&apos;s rural and
                peri-urban communities.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {aboutImpactMetrics.map((metric: typeof aboutImpactMetrics[0]) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-border/70 bg-surface p-4 shadow-sm"
                  >
                    <div className="text-3xl font-semibold text-foreground">
                      {metric.value}
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="flex flex-col gap-4 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-foreground">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Impact Quote
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {aboutLeadershipQuotes[0].quote}
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {aboutLeadershipQuotes[0].name}
                </p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {aboutLeadershipQuotes[0].role}
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              What Sets Us Apart
            </span>
            <h3 className="text-3xl font-semibold text-foreground md:text-4xl">
              Our integrated capabilities deliver bankable energy assets
            </h3>
            <p className="max-w-3xl text-lg text-muted-foreground">
              From project origination to long-term operations, we de-risk energy access
              projects with robust governance, in-house engineering, and community-focused
              service delivery.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aboutHighlights.map((highlight: typeof aboutHighlights[0]) => (
              <Card
                key={highlight.title}
                className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <highlight.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">
                      {highlight.title}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {highlight.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
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
        </section>

        <section className="mb-10">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Discover More
            </span>
            <h3 className="text-2xl font-semibold text-foreground">
              Dive deeper into our story, mission, and operations
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutSections.map(section => (
              <Link key={section.href} href={section.href}>
                <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={section.image || '/placeholder.svg'}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {section.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-auto inline-flex items-center justify-center gap-2 border-primary/40 text-sm"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
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
