import { ComingSoon } from '@/components/ui/coming-soon';

// Original quote page content has been temporarily replaced with Coming Soon page.
// To restore: check git history for the full implementation with QuoteForm component.

export default function GetQuotePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Get a Quote' },
  ];

  return (
    <ComingSoon
      title="Get a Quote"
      description="We're working on an improved quote request system. This page will be available soon!"
      breadcrumbItems={breadcrumbItems}
      backgroundImage="/images/contact/contact-us.webp?height=400&width=1200"
    />
  );
}
