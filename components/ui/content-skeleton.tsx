import { Skeleton } from './skeleton';

interface ContentSkeletonProps {
  type?: 'card' | 'list' | 'article' | 'grid';
  count?: number;
  className?: string;
}

export function ContentSkeleton({
  type = 'card',
  count = 3,
  className = '',
}: ContentSkeletonProps) {
  if (type === 'card') {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
        aria-label="Loading content"
        role="status"
        aria-busy="true"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading content, please wait...</span>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div
        className={`space-y-4 ${className}`}
        aria-label="Loading list"
        role="status"
        aria-busy="true"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading list items, please wait...</span>
      </div>
    );
  }

  if (type === 'article') {
    return (
      <div
        className={`space-y-4 max-w-4xl mx-auto ${className}`}
        aria-label="Loading article"
        role="status"
        aria-busy="true"
      >
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-64 w-full rounded-lg mb-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <span className="sr-only">Loading article content, please wait...</span>
      </div>
    );
  }

  // grid type
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
      aria-label="Loading grid"
      role="status"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
      <span className="sr-only">Loading grid items, please wait...</span>
    </div>
  );
}
