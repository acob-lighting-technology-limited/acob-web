import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryLoading() {
  return (
    <Container className="px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden border-0 custom-shadow shadow-none p-0"
            >
              <Skeleton className="aspect-[16/9] w-full" />
              <CardContent className="p-6">
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
          ))}
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Category Info Skeleton */}
          <Card className="border-0 custom-shadow shadow-none">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="bg-muted/50 p-4 rounded-lg">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>

          {/* Categories List Skeleton */}
          <Card className="border-0 custom-shadow shadow-none">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button Skeleton */}
          <Card className="border-0 custom-shadow shadow-none">
            <CardContent className="p-6">
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
