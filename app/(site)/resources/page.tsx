import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ResourcesSection } from '@/components/resources/resources-section';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export default function ResourcesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources' },
  ];

  return (
    <>
      <Hero
        title="Resources & Downloads"
        description="Everything You Need."
        image="/images/services/solar-installation.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>Downloads &amp; guides</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Browse our library of product brochures, technical specifications,
            installation guides, and certifications.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <ResourcesSection />
        </div>
      </Container>
    </>
  );
}
