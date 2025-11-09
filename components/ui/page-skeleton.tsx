/**
 * Generic page loading skeleton for async pages
 * Used for About, Services, Contact pages that don't have custom skeletons
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[50vh] md:h-[60vh] bg-muted" />

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Title */}
        <div className="h-8 bg-muted rounded w-1/3 mx-auto" />

        {/* Subtitle */}
        <div className="h-4 bg-muted rounded w-2/3 mx-auto" />

        {/* Content sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="space-y-4 rounded-3xl border border-border bg-surface p-6"
            >
              <div className="h-48 bg-muted rounded-2xl" />
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Services page specific skeleton
 */
export function ServicesPageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[50vh] md:h-[60vh] bg-muted" />

      <div className="container mx-auto px-4 py-12">
        {/* Services grid skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="rounded-3xl border border-border bg-surface p-6 space-y-4"
            >
              <div className="h-12 w-12 bg-muted rounded-full" />
              <div className="h-6 bg-muted rounded w-2/3" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
              <div className="h-10 bg-muted rounded-full w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Contact page specific skeleton
 */
export function ContactPageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[50vh] md:h-[60vh] bg-muted" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact form skeleton */}
          <div className="space-y-6 rounded-3xl border border-border bg-surface p-8">
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-12 bg-muted rounded" />
                </div>
              ))}
              <div className="h-32 bg-muted rounded" />
              <div className="h-12 bg-muted rounded-full" />
            </div>
          </div>

          {/* Contact info skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-surface p-6 space-y-3"
              >
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="h-5 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * About page specific skeleton
 */
export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero carousel skeleton */}
      <div className="h-[50vh] md:h-[60vh] bg-muted relative">
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="h-2 w-2 bg-muted-foreground/30 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Intro section skeleton */}
        <div className="rounded-3xl border border-border bg-surface p-8 space-y-4">
          <div className="h-6 bg-muted rounded w-32 mx-auto" />
          <div className="h-8 bg-muted rounded w-2/3 mx-auto" />
          <div className="h-4 bg-muted rounded w-5/6 mx-auto" />
        </div>

        {/* Cards grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="rounded-3xl border border-border bg-surface overflow-hidden"
            >
              <div className="aspect-[16/9] bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-10 bg-muted rounded-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
