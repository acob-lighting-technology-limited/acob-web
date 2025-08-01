'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FC } from 'react';

interface MaskTextProps {
  phrases: string[];
  className?: string;
}

export const MaskText: FC<MaskTextProps> = ({ phrases, className }) => {
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {phrases.map((phrase, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p
            initial={{ y: '100%' }}
            animate={
              inView
                ? {
                    y: '0',
                    transition: {
                      duration: 1.2,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.15 * index,
                    },
                  }
                : {}
            }
            className="m-0"
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </div>
  );
};
