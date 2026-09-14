'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Hero } from '@/components/ui/hero';
import { FadeIn } from '@/components/animations/FadeIn';
import { aboutSections } from '@/lib/data/about-data';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';

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
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary">
            {showAnniversary ? ANNIVERSARY_2026.title : 'Who We Are'}
          </span>
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

        {/* ── Card grid ──────────────────────────────────────── */}
        <section className="mt-8 md:mt-12">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
            Discover More
          </span>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Dive deeper
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {aboutSections.map((section, i) => (
              <FadeIn key={section.href} delay={i * 0.06} className="h-full">
                <Link
                  href={section.href}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={section.image || '/placeholder.svg'}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 text-sm font-extrabold tabular-nums leading-none text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="text-base font-extrabold tracking-tight text-foreground md:text-lg">
                        {section.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                        {section.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Journey feature (editorial band) ───────────────── */}
        <FadeIn>
          <Link href="/journey" className="group mt-16 block md:mt-24">
            <div className="relative overflow-hidden bg-primary px-6 py-10 text-primary-foreground transition-shadow duration-500 hover:shadow-2xl md:px-12 md:py-14">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/10 blur-3xl" />
              <div className="relative">
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
            </div>
          </Link>
        </FadeIn>
      </Container>
    </>
  );
}
