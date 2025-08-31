import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Details - ACOB Lighting Technology Limited',
  description: 'Explore detailed information about ACOB Lighting Technology Limited\'s solar energy projects, mini-grid installations, and renewable energy solutions across Nigeria.',
  keywords: 'ACOB Lighting projects, solar energy project details, mini-grid installations, renewable energy projects, Nigeria solar projects',
  openGraph: {
    title: 'Project Details - ACOB Lighting Technology Limited',
    description: 'Explore detailed information about ACOB Lighting\'s solar energy projects and installations.',
    type: 'website',
    url: 'https://acoblighting.com/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Details - ACOB Lighting Technology Limited',
    description: 'Explore detailed information about ACOB Lighting\'s solar energy projects.',
  },
};

export default function ProjectSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
