import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/services/mini-grid-solutions.webp');

  return {
    title: 'Product Catalog - Solar Equipment & Components | ACOB Lighting',
    description:
      'Browse our comprehensive catalog of solar panels, inverters, batteries, and accessories. High-quality solar equipment for residential, commercial, and industrial applications.',
    keywords:
      'solar panels, solar inverters, lithium batteries, solar equipment, solar components, renewable energy products, solar accessories, Nigeria',
    openGraph: {
      title: 'Product Catalog - ACOB Lighting Technology Limited',
      description:
        'Comprehensive range of solar equipment including panels, inverters, batteries, and accessories.',
      type: 'website',
      url: 'https://acoblighting.com/products',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Product Catalog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Product Catalog - ACOB Lighting Technology Limited',
      description:
        'Comprehensive range of solar equipment including panels, inverters, batteries, and accessories.',
      images: [ogImage],
    },
  };
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
