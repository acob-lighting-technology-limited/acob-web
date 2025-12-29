'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to get responsive card limit based on screen size
 * - Mobile (default): 6 cards
 * - Tablet (768px+): 10 cards
 * - Laptop/Desktop (1024px+): 12 cards
 */
export function useResponsiveLimit() {
  const [limit, setLimit] = useState(6); // Default to 6 (mobile-first)

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

    // Set initial limit
    updateLimit();

    // Add resize listener
    window.addEventListener('resize', updateLimit);

    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  return limit;
}
