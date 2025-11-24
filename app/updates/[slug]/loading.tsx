import { PageHeroSkeleton, ShimmerSkeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <>
      <PageHeroSkeleton />

      <Container className="px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center space-x-2 mb-8">
          <ShimmerSkeleton className="w-16 h-4 rounded animate-pulse" />
          <ShimmerSkeleton
            className="w-10 h-4 rounded animate-pulse"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />
          <ShimmerSkeleton
            className="w-24 h-4 rounded animate-pulse"
            style={{ animationDelay: '0.2s' } as React.CSSProperties}
          />
        </div>

        <div className="space-y-4">
          {/* Main Post Card */}
          <div className="border rounded-lg border-border bg-surface p-4 sm:p-6 xl:p-8 space-y-8">
            {/* Post Header skeleton */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 flex-wrap">
                <ShimmerSkeleton className="w-24 h-4 rounded animate-pulse" />
                <ShimmerSkeleton
                  className="w-32 h-4 rounded animate-pulse"
                  style={{ animationDelay: '0.1s' } as React.CSSProperties}
                />
                <ShimmerSkeleton
                  className="w-28 h-4 rounded animate-pulse"
                  style={{ animationDelay: '0.2s' } as React.CSSProperties}
                />
              </div>
              <ShimmerSkeleton
                className="w-1/3 h-10 rounded-lg animate-pulse"
                style={{ animationDelay: '0.3s' } as React.CSSProperties}
              />
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <ShimmerSkeleton
                  key={i}
                  className={`h-4 rounded animate-pulse ${
                    i === 11 ? 'w-5/6' : 'w-full'
                  }`}
                  style={
                    {
                      animationDelay: `${0.4 + i * 0.1}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* Tags skeleton */}
            <div className="flex items-center gap-2 pt-8 border-t border-border">
              <ShimmerSkeleton
                className="w-16 h-4 rounded animate-pulse"
                style={{ animationDelay: '1.6s' } as React.CSSProperties}
              />
              {[1, 2, 3].map(i => (
                <ShimmerSkeleton
                  key={i}
                  className="w-20 h-6 rounded-full animate-pulse"
                  style={
                    {
                      animationDelay: `${1.7 + i * 0.1}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* Share section skeleton */}
            <div className="pt-8 border-t border-border">
              <ShimmerSkeleton
                className="w-32 h-10 rounded-full animate-pulse"
                style={{ animationDelay: '2.0s' } as React.CSSProperties}
              />
            </div>

            {/* Related Posts skeleton */}
            <div className="pt-8 border-t border-border">
              <ShimmerSkeleton
                className="w-48 h-7 rounded-lg mb-6 animate-pulse"
                style={{ animationDelay: '2.1s' } as React.CSSProperties}
              />
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border"
                  >
                    <ShimmerSkeleton
                      className="w-4 h-4 rounded animate-pulse"
                      style={
                        {
                          animationDelay: `${2.2 + i * 0.1}s`,
                        } as React.CSSProperties
                      }
                    />
                    <div className="flex-1 space-y-2">
                      <ShimmerSkeleton
                        className="w-full h-4 rounded animate-pulse"
                        style={
                          {
                            animationDelay: `${2.3 + i * 0.1}s`,
                          } as React.CSSProperties
                        }
                      />
                      <ShimmerSkeleton
                        className="w-32 h-3 rounded animate-pulse"
                        style={
                          {
                            animationDelay: `${2.4 + i * 0.1}s`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <ShimmerSkeleton
                  className="w-40 h-10 rounded-md mx-auto animate-pulse"
                  style={{ animationDelay: '2.5s' } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* Comments Card */}
          <div className="border rounded-lg border-border bg-surface p-4 sm:p-6 xl:p-8">
            <ShimmerSkeleton
              className="w-48 h-7 rounded-lg mb-6 animate-pulse"
              style={{ animationDelay: '2.6s' } as React.CSSProperties}
            />
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl border border-border p-4"
                >
                  <ShimmerSkeleton
                    className="w-10 h-10 rounded-full flex-shrink-0 animate-pulse"
                    style={
                      {
                        animationDelay: `${2.7 + i * 0.1}s`,
                      } as React.CSSProperties
                    }
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <ShimmerSkeleton
                        className="w-32 h-4 rounded animate-pulse"
                        style={
                          {
                            animationDelay: `${2.8 + i * 0.1}s`,
                          } as React.CSSProperties
                        }
                      />
                      <ShimmerSkeleton
                        className="w-24 h-3 rounded animate-pulse"
                        style={
                          {
                            animationDelay: `${2.9 + i * 0.1}s`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <ShimmerSkeleton
                      className="w-full h-4 rounded animate-pulse"
                      style={
                        {
                          animationDelay: `${3.0 + i * 0.1}s`,
                        } as React.CSSProperties
                      }
                    />
                    <ShimmerSkeleton
                      className="w-3/4 h-4 rounded animate-pulse"
                      style={
                        {
                          animationDelay: `${3.1 + i * 0.1}s`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Form skeleton */}
          <div className="border rounded-lg border-border bg-surface p-4 sm:p-6 xl:p-8">
            <ShimmerSkeleton
              className="w-40 h-6 rounded-lg mb-4 animate-pulse"
              style={{ animationDelay: '2.9s' } as React.CSSProperties}
            />
            <div className="space-y-4">
              <ShimmerSkeleton
                className="w-full h-10 rounded-md animate-pulse"
                style={{ animationDelay: '3.0s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className="w-full h-10 rounded-md animate-pulse"
                style={{ animationDelay: '3.1s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className="w-full h-32 rounded-md animate-pulse"
                style={{ animationDelay: '3.2s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className="w-32 h-10 rounded-md animate-pulse"
                style={{ animationDelay: '3.3s' } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
