'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useSiteReveal } from '@/components/loader/site-reveal-provider';

type Tag = 'h1' | 'h2' | 'h3' | 'p';

interface MaskWordsProps {
  text: string;
  as?: Tag;
  className?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
}

/**
 * Kinetic headline: each word rises out of its own clipping mask, one after
 * another. Like MaskText, it waits for the intro curtain (useSiteReveal) so
 * above-the-fold copy doesn't finish animating behind the loader.
 *
 * Screen readers get the sentence once via aria-label; the split words are
 * aria-hidden. Under reduced motion the words simply appear.
 */
export function MaskWords({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.07,
}: MaskWordsProps) {
  const { revealed } = useSiteReveal();
  const reduce = useReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const Comp = motion[as];
  const words = text.split(' ');
  const play = revealed && inView;

  return (
    <Comp ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.1em] align-top"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '110%', rotate: 3 }}
            animate={play ? { y: '0%', rotate: 0 } : undefined}
            transition={{
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Comp>
  );
}
