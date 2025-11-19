'use client';

import { ComingSoon } from '@/components/ui/coming-soon';

// Original certifications page content has been temporarily replaced with Coming Soon page.
// To restore: check git history for the full implementation with certifications,
// recognitions, compliance sections, and AutoCarousel component.

export default function CertificationsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Certifications' },
  ];

  return (
    <ComingSoon
      title="Certifications"
      description="We're updating our certifications and merits information. This page will be available soon!"
      breadcrumbItems={breadcrumbItems}
      backgroundImage="/images/about/certifications.webp"
    />
  );
}
