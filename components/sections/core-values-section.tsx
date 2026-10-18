'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { coreValues } from '@/lib/data/mission-data';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

const INTRO =
  'These values guide our engineering, community engagement, and partnership decisions — ensuring consistency, accountability, and positive impact.';

interface CoreValuesSectionProps {
  variant?: 'editorial' | 'minimal';
}

export function CoreValuesSection({
  variant = 'editorial',
}: CoreValuesSectionProps) {
  if (variant === 'minimal') {
    return (
      <section className="mx-auto max-w-4xl">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.34em] text-muted-foreground">
          Our Core Values
        </span>
        <h2 className="mt-3 text-3xl font-light leading-[1.1] tracking-tight text-foreground md:text-4xl">
          Principles that <b className="font-bold">steer every project</b>
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
          {INTRO} We call it{' '}
          <b className="font-semibold text-foreground">CLAP</b>.
        </p>

        <div className="mt-10">
          {coreValues.map((value, i) => (
            <FadeIn
              key={value.title}
              delay={i * 0.08}
              className="border-t border-border py-7 [&:last-child]:border-b"
            >
              <h3 className="flex items-baseline gap-x-1">
                <span className="font-extralight leading-none text-primary text-5xl sm:text-6xl">
                  {value.title.charAt(0)}
                </span>
                <span className="text-lg font-light uppercase tracking-[0.15em] text-foreground sm:text-xl md:text-2xl">
                  {value.title.slice(1)}
                </span>
              </h3>
              <p className="mt-3 max-w-[62ch] leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>
    );
  }

  // Editorial
  return (
    <section>
      <SectionEyebrow>Our Core Values — C·L·A·P</SectionEyebrow>
      <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
        Principles that steer every project
      </h2>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
        {INTRO} An ethos we call{' '}
        <b className="font-bold text-foreground">CLAP</b>.
      </p>

      <div className="mt-8 border-t border-border">
        {coreValues.map((value, i) => (
          <FadeIn
            key={value.title}
            delay={i * 0.08}
            className="border-b border-border py-6 md:py-8"
          >
            <h3 className="flex items-baseline gap-x-1 sm:gap-x-1.5">
              <span className="font-extrabold leading-none tracking-tighter text-primary text-[3.5rem] sm:text-7xl md:text-8xl">
                {value.title.charAt(0)}
              </span>
              <span className="text-xl font-extrabold uppercase tracking-[0.08em] text-foreground sm:text-2xl md:text-3xl">
                {value.title.slice(1)}
              </span>
            </h3>
            <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">
              {value.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
