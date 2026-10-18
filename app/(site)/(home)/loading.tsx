import {
  ShimmerSkeleton,
  SectionSkeleton,
  SHIMMER_ON_DARK as ON_DARK,
} from '@/components/ui/skeleton';

// Homepage-specific fallback. HeroSectionV2 is a full h-screen carousel with
// bottom-left content, so it's approximated directly rather than reused from
// the generic PageHeroSkeleton (built for the simpler Hero component).
//
// The hero block is dark in both themes: the real hero is a photo under a
// dark overlay, so a theme-grey block flashed light before it snapped to dark.
export default function Loading() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950 to-zinc-900" />
        <div className="absolute inset-0 flex items-end pb-16 md:pb-20">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-xl">
              <ShimmerSkeleton className={`h-6 w-48 rounded-full ${ON_DARK}`} />
              <ShimmerSkeleton
                className={`mt-6 h-10 w-full md:h-14 ${ON_DARK}`}
                style={{ animationDelay: '0.1s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className={`mt-3 h-10 w-4/5 md:h-14 ${ON_DARK}`}
                style={{ animationDelay: '0.15s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className={`mt-6 h-4 w-3/4 ${ON_DARK}`}
                style={{ animationDelay: '0.2s' } as React.CSSProperties}
              />
              <ShimmerSkeleton
                className={`mt-2 h-4 w-2/3 ${ON_DARK}`}
                style={{ animationDelay: '0.25s' } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
      <SectionSkeleton delay={0.1} />
      <SectionSkeleton delay={0.2} />
    </>
  );
}
