'use client';
import Link from 'next/link';
import { ArrowLeft, Users, Lightbulb, Grid3x3, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { SectionHeader } from '@/components/ui/section-header';
import { getAboutSectionByHref, milestones } from '@/lib/data/about-data';
import { FadeIn } from '@/components/animations/FadeIn';

const strategicPillars = [
  {
    title: 'Reliable Infrastructure',
    description:
      'We engineer bankable solar mini-grids, storage systems, and hybrid energy solutions designed for productive use and long-term performance.',
    outcomes: [
      'Predictable uptime',
      'Scalable modular design',
      'Data-driven O&M',
    ],
  },
  {
    title: 'Inclusive Community Impact',
    description:
      'Our energy access programs are co-created with local leaders, enabling micro-enterprises, healthcare, and education to flourish.',
    outcomes: [
      'Productive use financing',
      'Capacity building',
      'Gender-responsive programs',
    ],
  },
  {
    title: 'Sustainable Partnerships',
    description:
      'We collaborate with investors, policy makers, and technology partners to unlock capital and accelerate energy inclusion.',
    outcomes: [
      'Impact-aligned finance',
      'Policy advocacy',
      'Integrated stakeholder engagement',
    ],
  },
];

import { COMPANY_INFO } from '@/lib/constants';

const missionMetrics = [
  {
    icon: Users,
    label: 'People to Impact',
    value: `${(COMPANY_INFO.stats.peopleToImpact / 1000000).toFixed(0)}M+`,
  },
  {
    icon: Lightbulb,
    label: 'All-in-One Streetlights',
    value: `${(COMPANY_INFO.stats.streetlights / 1000000).toFixed(0)}M`,
  },
  {
    icon: Grid3x3,
    label: 'Mini-Grid Deployments',
    value: `${COMPANY_INFO.stats.miniGridDeployments}+`,
  },
  {
    icon: Zap,
    label: 'Renewable Energy Capacity',
    value: `${COMPANY_INFO.stats.renewableEnergyCapacityMW} MW`,
  },
];

export default function MissionPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Mission & Vision' },
  ];

  const aboutSection = getAboutSectionByHref('/about/mission');

  return (
    <>
      <Hero
        title="Mission & Vision"
        description="Building Resilient Energy Infrastructure"
        image={aboutSection?.image || '/images/about/mission-vision.webp'}
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <section className="mb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] ">
          <Card className="space-y-6 rounded-3xl border border-border bg-surface p-4 sm:p-6 xl:p-8 shadow-sm h-fit">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-lg font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Mission & Vision
            </span>
            <div className="space-y-4">
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-4 sm:p-5 xl:p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Our Vision
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  To be a flagship renewable energy company in Nigeria, driven
                  by innovations.
                </p>
              </div>

              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-4 sm:p-5 xl:p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Our Mission
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  To deploy 100 Micro-Grids impacting the lives of over 5
                  million Nigerians by 2030.
                </p>
              </div>

              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-4 sm:p-5 xl:p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Our Mission Statement
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      To rapidly deploy mini-grids to underdeveloped and
                      underserved populace in Nigeria which will be impacting
                      the lives of over 5 million Nigerians by 2030.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      Providing clean, affordable & reliable energy to unserved
                      & underserved communities in Nigeria through isolated &
                      interconnected mini-grids.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      To carry out the deployment of high-density LED & solar
                      street-lighting infrastructure that meets best standards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      Using renewable energy as a catalyst to solving the decade
                      of energy poverty in Nigeria and Sub-Saharan Africa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      Creating a sustainable future in line with the global
                      Sustainable Development Goals (SDG-7).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      Deployment of 2 million all-in-one across all geopolitical
                      zones by 2029.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      Building communal resilience through the use of renewable
                      energy.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-border bg-surface p-4 sm:p-6 xl:p-8 shadow-sm">
              <CardContent className="flex flex-col gap-4 px-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Mission Metrics - Targets by 2030
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {missionMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <FadeIn
                        key={metric.label}
                        delay={index * 0.15}
                        direction="up"
                        className="h-full"
                      >
                        <div className="group flex items-start gap-2 sm:gap-3 rounded-2xl border border-border bg-muted/30 p-2 sm:p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer h-full">
                          <div className="relative rounded-full bg-primary/10 p-2 sm:p-3 overflow-hidden transition-all duration-500 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                            <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 transition-colors duration-500 text-muted-foreground group-hover:text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-base font-medium text-foreground">
                              {metric.value}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              {metric.label}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border bg-surface p-4 sm:p-6 xl:p-8 shadow-sm">
              <CardContent className="px-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Strategic Pillars
                </h3>
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

        <section className="mb-16 rounded-3xl border border-border bg-surface p-4 sm:p-6 xl:p-8 shadow-sm">
          <SectionHeader
            badge="Strategic Inflection Points"
            title="Milestones that shaped our growth"
            className="mb-8"
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map(milestone => {
              const IconComponent = LucideIcons[
                milestone.icon as keyof typeof LucideIcons
              ] as React.ComponentType<{ className?: string }>;

              return (
                <Card
                  key={milestone.year}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 overflow-hidden transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                        <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                        {IconComponent && (
                          <IconComponent className="h-6 w-6 relative z-10 text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground" />
                        )}
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {milestone.year}
                      </span>
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-foreground transition-colors duration-500 group-hover:text-primary">
                      {milestone.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* <section className="mb-16 rounded-3xl border border-border bg-surface p-4 sm:p-6 xl:p-8 shadow-sm">
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
              <Card className="h-full rounded-3xl border border-border bg-surface p-6 shadow-sm">
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
        </section> */}

        <div className="mt-12 mb-8 text-center">
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
