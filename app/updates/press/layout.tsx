import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/services/header.webp');

  return {
    title: 'Press Releases - ACOB Lighting Technology Limited',
    description:
      'Read the latest press releases and media coverage from ACOB Lighting Technology Limited. Stay updated with our latest announcements, project launches, and industry insights.',
    keywords:
      'ACOB Lighting press releases, solar energy news, renewable energy announcements, Nigeria solar press, ACOB Lighting media coverage',
    openGraph: {
      title: 'Press Releases - ACOB Lighting Technology Limited',
      description:
        'Read the latest press releases and media coverage from ACOB Lighting.',
      type: 'website',
      url: 'https://acoblighting.com/updates/press',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Press Releases',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Press Releases - ACOB Lighting Technology Limited',
      description:
        'Read the latest press releases and media coverage from ACOB Lighting.',
      images: [ogImage],
    },
  };
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
