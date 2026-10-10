'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Card with a soft glow that follows the mouse and a slight 3D tilt.
 * Touch input gets the static card. `glow` is any CSS colour.
 */
export function SpotlightCard({
  children,
  className,
  glow = 'rgba(22, 163, 74, 0.28)',
  tilt = 4,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  tilt?: number;
}) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const rx = useSpring(0, { stiffness: 160, damping: 20 });
  const ry = useSpring(0, { stiffness: 160, damping: 20 });
  const background = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, ${glow}, transparent 65%)`;

  return (
    <motion.div
      className={cn('group/spot relative isolate', className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={e => {
        if (e.pointerType !== 'mouse') {
          return;
        }
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        rx.set((py / r.height - 0.5) * -tilt);
        ry.set((px / r.width - 0.5) * tilt);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        mx.set(-500);
        my.set(-500);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
