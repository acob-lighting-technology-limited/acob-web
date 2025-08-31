import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - ACOB Lighting Technology Limited',
  description: 'Get in touch with ACOB Lighting Technology Limited. We provide support, career opportunities, and assistance with all your clean energy needs across Nigeria.',
  keywords: 'contact ACOB Lighting, solar energy support, career opportunities, customer service, Nigeria solar company contact',
  openGraph: {
    title: 'Contact Us - ACOB Lighting Technology Limited',
    description: 'Get in touch with ACOB Lighting for support, career opportunities, and clean energy solutions.',
    type: 'website',
    url: 'https://acoblighting.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - ACOB Lighting Technology Limited',
    description: 'Get in touch with ACOB Lighting for support and clean energy solutions.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
