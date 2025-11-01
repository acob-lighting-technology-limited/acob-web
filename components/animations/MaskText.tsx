'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FC, ReactNode } from 'react';

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
    threshold: 0.75,
    triggerOnce: true,
  });

  // Use phrases if provided, otherwise use children
  const content = phrases || (children ? [children] : []);
  const childrenArray = Array.isArray(content) ? content : [content];

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
            className={`p-4 !pl-0  ${className}`}
          >
            {child}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
