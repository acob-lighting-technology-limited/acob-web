import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function UpdatesGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search Results Info Skeleton */}
      {/* <div className="mb-6 p-4 bg-muted rounded-lg">
        <Skeleton className="h-4 w-48" />
      </div> */}

      {/* Updates Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden p-0">
            <div className="aspect-[16/9] overflow-hidden relative">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="!pt-0 p-6 flex flex-col flex-1">
              <div className="flex-1 space-y-4">
                {/* Author and Date skeleton */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                {/* Title skeleton */}
                <Skeleton className="h-6 w-3/4" />
                {/* Excerpt skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="mt-6">
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-12">
        <div className="text-sm text-muted-foreground text-center mb-4">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}

export function UpdatesSidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search Skeleton */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      {/* Categories Skeleton */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
