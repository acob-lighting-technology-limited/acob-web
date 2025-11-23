import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/about/certifications.webp');

  return {
    title: 'Certifications - ACOB Lighting Technology Limited',
    description:
      "View ACOB Lighting Technology Limited's certifications and accreditations. We maintain the highest standards in solar energy solutions and mini-grid technology across Nigeria.",
    keywords:
      'ACOB Lighting certifications, solar energy certifications, renewable energy accreditations, Nigeria solar certifications, quality standards',
    openGraph: {
      title: 'Certifications - ACOB Lighting Technology Limited',
      description:
        "View ACOB Lighting's certifications and accreditations for solar energy solutions.",
      type: 'website',
      url: 'https://acoblighting.com/about/certifications',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Certifications',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Certifications - ACOB Lighting Technology Limited',
      description:
        "View ACOB Lighting's certifications and accreditations for solar energy solutions.",
      images: [ogImage],
    },
  };
}

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
