import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}

// PageHero skeleton component
function PageHeroSkeleton() {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

      {/* Content skeleton */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Title skeleton */}
        <div className="w-3/4 h-12 bg-primary/20 rounded-lg mb-4" />

        {/* Subtitle skeleton */}
        <div className="w-2/3 h-6 bg-primary/15 rounded-md mb-2" />
        <div className="w-1/2 h-6 bg-primary/15 rounded-md" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
  );
}

// Content skeleton component
function ContentSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2">
        <div className="w-16 h-4 bg-primary/10 rounded" />
        <div className="w-4 h-4 bg-primary/10 rounded" />
        <div className="w-24 h-4 bg-primary/10 rounded" />
      </div>

      {/* Title skeleton */}
      <div className="w-3/4 h-8 bg-primary/10 rounded-lg" />

      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-primary/10 rounded" />
        <div className="w-5/6 h-4 bg-primary/10 rounded" />
        <div className="w-4/5 h-4 bg-primary/10 rounded" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/3] bg-primary/10 rounded-lg" />
            <div className="space-y-2">
              <div className="w-3/4 h-5 bg-primary/10 rounded" />
              <div className="w-full h-4 bg-primary/10 rounded" />
              <div className="w-2/3 h-4 bg-primary/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card skeleton component
function CardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-[4/3] bg-primary/10 rounded-lg" />
      <div className="space-y-2">
        <div className="w-3/4 h-5 bg-primary/10 rounded" />
        <div className="w-full h-4 bg-primary/10 rounded" />
        <div className="w-2/3 h-4 bg-primary/10 rounded" />
      </div>
    </div>
  );
}

// Text skeleton component
function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-primary/10 rounded',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export {
  Skeleton,
  PageHeroSkeleton,
  ContentSkeleton,
  CardSkeleton,
  TextSkeleton,
};
