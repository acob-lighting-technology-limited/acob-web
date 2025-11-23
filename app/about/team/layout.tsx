import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/about/acob-team.webp');

  return {
    title: 'Our Team - ACOB Lighting Technology Limited',
    description:
      'Meet the dedicated team at ACOB Lighting Technology Limited. Our experienced professionals are committed to delivering innovative solar energy solutions and mini-grid technology across Nigeria.',
    keywords:
      'ACOB Lighting team, solar energy professionals, renewable energy experts, Nigeria solar team, ACOB Lighting staff',
    openGraph: {
      title: 'Our Team - ACOB Lighting Technology Limited',
      description:
        'Meet the dedicated team at ACOB Lighting committed to delivering innovative solar energy solutions.',
      type: 'website',
      url: 'https://acoblighting.com/about/team',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Team',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Team - ACOB Lighting Technology Limited',
      description:
        'Meet the dedicated team at ACOB Lighting committed to delivering innovative solar energy solutions.',
      images: [ogImage],
    },
  };
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
