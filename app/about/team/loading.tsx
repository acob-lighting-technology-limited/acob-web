import { PageHeroSkeleton, ContentSkeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <PageHeroSkeleton />
      <div className="px-4 py-8 bg-muted">
        <ContentSkeleton />
      </div>
    </>
  );
}
