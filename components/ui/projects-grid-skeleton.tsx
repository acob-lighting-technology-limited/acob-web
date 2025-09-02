import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectsGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search Results Info Skeleton */}
      {/* <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-8 w-16" />
          </div>
        </CardContent>
      </Card> */}

      {/* Projects Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden p-0">
            <div className="aspect-[16/9] overflow-hidden relative">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="!pt-0 p-6 flex flex-col flex-1">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
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
      <div className="mt-8">
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

export function ProjectsSidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search Skeleton */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      {/* States Filter Skeleton */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects Skeleton */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
