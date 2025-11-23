import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/services/header.webp');

  return {
    title: 'Latest Updates - ACOB Lighting Technology Limited',
    description:
      'Stay updated with the latest news, announcements, and developments from ACOB Lighting Technology Limited. Get the most recent updates on our solar energy projects and industry insights.',
    keywords:
      'ACOB Lighting latest news, solar energy updates, renewable energy news, Nigeria solar updates, ACOB Lighting announcements',
    openGraph: {
      title: 'Latest Updates - ACOB Lighting Technology Limited',
      description:
        'Stay updated with the latest news and announcements from ACOB Lighting.',
      type: 'website',
      url: 'https://acoblighting.com/updates/latest',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Latest Updates',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Latest Updates - ACOB Lighting Technology Limited',
      description:
        'Stay updated with the latest news and announcements from ACOB Lighting.',
      images: [ogImage],
    },
  };
}

export default function LatestUpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
