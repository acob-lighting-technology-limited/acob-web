'use client';

import { Container } from '@/components/ui/container';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

import { stats } from '@/lib/data/transition-data';

function CounterAnimation({
  end,
  suffix,
  duration = 2.5,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div
      ref={countRef}
      className="text-2xl font-bold text-primary-foreground mb-2"
    >
      {count}
      {suffix}
    </div>
  );
}

export function TransitionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative py-16 bg-cover bg-center bg-no-repeat overflow-hidden transition-colors duration-700"
      style={{
        backgroundImage: "url('/images/transition-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/90 dark:bg-gradient-to-b dark:from-zinc-950 from-0% dark:to-black/5 to-80%  z-0 transition-colors duration-700"></div>
      <Container className="relative px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground transition-colors duration-700"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Feeling The Transition To Renewable Power, To deploy 100
              micro-grids impacting the lives of over ten Nigerians by 2030.
            </motion.h2>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.3,
                    ease: 'easeOut',
                  }}
                  className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5 text-center"
                >
                  <CounterAnimation
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                  <div className="text-sm text-zinc-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <motion.img
                src="/images/obadore-ondo.jpg?height=250&width=300"
                alt="Solar Installation"
                className="w-full h-[250px] object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg mt-8">
              <motion.img
                src="/images/makami-kaduna.jpg?height=250&width=300"
                alt="Team at Work"
                className="w-full h-[250px] object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg -mt-8">
              <motion.img
                src="/images/olooji-community.jpg?height=250&width=300"
                alt="Solar Panels"
                className="w-full h-[250px] object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <motion.img
                src="/images/adebayo-community.jpg?height=250&width=300"
                alt="Community Impact"
                className="w-full h-[250px] object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 1.0 }}
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
