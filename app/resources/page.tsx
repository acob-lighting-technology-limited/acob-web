import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ResourcesSection } from '@/components/resources/resources-section';

export default function ResourcesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources' },
  ];

  return (
    <>
      <PageHero
        title="Resources & Downloads"
        description="Access comprehensive product information, guides, and certifications"
        backgroundImage="/images/services/solar-installation.webp"
      />

      <Container className="px-4 py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse our comprehensive library of resources including product
            brochures, technical specifications, installation guides, and
            certifications.
          </p>
        </div>

        <ResourcesSection />
      </Container>
    </>
  );
}
