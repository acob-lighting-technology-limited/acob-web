import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - ACOB Lighting Technology Limited',
  description: 'Explore our comprehensive solar energy services including mini-grid solutions, captive power, energy audit, installation, and maintenance services across Nigeria.',
  keywords: 'solar services, mini-grid solutions, captive power, energy audit, solar installation, maintenance services, ACOB Lighting',
  openGraph: {
    title: 'Services - ACOB Lighting Technology Limited',
    description: 'Comprehensive solar energy services including mini-grid solutions, captive power, energy audit, installation, and maintenance.',
    type: 'website',
    url: 'https://acoblighting.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - ACOB Lighting Technology Limited',
    description: 'Comprehensive solar energy services for manufacturers, installers & contractors.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
