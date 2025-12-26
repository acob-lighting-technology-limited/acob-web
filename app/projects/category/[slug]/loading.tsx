import { PageHeroSkeleton } from '@/components/ui/skeleton';
import { ProjectsGridSkeleton } from '@/components/ui/projects-grid-skeleton';
import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <>
      <PageHeroSkeleton />
      <Container className="px-4 py-8">
        <ProjectsGridSkeleton />
      </Container>
    </>
  );
}
