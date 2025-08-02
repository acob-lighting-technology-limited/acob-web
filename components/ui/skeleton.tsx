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
        className
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
    <div className="relative w-full h-[400px] bg-muted-foreground/30 dark:bg-muted/10 overflow-hidden">
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
  return (
    <Container className="space-y-6 p-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2">
        <ShimmerSkeleton className="w-16 h-4 animate-pulse" />
        <ShimmerSkeleton
          className="w-10 h-4 animate-pulse"
          style={{ animationDelay: '0.1s' } as React.CSSProperties}
        />
        <ShimmerSkeleton
          className="w-24 h-4 animate-pulse"
          style={{ animationDelay: '0.2s' } as React.CSSProperties}
        />
      </div>

      {/* Title skeleton */}
      {/* <ShimmerSkeleton className="w-2/3 h-12 rounded-lg animate-pulse" /> */}

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3, 4, 5, 6].map((i, index) => {
          // Show only items 0–2 on mobile, and only 0–1 on md+
          const isMobileVisible = index < 3;
          const isDesktopVisible = index < 2;

          return (
            <div
              key={i}
              className={`
                space-y-4
                ${index === 0 ? 'md:col-span-2' : ''}
                ${isMobileVisible ? '' : 'hidden'}
                md:${isDesktopVisible ? 'block' : 'hidden'}
              `}
            >
              <ShimmerSkeleton
                className="aspect-[4/3] rounded-lg animate-pulse"
                style={
                  { animationDelay: `${index * 0.1}s` } as React.CSSProperties
                }
              />
              <div className="space-y-2">
                <ShimmerSkeleton
                  className="w-3/4 h-5 animate-pulse"
                  style={
                    {
                      animationDelay: `${index * 0.1 + 0.1}s`,
                    } as React.CSSProperties
                  }
                />
                <ShimmerSkeleton
                  className="w-full h-4 animate-pulse"
                  style={
                    {
                      animationDelay: `${index * 0.1 + 0.2}s`,
                    } as React.CSSProperties
                  }
                />
                <ShimmerSkeleton
                  className="w-2/3 h-4 animate-pulse"
                  style={
                    {
                      animationDelay: `${index * 0.1 + 0.3}s`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          );
        })}
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
            i === lines - 1 ? 'w-3/4' : 'w-full'
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

export {
  Skeleton,
  ShimmerSkeleton,
  PageHeroSkeleton,
  ContentSkeleton,
  CardSkeleton,
  TextSkeleton,
};
