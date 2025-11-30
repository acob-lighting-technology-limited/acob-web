'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const pathname = usePathname();

  // Check if we're on a products slug page and on mobile
  useEffect(() => {
    const checkShouldHide = () => {
      const isProductsSlugPage =
        pathname?.startsWith('/products/') && pathname !== '/products';
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      setShouldHide(isProductsSlugPage && isMobile);
    };

    checkShouldHide();
    window.addEventListener('resize', checkShouldHide);

    return () => {
      window.removeEventListener('resize', checkShouldHide);
    };
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Don't render on mobile for products slug pages
  if (shouldHide) {
    return null;
  }

  const scrollToTop = () => {
    // Custom slow scroll animation
    const startPosition = window.pageYOffset;
    const startTime = window.performance.now();
    const duration = 1000; // 1 second duration for slower scroll

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      const currentPosition = startPosition * (1 - eased);

      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={`z-50 h-12 w-12 rounded-full border-primary-foreground border bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-500 hover:scale-110 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}
