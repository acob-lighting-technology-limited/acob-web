import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/contact/support.webp');

  return {
    title: 'Customer Support - ACOB Lighting Technology Limited',
    description:
      'Get expert customer support for your solar energy systems and mini-grid solutions from ACOB Lighting Technology Limited. Find answers to FAQs and technical assistance.',
    keywords:
      'solar energy support, mini-grid support, customer service, technical assistance, ACOB Lighting support, solar system maintenance',
    openGraph: {
      title: 'Customer Support - ACOB Lighting Technology Limited',
      description:
        'Get expert customer support for your solar energy systems and mini-grid solutions.',
      type: 'website',
      url: 'https://acoblighting.com/contact/support',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Customer Support',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Customer Support - ACOB Lighting Technology Limited',
      description: 'Get expert customer support for your solar energy systems.',
      images: [ogImage],
    },
  };
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
