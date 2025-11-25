import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: 'Company Profile - ACOB Lighting Technology Limited',
    description:
      'Comprehensive company profile of ACOB Lighting Technology Limited - a foremost micro utility renewable energy company in Nigeria. Learn about our vision, mission, core values, services, and completed projects in solar energy solutions.',
    keywords:
      'ACOB company profile, renewable energy Nigeria, solar company profile, mini-grid solutions, captive power, street lighting, energy audit, EPC services, operations and maintenance, solar projects Nigeria',
    openGraph: {
      title: 'Company Profile - ACOB Lighting Technology Limited',
      description:
        'Discover ACOB Lighting Technology Limited - Lighting up Nigeria with clean, affordable, and sustainable power through renewable energy solutions since 2016.',
      type: 'website',
      url: 'https://acoblighting.com/company-profile',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Technology Company Profile',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Company Profile - ACOB Lighting Technology Limited',
      description:
        'Lighting up Nigeria with clean, affordable, and sustainable renewable energy solutions.',
      images: [ogImage],
    },
  };
}

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
