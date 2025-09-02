import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Locations - ACOB Lighting Technology Limited',
  description: 'Find ACOB Lighting Technology Limited offices and service locations across Nigeria. We provide solar energy solutions and mini-grid services throughout the country.',
  keywords: 'ACOB Lighting locations, Nigeria offices, solar energy services locations, mini-grid service areas, ACOB Lighting contact locations',
  openGraph: {
    title: 'Our Locations - ACOB Lighting Technology Limited',
    description: 'Find ACOB Lighting offices and service locations across Nigeria.',
    type: 'website',
    url: 'https://acoblighting.com/contact/locations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Locations - ACOB Lighting Technology Limited',
    description: 'Find ACOB Lighting offices and service locations across Nigeria.',
  },
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
