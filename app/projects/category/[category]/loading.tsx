import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProjectsGridSkeleton, ProjectsSidebarSkeleton } from '@/components/ui/projects-grid-skeleton';

export default function Loading() {
  return (
    <>
      <PageHero
        title="Loading..."
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Loading...' }
          ]} 
          className="mb-8" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ProjectsGridSkeleton />
          </div>

          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <ProjectsSidebarSkeleton />
          </div>
        </div>
      </Container>
    </>
  );
}
