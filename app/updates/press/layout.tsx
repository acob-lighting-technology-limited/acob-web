import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Releases - ACOB Lighting Technology Limited',
  description: 'Read the latest press releases and media coverage from ACOB Lighting Technology Limited. Stay updated with our latest announcements, project launches, and industry insights.',
  keywords: 'ACOB Lighting press releases, solar energy news, renewable energy announcements, Nigeria solar press, ACOB Lighting media coverage',
  openGraph: {
    title: 'Press Releases - ACOB Lighting Technology Limited',
    description: 'Read the latest press releases and media coverage from ACOB Lighting.',
    type: 'website',
    url: 'https://acoblighting.com/updates/press',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Releases - ACOB Lighting Technology Limited',
    description: 'Read the latest press releases and media coverage from ACOB Lighting.',
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
