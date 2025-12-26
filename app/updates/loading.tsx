import { PageHeroSkeleton } from '@/components/ui/skeleton';
import { UpdatesGridSkeleton } from '@/components/ui/updates-grid-skeleton';
import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <>
      <PageHeroSkeleton />
      <Container className="px-4 py-8">
        <UpdatesGridSkeleton />
      </Container>
    </>
  );
}
