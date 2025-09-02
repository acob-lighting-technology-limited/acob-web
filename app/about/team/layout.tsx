import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team - ACOB Lighting Technology Limited',
  description: 'Meet the dedicated team at ACOB Lighting Technology Limited. Our experienced professionals are committed to delivering innovative solar energy solutions and mini-grid technology across Nigeria.',
  keywords: 'ACOB Lighting team, solar energy professionals, renewable energy experts, Nigeria solar team, ACOB Lighting staff',
  openGraph: {
    title: 'Our Team - ACOB Lighting Technology Limited',
    description: 'Meet the dedicated team at ACOB Lighting committed to delivering innovative solar energy solutions.',
    type: 'website',
    url: 'https://acoblighting.com/about/team',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team - ACOB Lighting Technology Limited',
    description: 'Meet the dedicated team at ACOB Lighting committed to delivering innovative solar energy solutions.',
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
