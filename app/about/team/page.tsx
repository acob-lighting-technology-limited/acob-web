import { ComingSoon } from '@/components/ui/coming-soon';
import { getAboutSectionByHref } from '@/lib/data/about-data';

// Original team page content has been temporarily replaced with Coming Soon page.
// To restore: check git history for the full implementation with team members,
// leadership philosophy, team snapshot, and project delivery pods sections.

export default function TeamPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Meet Our Team' },
  ];

  const aboutSection = getAboutSectionByHref('/about/team');

  return (
    <ComingSoon
      title="Meet Our Team"
      description="We're updating our team information. This page will be available soon!"
      breadcrumbItems={breadcrumbItems}
      backgroundImage={aboutSection?.image || '/images/about/acob-team.webp'}
    />
  );
}
