'use client';

import { Container } from '@/components/ui/container';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MaskText } from '../animations/MaskText';

import { stats } from '@/lib/data/transition-data';
import {
  getRandomProjectImages,
  getRandomBackgroundImage,
  RandomImage,
} from '@/lib/utils/random-images';

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
  const [randomImages, setRandomImages] = useState<RandomImage[]>([]);
  const [backgroundImage, setBackgroundImage] = useState(
    '/images/transition-bg.jpg'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRandomImages = async () => {
      try {
        setIsLoading(true);
        const [images, bgImage] = await Promise.all([
          getRandomProjectImages(4),
          getRandomBackgroundImage(),
        ]);
        setRandomImages(images);
        setBackgroundImage(bgImage);
      } catch (error) {
        console.error('Error loading random images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRandomImages();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-16 bg-cover bg-center bg-no-repeat overflow-hidden transition-colors duration-700"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/90 dark:bg-gradient-to-b dark:from-zinc-950 from-0% dark:to-black/5 to-80%  z-0 transition-colors duration-700"></div>
      <Container className="relative px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <MaskText
              phrases={[
                'Feeling The Transition To Renewable Power,',
                'To deploy 100 micro-grids impacting the lives of over ten thousand Nigerians by 2030.',
              ]}
              className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground transition-colors duration-700"
            />
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
            {isLoading
              ? // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden shadow-lg bg-gray-300 animate-pulse ${
                      index === 1 || index === 2 ? 'mt-8' : ''
                    } ${index === 2 ? '-mt-8' : ''}`}
                    style={{ height: '250px' }}
                  />
                ))
              : // Random images
                randomImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden shadow-lg ${
                      index === 1 || index === 2 ? 'mt-8' : ''
                    } ${index === 2 ? '-mt-8' : ''}`}
                  >
                    <motion.img
                      src={`${image.url}?height=250&width=300&fit=crop&auto=format&q=75`}
                      alt={image.alt}
                      className="w-full h-[250px] object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                  </div>
                ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
