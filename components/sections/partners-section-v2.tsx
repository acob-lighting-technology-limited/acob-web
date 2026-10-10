'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import { partners } from '@/lib/data/partners-data';
import { FadeIn } from '@/components/animations/FadeIn';
import { getBlurDataURL } from '@/lib/utils/image-optimization';
import { MaskWords } from '@/components/animations/MaskWords';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export function PartnersSectionV2() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="border-b border-border-[0.5px] bg-muted/30 py-12 transition-all duration-500 sm:py-16 lg:py-20 xl:py-24">
      <Container className="px-4">
        <FadeIn delay={0.1}>
          <div className="mb-10 text-center md:mb-14">
            <SectionEyebrow>Trusted Partnerships</SectionEyebrow>
            <MaskWords
              as="h2"
              text="Powering Progress Together"
              className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl"
            />
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              Collaborating with leading organizations and government agencies
              across Nigeria and beyond.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-16 border-y border-border py-10">
            <div
              ref={marqueeRef}
              className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
            >
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
                      className="flex items-center justify-center px-10 sm:px-16"
                    >
                      <div className="relative opacity-70 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={100}
                          height={75}
                          className="h-12 w-auto sm:h-14 md:h-16"
                          loading="lazy"
                          quality={75}
                          placeholder="blur"
                          blurDataURL={getBlurDataURL()}
                        />
                      </div>
                    </div>
                  ))}
              </Marquee>
            </div>

            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
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
                      className="flex items-center justify-center px-10 sm:px-16"
                    >
                      <div className="relative opacity-70 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={100}
                          height={75}
                          className="h-12 w-auto sm:h-14 md:h-16"
                          loading="lazy"
                          quality={75}
                          placeholder="blur"
                          blurDataURL={getBlurDataURL()}
                        />
                      </div>
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
