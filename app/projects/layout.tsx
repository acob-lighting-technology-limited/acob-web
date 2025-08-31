import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - ACOB Lighting Technology Limited',
  description: 'Explore our portfolio of successful solar energy projects including mini-grid installations, street lighting, and renewable energy solutions across Nigeria.',
  keywords: 'solar projects, mini-grid installations, street lighting projects, renewable energy portfolio, ACOB Lighting projects, Nigeria solar projects',
  openGraph: {
    title: 'Projects - ACOB Lighting Technology Limited',
    description: 'Portfolio of successful solar energy projects including mini-grid installations and street lighting solutions.',
    type: 'website',
    url: 'https://acoblighting.com/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - ACOB Lighting Technology Limited',
    description: 'Portfolio of successful solar energy projects across Nigeria.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
