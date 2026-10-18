'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { partners } from '@/lib/data/partners-data';
import { FadeIn } from '@/components/animations/FadeIn';
import { getBlurDataURL } from '@/lib/utils/image-optimization';
import { Handshake, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface Partner {
  slug: string;
  name: string;
  fullName?: string;
  category: string;
  logo: string;
  logoOnDark?: boolean;
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <FadeIn delay={0.05 + index * 0.03} direction="up">
      <div
        className="group relative h-full min-h-[160px] perspective-1000 cursor-pointer w-full"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-700 transform-style-3d',
            isFlipped ? 'rotate-y-180' : 'group-hover:rotate-y-180',
          )}
        >
          {/* Front — logo */}
          {/* Same tiles as the home page: white, or dark for white-ink logos */}
          <div
            className={cn(
              'absolute inset-0 flex h-full items-center justify-center rounded-lg border backface-hidden transition-colors duration-300 hover:border-primary/50',
              partner.logoOnDark
                ? 'border-white/10 bg-zinc-900'
                : 'border-border bg-white',
            )}
          >
            <div className="relative flex h-full w-full items-center justify-center p-3">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={150}
                height={100}
                className="h-auto w-full max-w-[120px] object-contain"
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
              />
            </div>
          </div>

          {/* Back — description */}
          <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-2 rotate-y-180 border border-primary/40 bg-primary/5 p-3 text-center backface-hidden sm:p-4 rounded-lg">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">
              {partner.category}
            </span>
            <h3 className="px-2 text-sm font-semibold leading-tight text-foreground sm:text-base">
              {partner.fullName || partner.name}
            </h3>
            <Link
              href={`/about/partners/${partner.slug}`}
              className="mt-auto p-1 text-xs font-semibold text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function PartnersPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Partners' },
  ];

  const infraCreditPartner = partners.find(p => p.name === 'InfraCredit');

  return (
    <>
      <Hero
        title="Our Partners"
        description="Stronger Together."
        image="/images/about/partners-collage.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>Strategic collaborations</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            We collaborate with leading organizations, government agencies, and
            technology providers to deliver sustainable energy solutions across
            Nigeria.
          </p>
        </div>

        {/* InfraCredit featured band */}
        {infraCreditPartner && (
          <FadeIn>
            <Card className="mt-12 w-full max-w-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background md:mt-16">
              <CardContent className="w-full max-w-full overflow-hidden p-0">
                <div className="grid w-full max-w-full grid-cols-1 gap-0 lg:grid-cols-[3fr_2fr]">
                  <div className="order-2 w-full p-6 sm:p-8 lg:order-1 lg:flex lg:h-full lg:items-center lg:p-10">
                    <div className="relative aspect-video w-full max-w-full min-h-[250px] overflow-hidden rounded-lg bg-muted/50 sm:min-h-[300px] lg:aspect-auto lg:h-full lg:min-h-[400px]">
                      <div className="absolute inset-0 h-full w-full max-w-full overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/C6S2Qj-Dsc0"
                          className="absolute left-0 top-0 h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          title="ACOB & InfraCredit Partnership Video"
                        />
                      </div>
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 bg-primary/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-primary-foreground">
                        <Video className="h-3 w-3" />
                        Partnership Video
                      </span>
                    </div>
                  </div>

                  <div className="order-1 flex flex-col justify-center p-6 sm:p-8 lg:order-2 lg:p-10">
                    <SectionEyebrow>Featured Partnership</SectionEyebrow>
                    <div className="relative mb-6 mt-4 h-16 w-auto">
                      <Image
                        src={infraCreditPartner.logo}
                        alt={infraCreditPartner.name}
                        width={200}
                        height={80}
                        className="h-full w-auto object-contain"
                        quality={90}
                      />
                    </div>
                    <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      ACOB &amp; InfraCredit Partnership
                    </h2>
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                      Discover how our strategic partnership with InfraCredit is
                      enabling sustainable energy access across rural Nigeria
                      through innovative green infrastructure financing.
                      Together, we&apos;re scaling solar mini-grid solutions and
                      empowering communities with reliable, clean energy.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Handshake className="h-4 w-4 text-primary" />
                      <span>
                        Strategic Infrastructure Financing Partnership
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {/* All partners */}
        <section className="mt-16 md:mt-24">
          <SectionEyebrow>Trusted collaborators</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl">
            Partners &amp; alliances
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.slug} partner={partner} index={index} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
