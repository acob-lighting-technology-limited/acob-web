import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32 bg-muted" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20 bg-muted" />
            <Skeleton className="h-8 w-20 bg-muted" />
            <Skeleton className="h-8 w-20 bg-muted" />
          </div>
        </div>
      </div>

      {/* Services content skeleton */}
      <div className="container py-8">
        <div className="space-y-12">
          {/* Hero section */}
          <div className="text-center space-y-4">
            <Skeleton className="h-16 w-1/2 mx-auto bg-muted" />
            <Skeleton className="h-6 w-3/4 mx-auto bg-muted" />
          </div>

          {/* Services grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="space-y-4 p-6 border rounded-lg border-border bg-surface"
              >
                <Skeleton className="h-12 w-12 bg-muted" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-2/3 bg-muted" />
                </div>
                <Skeleton className="h-10 w-1/3 bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
