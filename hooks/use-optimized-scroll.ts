import { useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function useOptimizedScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Only call useScroll after hydration
  const scrollResult = isHydrated
    ? useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
      })
    : { scrollYProgress: { get: () => 0 } };

  return {
    containerRef,
    scrollYProgress: scrollResult.scrollYProgress,
    isHydrated,
  };
}
