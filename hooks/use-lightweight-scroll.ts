import { useRef, useEffect, useState } from 'react';

export function useLightweightScroll() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    containerRef,
    scrollY,
    // Mock MotionValue interface for compatibility
    scrollYProgress: {
      get: () =>
        scrollY / (document.documentElement.scrollHeight - window.innerHeight),
    },
  };
}
