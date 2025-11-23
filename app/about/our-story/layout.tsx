import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/about/our-story.webp');

  return {
    title: 'Our Story - ACOB Lighting Technology Limited',
    description:
      'Discover the journey of ACOB Lighting Technology Limited from street lighting pioneers to leading solar energy solutions provider in Nigeria. Learn about our milestones and growth.',
    keywords:
      'ACOB Lighting story, company history, solar energy journey, Nigeria energy access, ACOB Lighting milestones',
    openGraph: {
      title: 'Our Story - ACOB Lighting Technology Limited',
      description:
        'Discover the journey of ACOB Lighting from street lighting pioneers to leading solar energy solutions provider.',
      type: 'website',
      url: 'https://acoblighting.com/about/our-story',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Our Story',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Story - ACOB Lighting Technology Limited',
      description:
        'Discover the journey of ACOB Lighting from street lighting pioneers to leading solar energy solutions provider.',
      images: [ogImage],
    },
  };
}

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
