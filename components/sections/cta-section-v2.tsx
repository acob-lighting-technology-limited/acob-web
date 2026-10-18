'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { FadeIn } from '@/components/animations/FadeIn';
import { Magnetic } from '@/components/animations/Magnetic';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

const EASE = [0.65, 0, 0.35, 1] as const;

/** The pinned version needs room: wide enough, and tall enough for the copy. */
const PIN_QUERY = '(min-width: 768px) and (min-height: 640px)';

function CtaContent() {
  const email = CONTACT_INFO.email.general;
  const phone = CONTACT_INFO.phone.primary;
  return (
    <Container className="relative px-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <SectionEyebrow tone="light">Let&apos;s work together</SectionEyebrow>

        <FadeIn delay={0.1}>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Ready to power your next project?
          </h2>
        </FadeIn>

        <p className="mt-6 max-w-2xl text-base text-primary-foreground/90 md:text-lg">
          From feasibility to commissioning and long-term operations, our team
          is ready to design a dependable clean-energy solution for your
          community, business, or agency. Let&apos;s talk about what you want to
          build.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Magnetic>
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="group w-full px-8 py-6 text-base font-semibold sm:w-auto"
              >
                Get in touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Magnetic>
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 border-b-2 border-primary-foreground/50 pb-1 text-base font-semibold text-primary-foreground transition-all hover:gap-3 hover:border-primary-foreground"
          >
            View our projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-primary-foreground/20 pt-6 text-sm text-primary-foreground/90 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Phone className="h-4 w-4" />
            {phone}
          </a>
        </div>
      </div>
    </Container>
  );
}

/** The green panel's light: the cursor glow and two soft corner blooms. */
function PanelLighting({ glow }: { glow: MotionValue<string> }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
    </>
  );
}

export function CtaSectionV2() {
  const reduceMotion = useReducedMotion();
  const [pin, setPin] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const update = () => setPin(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // A soft sunlight glow that trails the cursor across the green panel.
  const glowX = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), transparent 60%)`;
  const trackGlow = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') {
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    glowX.set(((e.clientX - r.left) / r.width) * 100);
    glowY.set(((e.clientY - r.top) / r.height) * 100);
  };

  if (pin && !reduceMotion) {
    return <PinnedCta glow={glow} onPointerMove={trackGlow} />;
  }
  return (
    <ArrivalCta
      glow={glow}
      onPointerMove={trackGlow}
      reduceMotion={!!reduceMotion}
    />
  );
}

interface VariantProps {
  glow: MotionValue<string>;
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
}

/**
 * Desktop: the section pins while scrolling opens the green circle, so the
 * reveal happens in place instead of sliding past. It starts opening as the
 * section rises into view, from a circle big enough that the screen is never
 * mostly black, and the copy is fully readable before the pin releases.
 */
function PinnedCta({ glow, onPointerMove }: VariantProps) {
  const sectionRef = useRef<HTMLElement>(null);
  // 0 when the section's top meets the bottom of the screen, 1 when the pin
  // releases. The section is 160svh: 100svh rising into view, 60svh pinned.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  const radius = useTransform(progress, [0.3, 0.8], [18, 150]);
  const clipPath = useMotionTemplate`circle(${radius}% at 50% 50%)`;
  // Copy arrives while the circle is still opening — as soon as it's wide
  // enough to frame the heading — rather than waiting for the full reveal.
  const contentOpacity = useTransform(progress, [0.34, 0.5], [0, 1]);
  const contentY = useTransform(progress, [0.34, 0.5], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[160svh] bg-background"
      onPointerMove={onPointerMove}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div
          style={{ clipPath, willChange: 'clip-path' }}
          className="absolute inset-0 flex items-center bg-primary text-primary-foreground"
        >
          <PanelLighting glow={glow} />
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="w-full"
          >
            <CtaContent />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Phones, short screens and reduced motion: no pin. The circle opens over
 * ~1.6s as the section arrives, and replays each time it comes back into view
 * (it only resets once fully off screen, so it never collapses in view).
 */
function ArrivalCta({
  glow,
  onPointerMove,
  reduceMotion,
}: VariantProps & { reduceMotion: boolean }) {
  // Watch the unclipped section, not the panel: a clip-path on the observed
  // element makes IntersectionObserver report a ratio of 0.
  const sectionRef = useRef<HTMLElement>(null);
  const entered = useInView(sectionRef, { amount: 0.35 });
  const onScreen = useInView(sectionRef, { amount: 0 });
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (entered) {
      setRevealed(true);
    } else if (!onScreen) {
      setRevealed(false);
    }
  }, [entered, onScreen]);
  const open = reduceMotion || revealed;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      onPointerMove={onPointerMove}
    >
      <motion.div
        className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24 lg:py-28"
        initial={false}
        animate={{
          clipPath: open
            ? 'circle(150% at 50% 50%)'
            : 'circle(3.5% at 50% 50%)',
        }}
        transition={{ duration: reduceMotion ? 0 : 1.6, ease: EASE }}
      >
        <PanelLighting glow={glow} />
        <motion.div
          initial={false}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.35,
            ease: EASE,
          }}
        >
          <CtaContent />
        </motion.div>
      </motion.div>
    </section>
  );
}
