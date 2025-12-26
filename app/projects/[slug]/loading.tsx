import { PageHeroSkeleton, ContentSkeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <>
      <PageHeroSkeleton />
      <Container className="px-4 py-8">
        <ContentSkeleton />
      </Container>
    </>
  );
}
