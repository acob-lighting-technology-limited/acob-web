import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Updates & Media - ACOB Lighting Technology Limited',
  description: 'Stay updated with the latest news, case studies, press releases, and media coverage from ACOB Lighting Technology Limited. Discover our latest projects and industry insights.',
  keywords: 'ACOB Lighting news, solar energy updates, case studies, press releases, media coverage, renewable energy news, Nigeria solar updates',
  openGraph: {
    title: 'Updates & Media - ACOB Lighting Technology Limited',
    description: 'Latest news, case studies, press releases, and media coverage from ACOB Lighting.',
    type: 'website',
    url: 'https://acoblighting.com/updates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Updates & Media - ACOB Lighting Technology Limited',
    description: 'Latest news, case studies, and media coverage from ACOB Lighting.',
  },
};

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
