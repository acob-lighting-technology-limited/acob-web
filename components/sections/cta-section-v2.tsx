'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { MaskWords } from '@/components/animations/MaskWords';
import { Magnetic } from '@/components/animations/Magnetic';

export function CtaSectionV2() {
  const email = CONTACT_INFO.email.general;
  const phone = CONTACT_INFO.phone.primary;

  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = targetRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) {
        return;
      }
      const progress = Math.min(1, Math.max(0, -rect.top / runway));
      scrollYProgress.set(progress);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollYProgress]);

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.75],
    ['circle(3.5% at 50% 50%)', 'circle(150% at 50% 50%)'],
  );

  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  // A soft sunlight glow that trails the cursor across the green panel.
  const glowX = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), transparent 60%)`;

  const ctaContent = (
    <Container className="relative px-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-primary-foreground/80">
          Let&apos;s work together
        </span>

        <MaskWords
          as="h2"
          text="Ready to power your next project?"
          className="mt-4 max-w-3xl justify-center text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground md:text-5xl lg:text-6xl"
        />

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

  if (prefersReducedMotion) {
    return (
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
        {ctaContent}
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ clipPath, willChange: 'clip-path' }}
          className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground"
          onPointerMove={e => {
            if (e.pointerType !== 'mouse') {
              return;
            }
            const r = e.currentTarget.getBoundingClientRect();
            glowX.set(((e.clientX - r.left) / r.width) * 100);
            glowY.set(((e.clientY - r.top) / r.height) * 100);
          }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glow }}
          />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

          <motion.div style={{ opacity: contentOpacity }} className="w-full">
            {ctaContent}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
