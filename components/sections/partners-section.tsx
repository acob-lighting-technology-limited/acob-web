'use client';

import { useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { partners } from '@/lib/data/partners-data';
import { FadeIn } from '@/components/animations/FadeIn';
import { getBlurDataURL } from '@/lib/utils/image-optimization';

export function PartnersSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="border-b border-border-[0.5px] bg-muted/30 py-12 sm:py-16 lg:py-20 xl:py-24 transition-all duration-500">
      <Container className="px-4">
        <FadeIn delay={0.2}>
          <div className="text-center mb-8 sm:mb-12 space-y-3">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Trusted Partnerships
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground transition-colors duration-500">
              Powering Progress Together
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto transition-colors duration-500">
              Collaborating with leading organizations and government agencies
              across Nigeria
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="space-y-16">
            {/* First half: Left to Right */}
            <div ref={marqueeRef} className="relative w-full overflow-hidden">
              <Marquee
                speed={40}
                gradient={false}
                loop={0}
                direction="left"
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
                      <div className="relative opacity-80 hover:opacity-100 transition-opacity duration-500">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={100}
                          height={75}
                          className="h-12 sm:h-14 md:h-16 w-auto"
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

            {/* Second half: Right to Left */}
            <div className="relative w-full overflow-hidden">
              <Marquee
                speed={40}
                gradient={false}
                loop={0}
                direction="right"
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
                      <div className="relative opacity-80 hover:opacity-100 transition-opacity duration-500">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={100}
                          height={75}
                          className="h-12 sm:h-14 md:h-16 w-auto"
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
      </Container>
    </section>
  );
}
