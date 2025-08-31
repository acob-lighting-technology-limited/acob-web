import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Updates - ACOB Lighting Technology Limited',
  description: 'Stay updated with the latest news, announcements, and developments from ACOB Lighting Technology Limited. Get the most recent updates on our solar energy projects and industry insights.',
  keywords: 'ACOB Lighting latest news, solar energy updates, renewable energy news, Nigeria solar updates, ACOB Lighting announcements',
  openGraph: {
    title: 'Latest Updates - ACOB Lighting Technology Limited',
    description: 'Stay updated with the latest news and announcements from ACOB Lighting.',
    type: 'website',
    url: 'https://acoblighting.com/updates/latest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Updates - ACOB Lighting Technology Limited',
    description: 'Stay updated with the latest news and announcements from ACOB Lighting.',
  },
};

export default function LatestUpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
