import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/contact/office-location-hero.webp');

  return {
    title: 'Our Locations - ACOB Lighting Technology Limited',
    description:
      'Find ACOB Lighting Technology Limited offices and service locations across Nigeria. We provide solar energy solutions and mini-grid services throughout the country.',
    keywords:
      'ACOB Lighting locations, Nigeria offices, solar energy services locations, mini-grid service areas, ACOB Lighting contact locations',
    openGraph: {
      title: 'Our Locations - ACOB Lighting Technology Limited',
      description:
        'Find ACOB Lighting offices and service locations across Nigeria.',
      type: 'website',
      url: 'https://acoblighting.com/contact/locations',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Office Locations',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Locations - ACOB Lighting Technology Limited',
      description:
        'Find ACOB Lighting offices and service locations across Nigeria.',
      images: [ogImage],
    },
  };
}

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
