'use client';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface AutoCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  interval?: number;
  className?: string;
  pauseOnHover?: boolean;
  showIndicators?: boolean;
}

export function AutoCarousel<T>({
  items,
  renderItem,
  interval = 6000,
  className,
  pauseOnHover = true,
  showIndicators = true,
}: AutoCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsCount = useMemo(() => items.length, [items.length]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (!itemsCount) return;
      setCurrentIndex((index + itemsCount) % itemsCount);
    },
    [itemsCount],
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  useEffect(() => {
    if (!itemsCount) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (pauseOnHover && isHoveredRef.current) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % itemsCount);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [itemsCount, interval, pauseOnHover]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (pauseOnHover) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [pauseOnHover]);

  if (!itemsCount) {
    return null;
  }

  return (
    <div className={cn('relative flex flex-col gap-6', className)} ref={containerRef}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'transition-all duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-40',
            )}
            aria-hidden={index !== currentIndex}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {showIndicators && itemsCount > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-3 bg-border hover:w-5 hover:bg-primary/70',
              )}
              aria-label={`Show carousel item ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

AutoCarousel.displayName = 'AutoCarousel';

