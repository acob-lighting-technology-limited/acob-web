'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

/**
 * Section label with a short rule that draws in before the text — the same
 * eyebrow everywhere on the home page, so sections read as one system.
 */
export function SectionEyebrow({
  children,
  className,
  tone = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  /** `light` for use on the green panels. */
  tone?: 'primary' | 'light';
}) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.28em]',
        tone === 'light' ? 'text-primary-foreground/80' : 'text-primary',
        className,
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.span
        aria-hidden
        className={cn(
          'h-0.5 w-8 origin-left',
          tone === 'light' ? 'bg-primary-foreground/70' : 'bg-primary',
        )}
        variants={{
          hidden: { scaleX: 0 },
          show: {
            scaleX: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -8 },
          show: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.25,
            },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
