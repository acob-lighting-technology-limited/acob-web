import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Opportunity - ACOB Lighting Technology Limited',
  description: 'Explore career opportunities at ACOB Lighting Technology Limited. Join our team and be part of Nigeria\'s energy access revolution in solar energy and mini-grid solutions.',
  keywords: 'ACOB Lighting career opportunity, solar energy jobs, renewable energy careers, Nigeria solar jobs, energy access jobs',
  openGraph: {
    title: 'Career Opportunity - ACOB Lighting Technology Limited',
    description: 'Explore career opportunities at ACOB Lighting and be part of Nigeria\'s energy access revolution.',
    type: 'website',
    url: 'https://acoblighting.com/contact/careers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Opportunity - ACOB Lighting Technology Limited',
    description: 'Explore career opportunities at ACOB Lighting and be part of Nigeria\'s energy access revolution.',
  },
};

export default function CareerSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
