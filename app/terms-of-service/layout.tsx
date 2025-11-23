import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/contact/contact-us.webp');

  return {
    title: 'Terms of Service - ACOB Lighting Technology Limited',
    description:
      "Read ACOB Lighting Technology Limited's terms of service to understand the terms and conditions governing the use of our services and website.",
    keywords:
      'terms of service, ACOB Lighting terms, service conditions, website terms, legal terms',
    openGraph: {
      title: 'Terms of Service - ACOB Lighting Technology Limited',
      description:
        "Read ACOB Lighting's terms of service to understand the terms and conditions governing our services.",
      type: 'website',
      url: 'https://acoblighting.com/terms-of-service',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Terms of Service',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terms of Service - ACOB Lighting Technology Limited',
      description:
        "Read ACOB Lighting's terms of service to understand the terms and conditions governing our services.",
      images: [ogImage],
    },
  };
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
