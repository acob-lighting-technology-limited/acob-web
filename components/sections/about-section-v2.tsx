'use client';

import Link from 'next/link';
import Image from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '../animations/FadeIn';
import { SectionEyebrow } from '../animations/SectionEyebrow';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';

// What we focus on, not how we deliver it — the Services section covers that.
const focusAreas = [
  {
    title: 'Community electrification',
    description:
      'Design-build-operate models for rural communities integrating solar PV, storage, and productive-use assets.',
  },
  {
    title: 'Commercial solar programs',
    description:
      'Hybrid systems that stabilize operations for manufacturing, healthcare, telecom, and public infrastructure.',
  },
  {
    title: 'Capacity building',
    description:
      'Training technicians, project owners, and community operatives to maintain sustainable energy assets.',
  },
];

/** "Who we are": the company intro, its focus areas, and the field team. */
export function AboutSectionV2() {
  const showAnniversary = isAnniversaryYear2026();

  return (
    <section className="relative overflow-hidden bg-primary py-12 text-primary-foreground sm:py-16 lg:py-20 xl:py-24">
      {/* Soften the flat saturated green with a little depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

      <Container className="relative px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <FadeIn delay={0.1}>
            <div>
              <SectionEyebrow tone="light">Who we are</SectionEyebrow>
              <h2 className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
                ACOB Lighting Technology<span className="opacity-70">.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base text-primary-foreground/90 md:text-lg">
                A Nigerian-born company powering homes, industries, and
                governments with dependable renewable energy systems. From
                strategy to implementation, our team manages every stage of the
                clean energy lifecycle.
              </p>

              {showAnniversary && (
                <p className="mt-4 max-w-xl text-base text-primary-foreground/80 md:text-lg">
                  {ANNIVERSARY_2026.extendedSummary}
                </p>
              )}

              <div className="mt-8 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
                {focusAreas.map((area, i) => (
                  <div
                    key={area.title}
                    className="grid grid-cols-[2.25rem_1fr] gap-x-4 py-4"
                  >
                    <span className="text-sm font-extrabold tabular-nums text-primary-foreground/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-primary-foreground md:text-lg">
                        {area.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-primary-foreground/85">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
                <Image
                  src="/images/company-team.webp"
                  alt="ACOB Lighting field engineers on-site"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-5 text-sm text-white/95 md:p-7 md:text-base">
                  Skilled engineers nationwide, building climate-resilient
                  systems that power households, schools, hospitals, and
                  enterprise hubs.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link href="/about" className="inline-flex">
                  <Button
                    size="lg"
                    className="w-full border-2 border-white/70 bg-transparent px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-white hover:text-primary"
                  >
                    Learn about us
                  </Button>
                </Link>
                <Link href="/contact" className="inline-flex">
                  <Button
                    size="lg"
                    className="w-full bg-white px-8 py-6 text-base font-semibold text-primary hover:bg-white/90"
                  >
                    Discuss your energy roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
