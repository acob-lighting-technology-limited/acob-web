import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ACOB Lighting Technology Limited',
  description: 'Read ACOB Lighting Technology Limited\'s terms of service to understand the terms and conditions governing the use of our services and website.',
  keywords: 'terms of service, ACOB Lighting terms, service conditions, website terms, legal terms',
  openGraph: {
    title: 'Terms of Service - ACOB Lighting Technology Limited',
    description: 'Read ACOB Lighting\'s terms of service to understand the terms and conditions governing our services.',
    type: 'website',
    url: 'https://acoblighting.com/terms-of-service',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - ACOB Lighting Technology Limited',
    description: 'Read ACOB Lighting\'s terms of service to understand the terms and conditions governing our services.',
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
