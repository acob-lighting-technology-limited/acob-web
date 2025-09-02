import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Details - ACOB Lighting Technology Limited',
  description: 'Learn about ACOB Lighting Technology Limited\'s comprehensive solar energy services including mini-grid solutions, captive power, energy audit, installation, and maintenance services.',
  keywords: 'ACOB Lighting services, solar energy services, mini-grid solutions, captive power, energy audit, solar installation, maintenance services',
  openGraph: {
    title: 'Service Details - ACOB Lighting Technology Limited',
    description: 'Learn about ACOB Lighting\'s comprehensive solar energy services and solutions.',
    type: 'website',
    url: 'https://acoblighting.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Details - ACOB Lighting Technology Limited',
    description: 'Learn about ACOB Lighting\'s comprehensive solar energy services.',
  },
};

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
