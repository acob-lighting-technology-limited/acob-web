import { ShimmerSkeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Container className="px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex items-center space-x-2 md:mb-12">
          <ShimmerSkeleton className="w-16 h-4" />
          <ShimmerSkeleton
            className="w-10 h-4"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />
          <ShimmerSkeleton
            className="w-24 h-4"
            style={{ animationDelay: '0.2s' } as React.CSSProperties}
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image gallery skeleton */}
          <div className="space-y-3">
            <ShimmerSkeleton className="aspect-[4/3] w-full rounded-lg" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <ShimmerSkeleton
                  key={i}
                  className="h-16 w-16 rounded-lg"
                  style={
                    { animationDelay: `${i * 0.1}s` } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="space-y-8">
            <div className="space-y-3">
              <ShimmerSkeleton className="h-3 w-28" />
              <ShimmerSkeleton
                className="h-9 w-3/4"
                style={{ animationDelay: '0.1s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className="h-4 w-full"
                style={{ animationDelay: '0.2s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className="h-4 w-5/6"
                style={{ animationDelay: '0.3s' } as React.CSSProperties}
              />
            </div>

            <div className="space-y-3 border-t border-border/20 pt-6">
              <ShimmerSkeleton className="h-3 w-32" />
              <ShimmerSkeleton
                className="h-6 w-1/2"
                style={{ animationDelay: '0.1s' } as React.CSSProperties}
              />
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <ShimmerSkeleton
                    key={i}
                    className="h-4 w-full"
                    style={
                      {
                        animationDelay: `${0.2 + i * 0.1}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
