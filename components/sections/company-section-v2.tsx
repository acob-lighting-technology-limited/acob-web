'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '../animations/FadeIn';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AnimatedFillText } from '../ui/animated-fill-text';
import { Magnetic } from '../animations/Magnetic';
import { ScrollWordReveal } from '../animations/ScrollWordReveal';
import { SectionEyebrow } from '../animations/SectionEyebrow';

const EASE = [0.22, 1, 0.36, 1] as const;

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

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

const capabilities = [
  {
    title: 'Advisory & development',
    description:
      'Feasibility, ESG impact studies, regulatory navigation, and project structuring.',
  },
  {
    title: 'Engineering & operations',
    description:
      'EPC delivery, asset management, remote monitoring, and lifecycle optimisation.',
  },
];

export function CompanySectionV2() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  // Photo drifts inside its frame as the page scrolls.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className="relative overflow-hidden bg-background py-12 transition-all duration-500 sm:py-16 lg:py-20 xl:py-24">
      <Container className="relative px-4">
        {/* Header */}
        <FadeIn delay={0.1}>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-14">
            <div>
              <SectionEyebrow>Why ACOB</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Why Trust{' '}
                <AnimatedFillText className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-4xl lg:text-5xl">
                  ACOB Lighting?
                </AnimatedFillText>
              </h2>
            </div>
            <Magnetic className="hidden sm:inline-block">
              <Link href="/about" className="inline-flex">
                <Button size="lg" className="group px-8 py-6 text-base">
                  Learn about our leadership
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </Magnetic>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — mission + capabilities */}
          <FadeIn delay={0.15}>
            <div>
              {/* Mission reads itself as you scroll through it */}
              <ScrollWordReveal
                text={missionStatements.join(' ')}
                className="text-lg font-medium leading-relaxed text-foreground md:text-2xl md:leading-snug"
                dim={0.15}
              />

              <Link href="/about" className="mt-6 inline-flex sm:hidden">
                <Button size="lg" className="px-8 py-6 text-base">
                  Learn about our leadership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <div className="mt-8 border-t border-border pt-6">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-primary">
                  Strategic capabilities
                </span>
                <motion.div
                  className="mt-4 divide-y divide-border border-y border-border"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                >
                  {capabilities.map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      variants={rowVariants}
                      className="group grid grid-cols-[36px_1fr] gap-x-4 py-5 transition-colors hover:bg-primary/[0.04]"
                    >
                      <span className="text-sm font-extrabold tabular-nums text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-foreground md:text-lg">
                          {cap.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {cap.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/projects" className="inline-flex flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full px-8 py-6 text-base"
                  >
                    Explore our impact case studies
                  </Button>
                </Link>
                <Link href="/contact" className="inline-flex flex-1">
                  <Button size="lg" className="w-full px-8 py-6 text-base">
                    Discuss your energy roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Right — image + impact highlights */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              {/* The unclipped wrapper is what's observed — a clip-path on the
                  observed element itself reads as 0% visible, so it would
                  never trigger. */}
              <motion.div
                ref={imageRef}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border"
                  variants={{
                    hidden: { clipPath: 'inset(0 0 100% 0 round 16px)' },
                    show: {
                      clipPath: 'inset(0 0 0% 0 round 16px)',
                      transition: { duration: 1.2, ease: EASE },
                    },
                  }}
                >
                  <motion.div
                    className="absolute inset-[-8%_0]"
                    style={{ y: imageY }}
                  >
                    <Image
                      src="/images/company-team.webp"
                      alt="ACOB Lighting field engineers on-site"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 p-4 text-sm text-white/95 md:p-6">
                    We deploy skilled engineers nationwide, building
                    climate-resilient micro-grids that power households,
                    schools, and enterprise hubs.
                  </p>
                </motion.div>
              </motion.div>

              <div className="divide-y divide-border border-y border-border">
                {impactHighlights.map((highlight, i) => (
                  <FadeIn key={highlight.title} delay={i * 0.1}>
                    <div className="py-5">
                      <h4 className="text-base font-bold text-foreground md:text-lg">
                        {highlight.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
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
