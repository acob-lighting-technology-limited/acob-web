import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function MediaGalleryLoading() {
  return (
    <Container className="px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery Controls Skeleton */}
          <Card className="border-0 custom-shadow shadow-none">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Skeleton className="h-6 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-16" />
                  <Skeleton className="h-9 w-16" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 custom-shadow shadow-none p-0"
              >
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Skeleton */}
          <div className="text-center pt-8">
            <Skeleton className="h-11 w-32 mx-auto" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
