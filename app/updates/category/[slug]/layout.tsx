import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category Updates - ACOB Lighting Technology Limited',
  description: 'Browse updates and news by category from ACOB Lighting Technology Limited. Find specific content including case studies, press releases, and industry insights.',
  keywords: 'ACOB Lighting category updates, solar energy news by category, renewable energy updates, Nigeria solar news categories',
  openGraph: {
    title: 'Category Updates - ACOB Lighting Technology Limited',
    description: 'Browse updates and news by category from ACOB Lighting.',
    type: 'website',
    url: 'https://acoblighting.com/updates/category',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Category Updates - ACOB Lighting Technology Limited',
    description: 'Browse updates and news by category from ACOB Lighting.',
  },
};

export default function UpdateCategorySlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
