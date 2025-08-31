import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story - ACOB Lighting Technology Limited',
  description: 'Discover the journey of ACOB Lighting Technology Limited from street lighting pioneers to leading solar energy solutions provider in Nigeria. Learn about our milestones and growth.',
  keywords: 'ACOB Lighting story, company history, solar energy journey, Nigeria energy access, ACOB Lighting milestones',
  openGraph: {
    title: 'Our Story - ACOB Lighting Technology Limited',
    description: 'Discover the journey of ACOB Lighting from street lighting pioneers to leading solar energy solutions provider.',
    type: 'website',
    url: 'https://acoblighting.com/about/our-story',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story - ACOB Lighting Technology Limited',
    description: 'Discover the journey of ACOB Lighting from street lighting pioneers to leading solar energy solutions provider.',
  },
};

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
