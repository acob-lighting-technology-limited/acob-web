/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

'use client';

import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { partners } from '@/lib/data/partners-data';
import { FadeIn } from '@/components/animations/FadeIn';

export function PartnersSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateCenterLogo = () => {
      if (!marqueeRef.current) {
        return;
      }

      const marqueeContainer = marqueeRef.current.querySelector(
        '[class*="marquee-container"]'
      );
      if (!marqueeContainer) {
        return;
      }

      const logos = marqueeContainer.querySelectorAll('[data-logo-index]');
      const containerRect = marqueeRef.current.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      logos.forEach(logo => {
        const rect = logo.getBoundingClientRect();
        const logoCenter = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - logoCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = parseInt(logo.getAttribute('data-logo-index') || '0');
        }
      });

      setCenterIndex(closestIndex);
    };

    const interval = setInterval(updateCenterLogo, 100);
    updateCenterLogo();

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-border-[0.5px] bg-muted/30 py-12 sm:py-16 transition-all duration-500">
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
          <div
            ref={marqueeRef}
            className="relative w-full overflow-hidden rounded-2xl bg-muted/30 dark:bg-muted/70 py-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-52 z-10 bg-gradient-to-r from-background/80 via-background/40 to-transparent dark:from-muted/80 dark:via-muted/40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-52 z-10 bg-gradient-to-l from-background/80 via-background/40 to-transparent dark:from-muted/80 dark:via-muted/40"
            />
            <Marquee
              speed={40}
              gradient={false}
              loop={0}
              className="relative z-0"
            >
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  data-logo-index={idx}
                  className="flex items-center justify-center px-10 sm:px-16"
                >
                  <div className="relative opacity-80 hover:opacity-100 transition-opacity duration-500">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="h-12 sm:h-16 w-auto"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
