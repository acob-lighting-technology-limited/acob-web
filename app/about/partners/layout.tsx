import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/about/partners-collage.webp');

  return {
    title: 'Our Partners - ACOB Lighting Technology Limited',
    description:
      'Discover ACOB Lighting Technology Limited trusted partners and strategic collaborations. We work with leading organizations, government agencies, and technology providers to deliver sustainable energy solutions across Nigeria.',
    keywords:
      'ACOB Lighting partners, strategic partnerships, renewable energy collaborations, Nigeria energy partners, ACOB Lighting alliances',
    openGraph: {
      title: 'Our Partners - ACOB Lighting Technology Limited',
      description:
        'Discover our trusted partners and strategic collaborations driving sustainable energy solutions across Nigeria.',
      type: 'website',
      url: 'https://acoblighting.com/about/partners',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Partners',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Partners - ACOB Lighting Technology Limited',
      description:
        'Discover our trusted partners and strategic collaborations driving sustainable energy solutions.',
      images: [ogImage],
    },
  };
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
