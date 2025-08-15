export function ProjectsSkeleton() {
  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-700">
      {/* Title skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mx-auto max-w-2xl mb-4" />
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mx-auto max-w-xl" />
      </div>

      {/* Project cards skeleton */}
      <div className="space-y-8">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="relative max-w-6xl mx-auto px-4"
            style={{ top: `calc(-1vh + ${i * 25}px)` }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Image skeleton */}
                <div className="relative h-64 lg:h-80">
                  <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>

                {/* Content skeleton */}
                <div className="flex flex-col justify-center space-y-4">
                  {/* Title skeleton */}
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4" />

                  {/* Location skeleton */}
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/2" />

                  {/* Description skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                  </div>

                  {/* Button skeleton */}
                  <div className="pt-4">
                    <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Projects button skeleton */}
      <div className="text-center mt-8">
        <div className="h-12 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mx-auto" />
      </div>
    </section>
  );
}
