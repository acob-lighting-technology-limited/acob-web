import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Details - ACOB Lighting Technology Limited',
  description: 'Read detailed updates, news, case studies, and press releases from ACOB Lighting Technology Limited. Stay informed about our latest solar energy projects and industry developments.',
  keywords: 'ACOB Lighting updates, solar energy news, case studies, press releases, renewable energy updates, Nigeria solar news',
  openGraph: {
    title: 'Update Details - ACOB Lighting Technology Limited',
    description: 'Read detailed updates, news, case studies, and press releases from ACOB Lighting.',
    type: 'website',
    url: 'https://acoblighting.com/updates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Update Details - ACOB Lighting Technology Limited',
    description: 'Read detailed updates, news, case studies, and press releases from ACOB Lighting.',
  },
};

export default function UpdateSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
