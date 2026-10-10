'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {children}
    </motion.span>
  );
}

/**
 * A paragraph that "reads itself": words start dim and light up one by one as
 * the paragraph scrolls through the viewport, pacing the reader through key
 * copy. Under reduced motion it renders as plain text.
 */
export function ScrollWordReveal({
  text,
  className,
  as: Tag = 'p',
  dim = 0.18,
}: {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3';
  /** Opacity of words that haven't been reached yet. */
  dim?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = text.split(' ');
  // The scroll target is a wrapper so the ref is attached in both branches.
  return (
    <div ref={ref}>
      {reduce ? (
        <Tag className={className}>{text}</Tag>
      ) : (
        <Tag className={cn('flex flex-wrap', className)} aria-label={text}>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} aria-hidden className="mr-[0.25em]">
              <Word
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
                dim={dim}
              >
                {word}
              </Word>
            </span>
          ))}
        </Tag>
      )}
    </div>
  );
}
