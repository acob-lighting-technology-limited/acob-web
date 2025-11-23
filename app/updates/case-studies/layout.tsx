import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/services/header.webp');

  return {
    title: 'Case Studies - ACOB Lighting Technology Limited',
    description:
      "Explore detailed case studies of ACOB Lighting Technology Limited's successful solar energy projects, mini-grid installations, and renewable energy solutions across Nigeria.",
    keywords:
      'ACOB Lighting case studies, solar energy case studies, mini-grid case studies, renewable energy projects, Nigeria solar case studies',
    openGraph: {
      title: 'Case Studies - ACOB Lighting Technology Limited',
      description:
        "Explore detailed case studies of ACOB Lighting's successful solar energy projects and installations.",
      type: 'website',
      url: 'https://acoblighting.com/updates/case-studies',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Case Studies',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Case Studies - ACOB Lighting Technology Limited',
      description:
        "Explore detailed case studies of ACOB Lighting's successful solar energy projects.",
      images: [ogImage],
    },
  };
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
