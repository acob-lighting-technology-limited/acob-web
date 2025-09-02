import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - ACOB Lighting Technology Limited',
  description: 'Learn about ACOB Lighting Technology Limited, a pioneering solar energy company established in 2016. We have deployed projects in 9 communities, built 690 kWp combined system size, and power 2,306 connections across Nigeria.',
  keywords: 'ACOB Lighting, solar energy company, Nigeria, renewable energy, mini-grid solutions, street lighting, about us',
  openGraph: {
    title: 'About Us - ACOB Lighting Technology Limited',
    description: 'Pioneering Nigeria\'s energy access revolution with solar mini-grid solutions and street lighting infrastructure.',
    type: 'website',
    url: 'https://acoblighting.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - ACOB Lighting Technology Limited',
    description: 'Pioneering Nigeria\'s energy access revolution with solar mini-grid solutions.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
