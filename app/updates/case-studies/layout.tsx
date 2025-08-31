import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies - ACOB Lighting Technology Limited',
  description: 'Explore detailed case studies of ACOB Lighting Technology Limited\'s successful solar energy projects, mini-grid installations, and renewable energy solutions across Nigeria.',
  keywords: 'ACOB Lighting case studies, solar energy case studies, mini-grid case studies, renewable energy projects, Nigeria solar case studies',
  openGraph: {
    title: 'Case Studies - ACOB Lighting Technology Limited',
    description: 'Explore detailed case studies of ACOB Lighting\'s successful solar energy projects and installations.',
    type: 'website',
    url: 'https://acoblighting.com/updates/case-studies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - ACOB Lighting Technology Limited',
    description: 'Explore detailed case studies of ACOB Lighting\'s successful solar energy projects.',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
