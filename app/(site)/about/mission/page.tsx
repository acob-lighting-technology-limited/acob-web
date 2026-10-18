'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { getAboutSectionByHref, milestones } from '@/lib/data/about-data';
import { FadeIn } from '@/components/animations/FadeIn';
import { COMPANY_STATS } from '@/lib/constants/app.constants';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

const MISSION_COMMITMENTS = [
  'To rapidly deploy mini-grids to underdeveloped and underserved populations in Nigeria, impacting the lives of over 5 million Nigerians by 2030.',
  'Providing clean, affordable and reliable energy to unserved and underserved communities through isolated and interconnected mini-grids.',
  'Deploying high-density LED and solar street-lighting infrastructure that meets the best standards.',
  'Using renewable energy as a catalyst to solving the decade of energy poverty in Nigeria and Sub-Saharan Africa.',
  'Creating a sustainable future in line with the global Sustainable Development Goals (SDG-7).',
  'Deployment of 2 million all-in-one streetlights across all geopolitical zones by 2029.',
  'Building communal resilience through the use of renewable energy.',
];

const STRATEGIC_PILLARS = [
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

const MISSION_METRICS = [
  {
    label: 'People to Impact',
    value: `${(COMPANY_STATS.peopleToImpact / 1000000).toFixed(0)}M+`,
  },
  {
    label: 'All-in-One Streetlights',
    value: `${(COMPANY_STATS.streetlights / 1000000).toFixed(0)}M`,
  },
  {
    label: 'Mini-Grid Deployments',
    value: `${COMPANY_STATS.miniGridDeployments}+`,
  },
  {
    label: 'Renewable Capacity',
    value: `${COMPANY_STATS.renewableEnergyCapacityMW} MW`,
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
        description="Power for Five Million."
        image={aboutSection?.image || '/images/about/mission-vision.webp'}
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* ── Standfirst ─────────────────────────────────────── */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>The mandate — by 2030</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            ACOB exists to close Nigeria&apos;s energy gap — deploying clean,
            bankable power to the communities the grid forgot.
          </p>
        </div>

        {/* ── Vision & Mission ───────────────────────────────── */}
        <section className="mt-10 grid gap-10 border-t border-border pt-10 md:mt-14 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <SectionEyebrow>Our Vision</SectionEyebrow>
            <p className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-3xl">
              To be a flagship renewable energy company in Nigeria, driven by
              innovation.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <SectionEyebrow>Our Mission</SectionEyebrow>
            <p className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-3xl">
              To deploy over 150 mini-grids, impacting the lives of over 5
              million Nigerians by 2030.
            </p>
          </FadeIn>
        </section>

        {/* ── Metrics stat band ──────────────────────────────── */}
        <section className="mt-16 border-y border-border py-10 md:mt-24 md:py-12">
          <SectionEyebrow>Targets by 2030</SectionEyebrow>
          <dl className="mt-6 grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {MISSION_METRICS.map((metric, i) => (
              <FadeIn key={metric.label} delay={i * 0.08}>
                <div className="border-l border-border pl-4 md:pl-6">
                  <dt className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground md:text-5xl">
                    {metric.value}
                  </dt>
                  <dd className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {metric.label}
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </section>

        {/* ── Mission statement (the commitments) ────────────── */}
        <section className="mt-16 md:mt-24">
          <SectionEyebrow>Our Mission Statement</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Seven commitments
          </h2>

          <div className="mt-8 border-t border-border">
            {MISSION_COMMITMENTS.map((commitment, i) => (
              <FadeIn
                key={commitment}
                delay={i * 0.06}
                className="grid grid-cols-[48px_1fr] gap-x-5 border-b border-border py-6 md:grid-cols-[72px_1fr] md:gap-x-8"
              >
                <div className="text-2xl font-extrabold leading-none tabular-nums text-primary md:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="max-w-[68ch] text-lg leading-relaxed text-foreground">
                  {commitment}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Strategic pillars ──────────────────────────────── */}
        <section className="mt-16 md:mt-24">
          <SectionEyebrow>Strategic Pillars</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
            How we deliver
          </h2>

          <div className="mt-8 border-t border-border">
            {STRATEGIC_PILLARS.map((pillar, i) => (
              <FadeIn
                key={pillar.title}
                delay={i * 0.08}
                className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-border py-7 md:grid-cols-[80px_1fr] md:py-9"
              >
                <div className="text-3xl font-extrabold leading-none tabular-nums text-primary md:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="max-w-[64ch]">
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pillar.outcomes.map(outcome => (
                      <span
                        key={outcome}
                        className="rounded-full border border-border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Milestones timeline ────────────────────────────── */}
        <section className="mt-16 md:mt-24">
          <SectionEyebrow>Strategic Inflection Points</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Milestones that shaped our growth
          </h2>

          <div className="mt-8 border-t border-border">
            {milestones.map((milestone, i) => (
              <FadeIn
                key={milestone.year}
                delay={i * 0.06}
                className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-border py-7 md:grid-cols-[160px_1fr] md:py-9"
              >
                <div className="text-3xl font-extrabold leading-none tabular-nums tracking-tight text-primary md:text-4xl">
                  {milestone.year}
                </div>
                <div className="max-w-[64ch]">
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="mb-8 mt-16 text-center md:mt-20">
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
