import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { MaintenancePage } from '@/components/ui/maintenance-page';

export default function CertificationsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Certifications' },
  ];

  return (
    <>
      <PageHero
        title="Certifications & Awards"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <MaintenancePage 
          routeName="Certifications & Awards"
          description="We're currently updating our certifications and awards information. Please check back soon to see our industry recognitions and quality standards!"
        />
      </Container>
    </>
  );
}
