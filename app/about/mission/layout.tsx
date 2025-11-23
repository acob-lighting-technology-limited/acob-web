import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/about/mission-vision.webp');

  return {
    title: 'Our Mission - ACOB Lighting Technology Limited',
    description:
      "Learn about ACOB Lighting Technology Limited's mission to provide sustainable energy access through innovative solar solutions and mini-grid technology across Nigeria.",
    keywords:
      'ACOB Lighting mission, sustainable energy, solar energy mission, Nigeria energy access, renewable energy goals',
    openGraph: {
      title: 'Our Mission - ACOB Lighting Technology Limited',
      description:
        "Learn about ACOB Lighting's mission to provide sustainable energy access through innovative solar solutions.",
      type: 'website',
      url: 'https://acoblighting.com/about/mission',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Mission & Vision',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Mission - ACOB Lighting Technology Limited',
      description:
        "Learn about ACOB Lighting's mission to provide sustainable energy access through innovative solar solutions.",
      images: [ogImage],
    },
  };
}

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
