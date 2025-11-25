import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/services/mini-grid-solutions.webp');

  return {
    title: 'Resources & Downloads - Brochures, Certifications | ACOB Lighting',
    description:
      'Download product brochures, technical specifications, certifications, installation guides, and other resources from ACOB Lighting Technology Limited.',
    keywords:
      'solar brochures, product specifications, certifications, installation guides, technical documentation, solar resources, renewable energy guides',
    openGraph: {
      title: 'Resources & Downloads - ACOB Lighting Technology Limited',
      description:
        'Access comprehensive solar energy resources, product brochures, and technical documentation.',
      type: 'website',
      url: 'https://acoblighting.com/resources',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Resources & Downloads',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Resources & Downloads - ACOB Lighting Technology Limited',
      description:
        'Access comprehensive solar energy resources, product brochures, and technical documentation.',
      images: [ogImage],
    },
  };
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
