import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission - ACOB Lighting Technology Limited',
  description: 'Learn about ACOB Lighting Technology Limited\'s mission to provide sustainable energy access through innovative solar solutions and mini-grid technology across Nigeria.',
  keywords: 'ACOB Lighting mission, sustainable energy, solar energy mission, Nigeria energy access, renewable energy goals',
  openGraph: {
    title: 'Our Mission - ACOB Lighting Technology Limited',
    description: 'Learn about ACOB Lighting\'s mission to provide sustainable energy access through innovative solar solutions.',
    type: 'website',
    url: 'https://acoblighting.com/about/mission',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Mission - ACOB Lighting Technology Limited',
    description: 'Learn about ACOB Lighting\'s mission to provide sustainable energy access through innovative solar solutions.',
  },
};

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
