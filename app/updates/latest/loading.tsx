import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LatestUpdatesLoading() {
  return (
    <Container className="px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Post Skeleton */}
          <Card className="overflow-hidden border-0 custom-shadow shadow-none p-0">
            <Skeleton className="aspect-[21/9] w-full" />
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3 mb-6" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>

          {/* Recent Posts Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 custom-shadow shadow-none p-0"
              >
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
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
