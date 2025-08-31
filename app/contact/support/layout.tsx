import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Support - ACOB Lighting Technology Limited',
  description: 'Get expert customer support for your solar energy systems and mini-grid solutions from ACOB Lighting Technology Limited. Find answers to FAQs and technical assistance.',
  keywords: 'solar energy support, mini-grid support, customer service, technical assistance, ACOB Lighting support, solar system maintenance',
  openGraph: {
    title: 'Customer Support - ACOB Lighting Technology Limited',
    description: 'Get expert customer support for your solar energy systems and mini-grid solutions.',
    type: 'website',
    url: 'https://acoblighting.com/contact/support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Support - ACOB Lighting Technology Limited',
    description: 'Get expert customer support for your solar energy systems.',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
