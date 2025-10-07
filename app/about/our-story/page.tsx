import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { MaskText } from '@/components/animations/MaskText';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { PageHero } from '@/components/ui/page-hero';
import { Timeline, TimelineMobile } from '@/components/ui/timeline';
import {
  aboutLeadershipQuotes,
  aboutMediaFeatures,
} from '@/lib/data/about-overview-data';
import { milestones } from '@/lib/data/about-data';

export default function OurStoryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Story' },
  ];

  return (
    <>
      <PageHero
        title="A Journey Fueled by Community-Centered Innovation"
        eyebrow="Our Story"
        backgroundImage="/images/about/acob-team.webp?height=800&width=1600"
      >
        <p className="max-w-3xl text-balance text-lg text-white/90 md:text-xl">
          From street lighting origins to hybrid mini-grids and productive-use energy
          hubs, ACOB Lighting grows by listening to communities and delivering bankable
          infrastructure that evolves with their needs.
        </p>
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-10" />

        <section className="mb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Foundations
            </span>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              <MaskText phrases={["ACOB's Journey to Powering Rural Communities"]} />
                </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                ACOB Lighting Technology Limited was established in 2016 with a pioneering
                focus on large-scale LED street lighting. We delivered rollout programs
                across 23 states, maintaining 25 kilometres of critical lighting
                infrastructure from the National Stadium to the Airport City Gate for the
                FCDA and state governments.
              </p>
              <p>
                Recognizing the urgency of energy poverty, we transitioned into solar EPC
                and hybrid mini-grid development in 2018. As early partners of the Rural
                Electrification Agency&apos;s pilot program, we combined local knowledge with
                global engineering standards to build bankable clean energy assets.
              </p>
              <p>
                Today our teams work across Nigeria delivering productive-use systems that
                power agro-processing, markets, health centres, and community facilities.
                Each project is supported by robust financing structures, responsive O&M,
                and digital monitoring to ensure long-term reliability.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-primary/30 bg-primary/5 p-8 text-foreground">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Leadership Perspective
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {aboutLeadershipQuotes[0].quote}
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground">
                  {aboutLeadershipQuotes[0].name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {aboutLeadershipQuotes[0].role}
                </p>
              </div>
            </Card>

            <Card className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-foreground">Quick Facts</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: 'Founded', value: '2016' },
                    { label: 'Staff Strength', value: '75+' },
                    { label: 'Communities Served', value: '100+' },
                    { label: 'Projects Commissioned', value: '50+' },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {item.value}
                    </p>
                  </div>
                  </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="mb-16 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Strategic Inflection Points
            </span>
            <h3 className="text-3xl font-semibold text-foreground md:text-4xl">
              Milestones that shaped our growth
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Each stage in our evolution has expanded the scale, reliability, and impact
              of the energy infrastructure we deliver across Nigeria.
            </p>
              </div>
           
                <div className="hidden md:block">
                  <Timeline items={milestones} />
                </div>
                <div className="md:hidden">
                  <TimelineMobile items={milestones} />
                </div>
        </section>

        <section className="mb-16 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Project Highlights
            </span>
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
              Delivering infrastructure that accelerates local economies
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              From hybrid mini-grids to smart lighting and commercial hybrid systems, our
              portfolio reflects the trust of communities, investors, and government
              partners.
            </p>
          </div>

          <div className="grid gap-6">
            {aboutMediaFeatures.slice(0, 2).map(feature => (
              <Card
                key={feature.title}
                className="group overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                    </div>
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{feature.category}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span>{feature.year}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
              </CardContent>
            </Card>
            ))}
          </div>
        </section>

        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <p className="text-lg text-muted-foreground">
            Want to learn more about how we deliver sustainable energy access?
          </p>
          <Link href="/about">
            <Button variant="default" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to About Overview
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
