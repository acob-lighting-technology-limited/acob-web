import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ACOB Lighting Technology Limited',
  description: 'Read ACOB Lighting Technology Limited\'s privacy policy to understand how we collect, use, and protect your personal information when you use our services.',
  keywords: 'privacy policy, ACOB Lighting privacy, data protection, personal information, privacy statement',
  openGraph: {
    title: 'Privacy Policy - ACOB Lighting Technology Limited',
    description: 'Read ACOB Lighting\'s privacy policy to understand how we protect your personal information.',
    type: 'website',
    url: 'https://acoblighting.com/privacy-policy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - ACOB Lighting Technology Limited',
    description: 'Read ACOB Lighting\'s privacy policy to understand how we protect your personal information.',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
