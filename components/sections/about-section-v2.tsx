'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ClipboardCheck,
  Cog,
  LineChart,
  Wrench,
} from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskWords } from '../animations/MaskWords';
import { Magnetic } from '../animations/Magnetic';
import { ScrollWordReveal } from '../animations/ScrollWordReveal';
import { SectionEyebrow } from '../animations/SectionEyebrow';
import { SpotlightCard } from '../animations/SpotlightCard';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';

const EASE = [0.22, 1, 0.36, 1] as const;

const commitments = [
  'Community-first electrification strategies built with local partners',
  'Complete engineering for solar PV, hybrid mini-grids, and storage',
  'Performance monitoring, O&M, and training for long-term reliability',
];

const supportAreas = [
  {
    icon: ClipboardCheck,
    title: 'Advisory & Audits',
    description:
      'Site assessments, energy modelling, and regulatory guidance to chart the best path forward.',
  },
  {
    icon: Wrench,
    title: 'Engineering & Delivery',
    description:
      'Design, procurement, installation, and commissioning of high-performance solar and storage assets.',
  },
  {
    icon: Cog,
    title: 'Operations & Growth',
    description:
      'Managed services and training that keep systems productive and communities powered.',
  },
  {
    icon: LineChart,
    title: 'Investment Support',
    description:
      'Business models and financing structures tuned for rapid scale and measurable impact.',
  },
];

export function AboutSectionV2() {
  const showAnniversary = isAnniversaryYear2026();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // The "sun" glow drifts across the panel as the section scrolls past.
  const sunX = useTransform(scrollYProgress, [0, 1], ['-10%', '35%']);
  const sunY = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border-[0.5px] bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24 xl:py-28"
    >
      {/* Solar-panel grid: fine cell lines that slowly drift, masked to fade out. */}
      <div
        aria-hidden
        className="about-solar-grid pointer-events-none absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(ellipse_at_25%_15%,#000_20%,transparent_75%)]"
      />
      <motion.div
        aria-hidden
        style={{ x: sunX, y: sunY }}
        className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_65%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      <Container className="relative px-4">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <SectionEyebrow tone="light">Who we are</SectionEyebrow>
            <MaskWords
              as="h2"
              text="ACOB Lighting Technology."
              className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground md:text-4xl lg:text-5xl"
            />

            {/* Reads itself as you scroll: words light up from dim to full. */}
            <ScrollWordReveal
              text="Powering Nigeria with dependable renewable energy systems that help households, industries, and governments unlock sustainable growth. From strategy to implementation, our team manages every stage of the clean energy lifecycle."
              className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-primary-foreground md:text-xl"
              dim={0.3}
            />

            {showAnniversary && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="mt-5 max-w-xl text-base text-primary-foreground/80 md:text-lg"
              >
                {ANNIVERSARY_2026.extendedSummary}
              </motion.p>
            )}

            <motion.ul
              className="mt-8 border-t border-primary-foreground/15"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
              {commitments.map(item => (
                <motion.li
                  key={item}
                  className="relative flex items-start gap-3 py-4"
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary-foreground" />
                  <span className="text-sm leading-relaxed text-primary-foreground/90 md:text-base">
                    {item}
                  </span>
                  {/* Divider that draws itself under each line */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary-foreground/15"
                    variants={{
                      hidden: { scaleX: 0 },
                      show: {
                        scaleX: 1,
                        transition: { duration: 0.9, ease: EASE },
                      },
                    }}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
            className="space-y-6 rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 xl:p-9"
          >
            <h3 className="text-xl font-semibold uppercase tracking-wide text-primary-foreground">
              How we support your energy transition
            </h3>
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                show: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
            >
              {supportAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.97 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                >
                  <SpotlightCard
                    className="h-full rounded-2xl"
                    glow="rgba(255, 255, 255, 0.22)"
                  >
                    <div className="h-full rounded-2xl border border-white/20 bg-white/10 p-5 transition-colors duration-500 hover:border-white/40">
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                          <area.icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="text-xs font-bold tabular-nums text-primary-foreground/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h4 className="mt-5 text-lg font-semibold text-primary-foreground">
                        {area.title}
                      </h4>
                      <p className="mt-2 text-sm text-primary-foreground/90">
                        {area.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>

            <Magnetic>
              <Link href="/about" className="inline-flex">
                <Button
                  size="lg"
                  className="group border-2 border-white/70 bg-transparent px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-white hover:text-primary"
                >
                  Learn about our mission
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </Button>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
