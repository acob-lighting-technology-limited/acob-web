import { Metadata } from 'next';
import { servicesData } from '@/lib/data';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  // Get first service image from carousel
  const firstService = servicesData.find(s => s.image);
  const ogImage = firstService?.image
    ? getOgImageUrl(firstService.image)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: 'Services - ACOB Lighting Technology Limited',
    description:
      'Explore our comprehensive solar energy services including mini-grid solutions, captive power, energy audit, installation, and maintenance services across Nigeria.',
    keywords:
      'solar services, mini-grid solutions, captive power, energy audit, solar installation, maintenance services, ACOB Lighting',
    openGraph: {
      title: 'Services - ACOB Lighting Technology Limited',
      description:
        'Comprehensive solar energy services including mini-grid solutions, captive power, energy audit, installation, and maintenance.',
      type: 'website',
      url: 'https://acoblighting.com/services',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Services - Solar Energy Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Services - ACOB Lighting Technology Limited',
      description:
        'Comprehensive solar energy services for manufacturers, installers & contractors.',
      images: [ogImage],
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
