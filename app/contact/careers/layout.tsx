import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - ACOB Lighting Technology Limited',
  description: 'Join ACOB Lighting Technology Limited and be part of Nigeria\'s energy access revolution. Explore career opportunities in solar energy, mini-grid solutions, and renewable energy technology.',
  keywords: 'ACOB Lighting careers, solar energy jobs, renewable energy careers, Nigeria solar jobs, energy access jobs',
  openGraph: {
    title: 'Careers - ACOB Lighting Technology Limited',
    description: 'Join ACOB Lighting and be part of Nigeria\'s energy access revolution.',
    type: 'website',
    url: 'https://acoblighting.com/contact/careers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers - ACOB Lighting Technology Limited',
    description: 'Join ACOB Lighting and be part of Nigeria\'s energy access revolution.',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
