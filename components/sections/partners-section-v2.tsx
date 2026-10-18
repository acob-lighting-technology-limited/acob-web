'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import Image from '@/components/ui/image';
import { partners, type Partner } from '@/lib/data/partners-data';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import { getBlurDataURL } from '@/lib/utils/image-optimization';

/**
 * Every logo sits on its own tile so it reads in both themes: white by default,
 * dark for the few logos drawn in white.
 */
function LogoTile({ partner }: { partner: Partner }) {
  return (
    <div
      className={cn(
        'flex h-20 w-44 items-center justify-center rounded-xl px-5 ring-1 transition-shadow duration-300 hover:shadow-md sm:h-24 sm:w-52',
        partner.logoOnDark
          ? 'bg-zinc-900 ring-white/10'
          : 'bg-white ring-black/5 dark:ring-white/10',
      )}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={120}
        height={60}
        className="max-h-12 w-auto object-contain sm:max-h-14"
        loading="lazy"
        quality={75}
        placeholder="blur"
        blurDataURL={getBlurDataURL()}
      />
    </div>
  );
}

export function PartnersSectionV2() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-muted/30 py-12 transition-all duration-500 sm:py-16 lg:py-20 xl:py-24">
      <Container className="px-4">
        <FadeIn delay={0.1}>
          <div className="mb-10 text-center md:mb-14">
            <SectionEyebrow>Trusted Partnerships</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Powering Progress Together
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              Collaborating with leading organizations and government agencies
              across Nigeria and beyond.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-5 border-y border-border py-10">
            <div ref={marqueeRef} className="relative w-full overflow-hidden">
              <Marquee
                speed={40}
                gradient={false}
                loop={0}
                direction="left"
                pauseOnHover={true}
                className="relative z-0"
              >
                {partners
                  .slice(0, Math.ceil(partners.length / 2))
                  .map((partner, idx) => (
                    <div
                      key={idx}
                      data-logo-index={idx}
                      className="flex items-center justify-center px-3 sm:px-4"
                    >
                      <LogoTile partner={partner} />
                    </div>
                  ))}
              </Marquee>
            </div>

            <div className="relative w-full overflow-hidden">
              <Marquee
                speed={40}
                gradient={false}
                loop={0}
                direction="right"
                pauseOnHover={true}
                className="relative z-0"
              >
                {partners
                  .slice(Math.ceil(partners.length / 2))
                  .map((partner, idx) => (
                    <div
                      key={`second-half-${idx}`}
                      data-logo-index={Math.ceil(partners.length / 2) + idx}
                      className="flex items-center justify-center px-3 sm:px-4"
                    >
                      <LogoTile partner={partner} />
                    </div>
                  ))}
              </Marquee>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center sm:mt-12">
            <Link
              href="/about/partners"
              className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold text-foreground transition-all hover:gap-3 hover:border-primary hover:text-primary"
            >
              View All Partners
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
