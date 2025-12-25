'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FC, ReactNode, useMemo } from 'react';

interface MaskTextProps {
  children?: ReactNode;
  phrases?: string[];
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

export const MaskText: FC<MaskTextProps> = ({
  children,
  phrases,
  staggerDelay = 0.15,
  duration = 1.2,
  className,
}) => {
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

  return (
    <div ref={ref}>
      {childrenArray.map((child, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={
              inView
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
            className={`p-2 !pl-0  ${className}`}
          >
            {child}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
