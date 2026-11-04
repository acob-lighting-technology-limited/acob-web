'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FC, ReactNode, useMemo } from 'react';

import { useSiteReveal } from '@/components/loader/site-reveal-provider';

interface MaskTextProps {
  children?: ReactNode;
  phrases?: string[];
  staggerDelay?: number;
  duration?: number;
  className?: string;
  /**
   * Element the whole text renders as. Defaults to a plain block; pass a
   * heading level when the text is the section's or page's heading so it is
   * exposed as one (lines then render as spans, which headings may contain).
   */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export const MaskText: FC<MaskTextProps> = ({
  children,
  phrases,
  staggerDelay = 0.08,
  duration = 0.6,
  className,
  as: Tag = 'div',
}) => {
  // Above-the-fold copy is "in view" from the first frame, so it would slide up
  // behind the loader and be finished before anyone saw it. Wait for the
  // curtain. Below-the-fold text is long since revealed by the time it scrolls
  // into view, so this costs nothing there.
  const { revealed } = useSiteReveal();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px', // Trigger slightly before entering viewport
  });

  // Memoize content to prevent unnecessary re-renders
  const childrenArray = useMemo(() => {
    const content = phrases || (children ? [children] : []);
    return Array.isArray(content) ? content : [content];
  }, [phrases, children]);

  // Headings and paragraphs only allow phrasing content, so lines become
  // block-level spans there instead of divs.
  const isPhrasing = Tag !== 'div';
  const Line = isPhrasing ? 'span' : 'div';
  const MotionLine = isPhrasing ? motion.span : motion.div;

  return (
    <Tag ref={ref}>
      {childrenArray.map((child, index) => (
        <Line key={index} className="block overflow-hidden">
          <MotionLine
            initial={{ y: '100%' }}
            animate={
              inView && revealed
                ? {
                    y: '0',
                    transition: {
                      duration,
                      ease: [0.33, 1, 0.68, 1],
                      delay: staggerDelay * index,
                    },
                  }
                : {}
            }
            className={`block p-2 !pl-0 text-balance ${className}`}
          >
            {child}
          </MotionLine>
        </Line>
      ))}
    </Tag>
  );
};
