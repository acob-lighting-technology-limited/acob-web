import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/services/mini-grid-solutions.webp');

  return {
    title: 'Media Gallery - ACOB Lighting Technology Limited',
    description:
      "Browse our media gallery showcasing ACOB Lighting Technology Limited's solar energy projects, mini-grid installations, and renewable energy solutions across Nigeria.",
    keywords:
      'ACOB Lighting gallery, solar energy photos, mini-grid projects gallery, renewable energy images, Nigeria solar projects gallery',
    openGraph: {
      title: 'Media Gallery - ACOB Lighting Technology Limited',
      description:
        "Browse our media gallery showcasing ACOB Lighting's solar energy projects and installations.",
      type: 'website',
      url: 'https://acoblighting.com/updates/gallery',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Media Gallery',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Media Gallery - ACOB Lighting Technology Limited',
      description:
        "Browse our media gallery showcasing ACOB Lighting's solar energy projects.",
      images: [ogImage],
    },
  };
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
