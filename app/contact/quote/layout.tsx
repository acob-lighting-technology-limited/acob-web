import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/contact/contact-us.webp');

  return {
    title: 'Get a Quote - ACOB Lighting Technology Limited',
    description:
      'Request a customized quote for your solar energy project from ACOB Lighting Technology Limited. Get expert consultation for mini-grid solutions, street lighting, and renewable energy installations.',
    keywords:
      'solar energy quote, mini-grid quote, street lighting quote, renewable energy consultation, ACOB Lighting quote',
    openGraph: {
      title: 'Get a Quote - ACOB Lighting Technology Limited',
      description:
        'Request a customized quote for your solar energy project from ACOB Lighting.',
      type: 'website',
      url: 'https://acoblighting.com/contact/quote',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Get a Quote from ACOB Lighting',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Get a Quote - ACOB Lighting Technology Limited',
      description: 'Request a customized quote for your solar energy project.',
      images: [ogImage],
    },
  };
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
