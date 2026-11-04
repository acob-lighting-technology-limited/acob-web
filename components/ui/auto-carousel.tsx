/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Pause, Play } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAutoplayPause } from '@/hooks/use-autoplay-pause';

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

  const goTo = useCallback(
    (index: number) => {
      if (!itemsCount) {
        return;
      }
      setCurrentIndex((index + itemsCount) % itemsCount);
    },
    [itemsCount],
  );

  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo],
  );

  // Pauses on hover and keyboard focus, when the visitor presses pause, and
  // from the start under prefers-reduced-motion.
  const autoplay = useAutoplayPause();
  const paused = autoplay.stopped || (pauseOnHover && autoplay.paused);

  useEffect(() => {
    if (!itemsCount || paused) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % itemsCount);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [itemsCount, interval, paused]);

  if (!itemsCount) {
    return null;
  }

  return (
    <div
      className={cn('relative flex flex-col gap-6', className)}
      ref={containerRef}
      aria-roledescription="carousel"
      {...autoplay.handlers}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'transition-opacity duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-40',
            )}
            aria-current={index === currentIndex}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {showIndicators && itemsCount > 1 ? (
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={autoplay.toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={autoplay.stopped ? 'Play Carousel' : 'Pause Carousel'}
          >
            {autoplay.stopped ? (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className="group flex h-8 items-center px-1"
              aria-label={`Show carousel item ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-[width,background-color] duration-500',
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-3 bg-border group-hover:w-5 group-hover:bg-primary/70',
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

AutoCarousel.displayName = 'AutoCarousel';
