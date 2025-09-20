import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { MaintenancePage } from '@/components/ui/maintenance-page';

export default function TeamPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Meet Our Team' },
  ];

  return (
    <>
      <PageHero
        title="Meet Our Team"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
        
        <MaintenancePage 
          routeName="Meet Our Team"
          description="We're currently updating our team information. Please check back soon to meet the amazing people behind ACOB Lighting!"
        />
      </Container>
    </>
  );
}
