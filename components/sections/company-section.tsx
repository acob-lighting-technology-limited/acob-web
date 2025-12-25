'use client';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskText } from '../animations/MaskText';
import { FadeIn } from '../animations/FadeIn';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AnimatedFillText } from '../ui/animated-fill-text';

const impactHighlights = [
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

const missionStatements = [
  'We are a Nigerian-born company advancing equitable energy access through robust renewable infrastructure.',
  'Our field teams, engineers, and financing partners work hand-in-hand to deliver energy security and economic opportunity.',
  'By coupling technology with local insights, we deploy solutions that perform in the toughest operating environments.',
];

export function CompanySection() {
  return (
    <section className="relative overflow-hidden bg-background transition-all duration-500 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(24,_24,_27,_0.04),_transparent_55%)]" />

      <Container className="relative px-4">
        {/* Header Section - Responsive */}
        <FadeIn delay={0.2}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-2xl">
                <MaskText phrases={['Why trust']} className="" />

                {/* <MaskText
                  phrases={['ACOB Lighting']}
                  className=" bg-foreground text-white dark:text-primary  p-2 w-fit"
                /> */}
                <AnimatedFillText>
                  <h1>ACOB Lighting?</h1>
                </AnimatedFillText>
              </div>
              <Link
                href="/about"
                className="hidden sm:inline-flex  w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                >
                  Learn about our leadership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Main Content Grid - Responsive */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:grid-cols-2">
          {/* Left Column - Mission & Capabilities */}
          <FadeIn delay={0.3}>
            <div className="space-y-6 sm:space-y-8 order-2 xl:order-1">
              {/* Mission Statements */}
              <div className="space-y-3">
                {missionStatements.map(statement => (
                  <MaskText
                    key={statement}
                    phrases={[statement]}
                    className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground"
                  />
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex sm:hidden w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                >
                  Learn about our leadership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {/* Strategic Capabilities Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-border bg-card/80 p-4 sm:p-6 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl">
                <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide text-primary mb-3 sm:mb-4">
                  Strategic capabilities
                </h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="group rounded-xl sm:rounded-2xl border border-border bg-background/60 p-3 sm:p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                      Advisory & development
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Feasibility, ESG impact studies, regulatory navigation,
                      and project structuring.
                    </p>
                  </div>
                  <div className="group rounded-xl sm:rounded-2xl border border-border bg-background/60 p-3 sm:p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                      Engineering & operations
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      EPC delivery, asset management, remote monitoring, and
                      lifecycle optimisation.
                    </p>
                  </div>
                </div>
              </div>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/projects" className="inline-flex flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:flex-1 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                  >
                    Explore our impact case studies
                  </Button>
                </Link>
                <Link href="/contact" className="inline-flex flex-1">
                  <Button
                    size="lg"
                    className="w-full sm:flex-1 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                  >
                    Discuss your energy roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Image & Impact Highlights */}
          <FadeIn delay={0.4}>
            <div className="space-y-6 sm:space-y-8 order-1 xl:order-2">
              {/* Company Image */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card/90 shadow-xl">
                <Image
                  src="/images/company-team.webp"
                  alt="ACOB Lighting field engineers on-site"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 rounded-xl sm:rounded-2xl bg-background/80 p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl">
                  We deploy skilled engineers nationwide, building
                  climate-resilient micro-grids that power households, schools,
                  and enterprise hubs.
                </div>
              </div>

              {/* Impact Highlights Grid */}
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                {impactHighlights.map((highlight, index) => (
                  <FadeIn
                    key={highlight.title}
                    delay={index * 0.15}
                    direction="up"
                  >
                    <div className="group h-full flex flex-col rounded-xl sm:rounded-2xl border border-border bg-card/80 p-3 sm:p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                      <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                        {highlight.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                        {highlight.description}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
