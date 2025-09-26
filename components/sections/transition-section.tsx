'use client';

import { Container } from '@/components/ui/container';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MaskText } from '../animations/MaskText';

import { stats } from '@/lib/data/transition-data';
import {
  StaticImage,
  initializeStaticImages,
  getStaticImages,
  getStaticBackgroundImage,
} from '@/lib/utils/static-images';


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
    if (!isInView) {
      return;
    }

    const controls = animate(0, end, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo-like
      onUpdate: value => setCount(Math.round(value)),
      onComplete: () => setCount(end),
    });

    return () => {
      controls.stop();
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
  const [images, setImages] = useState<StaticImage[]>([]);
  const [backgroundImage, setBackgroundImage] = useState(
    '/images/transition-bg.jpg',
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadImages = async () => {
      try {
        await initializeStaticImages();
        const staticImages = getStaticImages();
        const staticBg = getStaticBackgroundImage();
        console.log('🖼️ Transition section - Images loaded:', staticImages.length);
        console.log('🖼️ Transition section - Background image:', staticBg);
        setImages(staticImages);
        setBackgroundImage(staticBg);
      } catch (error) {
        console.error('Error initializing images:', error);
        // Fallback images are already set in initializeStaticImages
        const staticImages = getStaticImages();
        const staticBg = getStaticBackgroundImage();
        console.log('🔄 Using fallback images in transition section:', staticImages.length);
        setImages(staticImages);
        setBackgroundImage(staticBg);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-24 transition-colors duration-700"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30 dark:from-zinc-950/90 dark:via-zinc-950/70 dark:to-zinc-950/30" />
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
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 text-center shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/15"
                >
                  <CounterAnimation
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                  <div className="text-sm text-white/80">{stat.label}</div>
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
            {(() => {
              if (isLoading) {
                return Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-lg bg-gray-300 animate-pulse h-[250px]"
                  />
                ));
              }

              return images.map((image, index) => (
                <motion.div
                  key={`${image.projectTitle}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-lg h-[250px] flex"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <ImageWithFallback
                    src={`${image.url}?height=250&width=300&fit=crop&auto=format&q=75`}
                    alt={image.alt}
                    width={300}
                    height={250}
                    className=""
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                </motion.div>
              ));
            })()}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
