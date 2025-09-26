"use client";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { MaskText } from '@/components/animations/MaskText';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { coreValues } from '@/lib/data/mission-data';

const strategicPillars = [
  {
    title: 'Reliable Infrastructure',
    description:
      'We engineer bankable solar mini-grids, storage systems, and hybrid energy solutions designed for productive use and long-term performance.',
    outcomes: ['Predictable uptime', 'Scalable modular design', 'Data-driven O&M'],
  },
  {
    title: 'Inclusive Community Impact',
    description:
      'Our energy access programs are co-created with local leaders, enabling micro-enterprises, healthcare, and education to flourish.',
    outcomes: ['Productive use financing', 'Capacity building', 'Gender-responsive programs'],
  },
  {
    title: 'Sustainable Partnerships',
    description:
      'We collaborate with investors, policy makers, and technology partners to unlock capital and accelerate energy inclusion.',
    outcomes: ['Impact-aligned finance', 'Policy advocacy', 'Integrated stakeholder engagement'],
  },
];

const missionMetrics = [
  {
    label: 'People to Impact by 2030',
    value: '5M+',
  },
  {
    label: 'All-in-One Streetlights by 2029',
    value: '2M',
  },
  {
    label: 'Mini-Grid Deployments',
    value: '150+',
  },
];

export default function MissionPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Mission & Vision' },
  ];

  return (
    <>
      <PageHero
        title="Mission & Vision"
        eyebrow="Our Commitment"
        backgroundImage="/images/about/mission-vision.png?height=800&width=1600"
        align="center"
      >
        <p className="mx-auto max-w-3xl text-balance text-lg text-white/90 md:text-xl">
          We build resilient energy infrastructure that connects communities to the
          opportunities, services, and livelihoods powered by reliable electricity.
        </p>
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <section className="mb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Vision
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                <MaskText phrases={['Our Vision for Energy Equity']} />
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                To be Nigeria's flagship renewable energy partner—delivering resilient,
                technology-driven power systems that expand economic opportunity while
                safeguarding the environment for future generations.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8">
              <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We deploy scalable mini-grids, hybrid systems, and smart lighting solutions
                that deliver clean, reliable, and affordable energy to underserved
                communities. Through innovation, partnerships, and inclusive programs we
                empower five million people by 2030.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-0">
                <h3 className="text-lg font-semibold text-foreground">Mission Metrics</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {missionMetrics.map(metric => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-border bg-muted/20 p-4"
                    >
                      <p className="text-2xl font-semibold text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-foreground">Strategic Pillars</h3>
                <div className="mt-4 space-y-4">
                  {strategicPillars.map(pillar => (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-border bg-muted/20 p-4"
                    >
                      <h4 className="text-base font-semibold text-foreground">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {pillar.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pillar.outcomes.map(outcome => (
                          <span
                            key={outcome}
                            className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                          >
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="mb-16">
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-gradient-to-r from-primary to-primary-dark p-10 text-white lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                Our Core Values
              </span>
              <h3 className="text-3xl font-semibold md:text-4xl">Principles that steer every project</h3>
              <p className="text-base leading-relaxed text-white/85">
                These values guide our engineering, community engagement, and partnership
                decisions—ensuring consistency, accountability, and positive impact.
              </p>
            </div>
            <div className="space-y-4">
              {coreValues.map(value => (
                <div
                  key={value.title}
                  className="flex items-start gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur"
                >
                  <div className="rounded-full bg-white/20 p-3 text-white">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold uppercase tracking-[0.2em]">
                      {value.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Mission in Action
            </span>
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
              Programs translating vision into real outcomes
            </h3>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
              From minigrid rollouts to street lighting initiatives, our mission comes to
              life through diverse project portfolios tailored to each region.
            </p>
          </div>

          <AutoCarousel
            items={strategicPillars}
            renderItem={(pillar: typeof strategicPillars[0]) => (
              <Card className="h-full rounded-3xl border border-border bg-card/80 p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-foreground">{pillar.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.outcomes.map(outcome => (
                    <span
                      key={outcome}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </Card>
            )}
          />
        </section>

        <div className="mb-8 text-center">
          <Link href="/about">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to About Overview
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
