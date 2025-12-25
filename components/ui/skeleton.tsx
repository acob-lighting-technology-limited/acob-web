import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-background', className)}
      {...props}
    />
  );
}

// Enhanced shimmer skeleton with gradient animation
function ShimmerSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-muted-foreground/20 dark:bg-card',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-muted dark:before:via-secondary before:to-transparent',
        'before:animate-shimmer before:-translate-x-full',
        className,
      )}
      style={
        {
          '--shimmer-duration': '1.5s',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

// PageHero skeleton component
function PageHeroSkeleton() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-muted-foreground/30 dark:bg-muted/10 overflow-hidden">
      {/* Background skeleton with shimmer */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" /> */}
      <div className="absolute inset-0 bg-secondary/30" />
      {/* Content skeleton */}
      <div className="relative z-10 flex flex-col items-start justify-end h-full 2xl:container max-w-7xl mx-auto py-16 px-4 text-center">
        {/* Title skeleton with staggered animation */}
        <ShimmerSkeleton
          className="w-1/2 h-16 rounded-lg  animate-pulse !bg-background/80 before:!via-muted-foreground/30"
          style={{ animationDelay: '0.1s' } as React.CSSProperties}
        />

        {/* Subtitle skeleton with staggered animation */}
        {/* <ShimmerSkeleton
          className="w-2/3 h-6 rounded-md mb-2 animate-pulse"
          style={{ animationDelay: '0.2s' } as React.CSSProperties}
        />
        <ShimmerSkeleton
          className="w-1/2 h-6 rounded-md animate-pulse"
          style={{ animationDelay: '0.3s' } as React.CSSProperties}
        /> */}
      </div>

      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" /> */}
    </div>
  );
}

// Content skeleton component
function ContentSkeleton() {
  const delay1: React.CSSProperties = { animationDelay: '0.1s' };
  const delay2: React.CSSProperties = { animationDelay: '0.2s' };
  const delay3: React.CSSProperties = { animationDelay: '0.3s' };
  const delay4: React.CSSProperties = { animationDelay: '0.4s' };
  const delay5: React.CSSProperties = { animationDelay: '0.5s' };
  const delay6: React.CSSProperties = { animationDelay: '0.6s' };

  return (
    <Container className="space-y-6 p-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2 mb-8">
        <ShimmerSkeleton className="w-16 h-4 animate-pulse" />
        <ShimmerSkeleton className="w-10 h-4 animate-pulse" style={delay1} />
        <ShimmerSkeleton className="w-24 h-4 animate-pulse" style={delay2} />
      </div>

      {/* Main content skeleton - 3 columns, no sidebar */}
      <div className="space-y-4">
        <div>
          {/* Card skeleton */}
          <div className="border rounded-lg border-border bg-surface p-4 sm:p-6 xl:p-8">
            <div className="max-w-3xl space-y-6">
              {/* Title skeleton */}
              <ShimmerSkeleton
                className="w-1/3 h-8 rounded-lg animate-pulse"
                style={delay1}
              />

              {/* Text content skeleton */}
              <div className="space-y-3">
                <ShimmerSkeleton
                  className="w-full h-4 rounded animate-pulse"
                  style={delay2}
                />
                <ShimmerSkeleton
                  className="w-full h-4 rounded animate-pulse"
                  style={delay3}
                />
                <ShimmerSkeleton
                  className="w-5/6 h-4 rounded animate-pulse"
                  style={delay4}
                />
                <ShimmerSkeleton
                  className="w-full h-4 rounded animate-pulse"
                  style={delay5}
                />
                <ShimmerSkeleton
                  className="w-4/5 h-4 rounded animate-pulse"
                  style={delay6}
                />
              </div>

              {/* Gallery skeleton - 3 columns */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => {
                  const galleryDelay: React.CSSProperties = {
                    animationDelay: `${0.7 + i * 0.1}s`,
                  };
                  return (
                    <ShimmerSkeleton
                      key={i}
                      className="aspect-[4/3] rounded-lg animate-pulse"
                      style={galleryDelay}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

// Card skeleton component
function CardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div className="space-y-4">
      <ShimmerSkeleton
        className="aspect-[4/3] rounded-lg animate-pulse"
        style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      />
      <div className="space-y-2">
        <ShimmerSkeleton
          className="w-3/4 h-5 animate-pulse"
          style={{ animationDelay: `${delay + 0.1}s` } as React.CSSProperties}
        />
        <ShimmerSkeleton
          className="w-full h-4 animate-pulse"
          style={{ animationDelay: `${delay + 0.2}s` } as React.CSSProperties}
        />
        <ShimmerSkeleton
          className="w-2/3 h-4 animate-pulse"
          style={{ animationDelay: `${delay + 0.3}s` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

// Text skeleton component
function TextSkeleton({
  lines = 3,
  className,
  staggered = true,
}: {
  lines?: number;
  className?: string;
  staggered?: boolean;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <ShimmerSkeleton
          key={i}
          className={cn(
            'h-4 animate-pulse',
            i === lines - 1 ? 'w-3/4' : 'w-full',
          )}
          style={
            staggered
              ? ({ animationDelay: `${i * 0.1}s` } as React.CSSProperties)
              : undefined
          }
        />
      ))}
    </div>
  );
}
function HeroSkeleton() {
  return (
    <div className="relative w-full h-[50vh] md:h-[45vh] lg:h-[60vh] bg-muted-foreground/30 dark:bg-muted/10 overflow-hidden">
      {/* Background skeleton with shimmer */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" /> */}
      <div className="absolute inset-0 bg-secondary/30" />
      {/* Content skeleton */}
      <div className="relative z-10 flex flex-col items-start justify-end h-full 2xl:container p-6 sm:p-12 mx-auto py-16  text-center">
        {/* Title skeleton with staggered animation */}
        <div className="space-y-8 w-full">
          {' '}
          <ShimmerSkeleton
            className="w-1/2 h-16 rounded-lg  animate-pulse !bg-background/80 before:!via-muted-foreground/30"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />{' '}
          <ShimmerSkeleton
            className="w-1/4 h-8 rounded-lg  animate-pulse !bg-background/80 before:!via-muted-foreground/30"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />{' '}
          <ShimmerSkeleton
            className="w-1/4 h-8 rounded-lg  animate-pulse !bg-background/80 before:!via-muted-foreground/30"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />{' '}
          <ShimmerSkeleton
            className="w-[20%] h-2 rounded-lg  animate-pulse !bg-background/80 before:!via-muted-foreground/30"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}
export {
  Skeleton,
  ShimmerSkeleton,
  PageHeroSkeleton,
  ContentSkeleton,
  CardSkeleton,
  HeroSkeleton,
  TextSkeleton,
};
