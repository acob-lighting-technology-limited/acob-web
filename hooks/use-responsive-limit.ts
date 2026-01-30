'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to get responsive card limit based on screen size
 * - Mobile (default): 6 cards
 * - Tablet (768px+): 10 cards
 * - Laptop/Desktop (1024px+): 12 cards
 *
 * Returns 12 initially (server default) to prevent hydration mismatch,
 * then updates to the actual responsive value on the client.
 */
export function useResponsiveLimit() {
  // Start with 12 to match server-side default
  const [limit, setLimit] = useState(12);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // Laptop/Desktop
        setLimit(12);
      } else if (width >= 768) {
        // Tablet
        setLimit(10);
      } else {
        // Mobile
        setLimit(6);
      }
    };

    // Set initial limit based on actual viewport
    updateLimit();
    setIsReady(true);

    // Add resize listener
    window.addEventListener('resize', updateLimit);

    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  return { limit, isReady };
}
