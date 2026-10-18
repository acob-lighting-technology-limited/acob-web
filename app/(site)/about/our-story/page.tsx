'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { aboutLeadershipQuotes } from '@/lib/data/about-overview-data';
import { CoreValuesSection } from '@/components/sections/core-values-section';
import { COMPANY_STATS } from '@/lib/constants/app.constants';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

const ERAS = [
  {
    year: '2016',
    title: 'The beginning',
    body: 'ACOB Lighting Technology Limited was established with a pioneering focus on large-scale LED street lighting — delivering rollout programs across 23 states and maintaining 25 kilometres of critical infrastructure, from the National Stadium to the Airport City Gate, for the FCDA and state governments.',
  },
  {
    year: '2018',
    title: 'The pivot to solar',
    body: 'Recognizing the urgency of energy poverty, we transitioned into solar EPC and hybrid mini-grid development. As early partners of the Rural Electrification Agency’s pilot program, we combined local knowledge with global engineering standards to build bankable clean energy assets.',
  },
  {
    year: 'Today',
    title: 'The mission continues',
    body: 'Our teams work across Nigeria delivering productive-use systems that power agro-processing, markets, health centres, and community facilities — each supported by robust financing, responsive O&M, and digital monitoring for long-term reliability.',
  },
];

export default function OurStoryPage() {
  const showAnniversary = isAnniversaryYear2026();
  const quote = aboutLeadershipQuotes[0];
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Story' },
  ];

  const stats = [
    { value: '2016', label: 'Founded' },
    { value: `${COMPANY_STATS.staffStrength}+`, label: 'Team members' },
    {
      value: `${COMPANY_STATS.communitiesServed}+`,
      label: 'Communities served',
    },
    {
      value: `${COMPANY_STATS.projectsCompleted}+`,
      label: 'Projects commissioned',
    },
  ];

  return (
    <>
      <Hero
        title="Our Story"
        description="From Streetlights to Solar Grids."
        image="/images/about/our-story.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* ── Standfirst (dek under the hero headline) ───────── */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>Est. 2016 — Abuja, Nigeria</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            A decade spent turning energy poverty into productive power — one
            community, one grid, one milestone at a time.
          </p>
        </div>

        {/* ── Timeline (chronological — dates carry meaning) ──── */}
        <section className="mt-10 border-t border-border pt-8 md:mt-14 md:pt-10">
          <SectionEyebrow>The arc so far</SectionEyebrow>
          <div className="mt-8 border-t border-border">
            {ERAS.map((era, i) => (
              <FadeIn
                key={era.year}
                delay={i * 0.1}
                className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-border py-8 md:grid-cols-[180px_1fr] md:py-12"
              >
                <div className="text-4xl font-extrabold leading-none tabular-nums tracking-tight text-primary md:text-5xl">
                  {era.year}
                </div>
                <div className="max-w-[62ch]">
                  <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                    {era.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {era.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Pull quote ─────────────────────────────────────── */}
        <FadeIn>
          <figure className="mt-16 border-l-4 border-primary pl-6 md:mt-24 md:pl-10">
            <blockquote className="max-w-[24ch] text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl md:max-w-[20ch]">
              “{quote.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-foreground">
                {quote.name}
              </span>
              <span className="text-muted-foreground"> — {quote.role}</span>
            </figcaption>
          </figure>
        </FadeIn>

        {/* ── Stat band ──────────────────────────────────────── */}
        <section className="mt-16 border-y border-border py-10 md:mt-24 md:py-12">
          <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="border-l border-border pl-4 md:pl-6">
                  <dt className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground md:text-5xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </section>

        {/* ── Anniversary block ──────────────────────────────── */}
        {showAnniversary && (
          <FadeIn>
            <aside className="mt-16 grid grid-cols-1 items-center gap-6 border-y-[3px] border-foreground py-10 md:mt-24 md:grid-cols-[auto_1fr] md:gap-12 md:py-12">
              <div className="flex items-start leading-none">
                <span className="text-7xl font-extrabold tabular-nums tracking-tight text-primary md:text-8xl lg:text-9xl">
                  10
                </span>
                <span className="ml-1 mt-2 text-lg font-bold uppercase tracking-wide text-primary md:text-xl">
                  yrs
                </span>
              </div>
              <div>
                <SectionEyebrow>{ANNIVERSARY_2026.title}</SectionEyebrow>
                <p className="mt-3 max-w-[62ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {ANNIVERSARY_2026.extendedSummary}
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                  {ANNIVERSARY_2026.period} • {ANNIVERSARY_2026.tagline}
                </p>
              </div>
            </aside>
          </FadeIn>
        )}

        <div className="mt-20 md:mt-28">
          <CoreValuesSection />
        </div>

        {/* ── Journey CTA (editorial band) ───────────────────── */}
        <FadeIn>
          <Link href="/journey" className="group mt-16 block md:mt-24">
            <div className="relative overflow-hidden bg-primary px-6 py-10 text-primary-foreground transition-shadow duration-500 hover:shadow-2xl md:px-12 md:py-14">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary-foreground/90">
                  <Sparkles className="h-3.5 w-3.5" />
                  Experience it
                </span>
                <h3 className="mt-4 max-w-[16ch] text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
                  Prefer to feel the story?
                </h3>
                <p className="mt-4 max-w-[52ch] text-primary-foreground/90">
                  Step into The Journey — a full-screen, twelve-chapter
                  cinematic retelling of our decade of impact.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 border-b-2 border-primary-foreground pb-1 text-sm font-bold transition-all group-hover:gap-3">
                  Enter the experience
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </FadeIn>

        <div className="mb-8 mt-12 text-center">
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
