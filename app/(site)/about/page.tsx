'use client';

import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from '@/components/ui/image';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Hero } from '@/components/ui/hero';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import { aboutSections } from '@/lib/data/about-data';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';
import { cn } from '@/lib/utils';

// Two columns on desktop, filled column by column (01–04, then 05–07).
const LINK_ROWS = Math.ceil(aboutSections.length / 2);

export default function AboutPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'About Us' }];
  const showAnniversary = isAnniversaryYear2026();

  const aboutImages = aboutSections.map(section => ({
    src: section.image.split('?')[0],
    alt: section.title,
  }));

  return (
    <>
      <Hero
        image={aboutImages}
        title="About ACOB Lighting"
        description="Nigeria's Energy Access Revolution."
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6 md:mb-8" />

        {/* ── Standfirst ─────────────────────────────────────── */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>
            {showAnniversary ? ANNIVERSARY_2026.title : 'Who We Are'}
          </SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            ACOB Lighting Technology Limited delivers dependable solar energy
            infrastructure to rural and peri-urban communities across Nigeria —
            helping local businesses, health facilities, and households thrive
            on sustainable power.
          </p>
          {showAnniversary && (
            <p className="mt-5 max-w-[70ch] text-lg leading-relaxed text-muted-foreground">
              {ANNIVERSARY_2026.summary} We celebrate 10 years of impact and
              look forward to many more — lighting up lives and shaping a
              brighter future.
            </p>
          )}
        </div>

        {/* ── Links — the same numbered index as Services and /contact ── */}
        <section aria-labelledby="about-links" className="mt-8 md:mt-12">
          <SectionEyebrow>Discover more</SectionEyebrow>
          <h2
            id="about-links"
            className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Dive deeper
          </h2>

          <ul
            className="mt-8 grid lg:auto-cols-fr lg:grid-flow-col lg:grid-rows-[repeat(var(--rows),auto)] lg:gap-x-14"
            style={{ '--rows': LINK_ROWS } as React.CSSProperties}
          >
            {aboutSections.map((section, i) => (
              <li
                key={section.href}
                className={cn(
                  'border-b border-border',
                  i === 0 && 'border-t',
                  // Top rule on the first row of the second column.
                  i === LINK_ROWS && 'lg:border-t',
                )}
              >
                <FadeIn delay={i * 0.06}>
                  <Link
                    href={section.href}
                    className="group relative grid grid-cols-[1.75rem_4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[2.5rem_6rem_minmax(0,1fr)_auto] sm:gap-5"
                  >
                    {/* Fill sweeping in from the left on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-primary/[0.06] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <span className="relative text-sm font-extrabold tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Mini card — decorative; the title carries the meaning. */}
                    <span
                      aria-hidden
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border transition-all duration-500 group-hover:-rotate-2 group-hover:shadow-lg group-hover:ring-primary/40"
                    >
                      <Image
                        src={section.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="6rem"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </span>
                    <span className="relative min-w-0">
                      <span className="block text-base font-extrabold uppercase leading-tight tracking-tight text-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary lg:text-lg">
                        {section.title}
                      </span>
                      <span className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {section.description}
                      </span>
                    </span>
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:h-10 sm:w-10">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Journey feature — the anniversary piece, after the links ── */}
        <FadeIn>
          <Link
            href="/journey"
            className="group mt-16 block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:mt-24"
          >
            <div className="relative grid overflow-hidden bg-primary text-primary-foreground transition-shadow duration-500 hover:shadow-2xl md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/10 blur-3xl" />
              <div className="relative px-6 py-10 md:px-12 md:py-14">
                <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary-foreground/90">
                  <Sparkles className="h-3.5 w-3.5" />
                  New · {ANNIVERSARY_2026.period}
                </span>
                <h2 className="mt-4 max-w-[18ch] text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
                  The Journey — a decade of light
                </h2>
                <p className="mt-4 max-w-[56ch] text-primary-foreground/90">
                  Step into a full-screen, twelve-chapter experience of ACOB
                  Lighting&apos;s ten-year story. No brochure — just light,
                  motion, and the milestones that shaped us.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 border-b-2 border-primary-foreground pb-1 text-sm font-bold transition-all group-hover:gap-3">
                  Enter the experience
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              {/* The experience's opening shot, so the band previews it */}
              <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto">
                <Image
                  src="/images/journey/slide-01-hero.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Blend the photo's left edge into the green */}
                <div className="absolute inset-0 hidden bg-gradient-to-r from-primary via-primary/20 to-transparent md:block" />
              </div>
            </div>
          </Link>
        </FadeIn>
      </Container>
    </>
  );
}
