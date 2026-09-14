import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
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

// PageHero skeleton component — mirrors the real Hero's height and
// bottom-left anchored title-pill + heading so the page doesn't jump on mount.
function PageHeroSkeleton() {
  return (
    <div className="relative h-[calc(50vh+6rem)] w-full overflow-hidden bg-muted md:h-[calc(45vh+6rem)] lg:h-[calc(60vh+6rem)] short:h-[calc(45vh+3rem)]">
      <div className="absolute inset-0 flex items-end pb-4 sm:pb-6 xl:pb-10">
        <div className="mx-auto w-full max-w-7xl px-4 2xl:container">
          <div className="max-w-5xl space-y-3">
            <ShimmerSkeleton
              className="h-9 w-40 rounded-md"
              style={{ animationDelay: '0.1s' } as React.CSSProperties}
            />
            <ShimmerSkeleton
              className="h-12 w-full max-w-2xl rounded-lg md:h-14"
              style={{ animationDelay: '0.2s' } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Content skeleton component — a flat standfirst (eyebrow + heading + a few
// lines) followed by a generic card row, matching the current editorial page
// shape instead of the old bordered-card-with-gallery layout.
function ContentSkeleton() {
  const delay1: React.CSSProperties = { animationDelay: '0.1s' };
  const delay2: React.CSSProperties = { animationDelay: '0.2s' };
  const delay3: React.CSSProperties = { animationDelay: '0.3s' };
  const delay4: React.CSSProperties = { animationDelay: '0.4s' };

  return (
    <Container className="space-y-10 px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2">
        <ShimmerSkeleton className="w-16 h-4" />
        <ShimmerSkeleton className="w-10 h-4" style={delay1} />
        <ShimmerSkeleton className="w-24 h-4" style={delay2} />
      </div>

      {/* Standfirst skeleton */}
      <div className="max-w-[62ch] space-y-4">
        <ShimmerSkeleton className="h-3 w-32" style={delay1} />
        <div className="space-y-3">
          <ShimmerSkeleton className="h-6 w-full" style={delay2} />
          <ShimmerSkeleton className="h-6 w-5/6" style={delay3} />
        </div>
      </div>

      {/* Generic card row skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => {
          const cardDelay: React.CSSProperties = {
            animationDelay: `${0.4 + i * 0.1}s`,
          };
          return (
            <div key={i} className="space-y-3">
              <ShimmerSkeleton
                className="aspect-[16/10] w-full rounded-xl"
                style={cardDelay}
              />
              <ShimmerSkeleton className="h-5 w-3/4" style={delay4} />
              <ShimmerSkeleton className="h-4 w-full" style={delay4} />
            </div>
          );
        })}
      </div>
    </Container>
  );
}

// Generic homepage-style section skeleton — eyebrow + heading + card row.
// Used to approximate below-the-fold sections (Services/Projects/Updates)
// while their data is still loading.
function SectionSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <Container className="space-y-8 px-4 py-12 sm:py-16">
      <div className="max-w-xl space-y-3">
        <ShimmerSkeleton
          className="h-3 w-28"
          style={{ animationDelay: `${delay}s` } as React.CSSProperties}
        />
        <ShimmerSkeleton
          className="h-8 w-full max-w-sm"
          style={{ animationDelay: `${delay + 0.1}s` } as React.CSSProperties}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-3">
            <ShimmerSkeleton
              className="aspect-[16/10] w-full rounded-xl"
              style={
                {
                  animationDelay: `${delay + 0.2 + i * 0.1}s`,
                } as React.CSSProperties
              }
            />
            <ShimmerSkeleton
              className="h-5 w-3/4"
              style={
                {
                  animationDelay: `${delay + 0.3 + i * 0.1}s`,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>
    </Container>
  );
}

export {
  Skeleton,
  ShimmerSkeleton,
  PageHeroSkeleton,
  ContentSkeleton,
  SectionSkeleton,
};
