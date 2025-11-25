import { Metadata } from 'next';
import { aboutSections } from '@/lib/data';
import { getOgImageUrl } from '@/lib/utils/og-image';
import { COMPANY_INFO } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  // Get first about section image from carousel (remove query params)
  const firstSection = aboutSections.find(s => s.image);
  const imageUrl = firstSection?.image?.split('?')[0] || '';
  const ogImage = imageUrl
    ? getOgImageUrl(imageUrl)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: 'About Us - ACOB Lighting Technology Limited',
    description: `Learn about ACOB Lighting Technology Limited, a pioneering solar energy company established in 2016. We have deployed projects in ${COMPANY_INFO.stats.communitiesDeployed} communities, built ${COMPANY_INFO.stats.installedCapacityKwp} kWp combined system size, and power ${COMPANY_INFO.stats.totalConnections.toLocaleString()} connections across Nigeria.`,
    keywords:
      'ACOB Lighting, solar energy company, Nigeria, renewable energy, mini-grid solutions, street lighting, about us',
    openGraph: {
      title: 'About Us - ACOB Lighting Technology Limited',
      description:
        "Pioneering Nigeria's energy access revolution with solar mini-grid solutions and street lighting infrastructure.",
      type: 'website',
      url: 'https://acoblighting.com/about',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'About ACOB Lighting Technology Limited',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Us - ACOB Lighting Technology Limited',
      description:
        "Pioneering Nigeria's energy access revolution with solar mini-grid solutions.",
      images: [ogImage],
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
