import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOgImageUrl('/images/contact/contact-us.webp');

  return {
    title: 'Privacy Policy - ACOB Lighting Technology Limited',
    description:
      "Read ACOB Lighting Technology Limited's privacy policy to understand how we collect, use, and protect your personal information when you use our services.",
    keywords:
      'privacy policy, ACOB Lighting privacy, data protection, personal information, privacy statement',
    openGraph: {
      title: 'Privacy Policy - ACOB Lighting Technology Limited',
      description:
        "Read ACOB Lighting's privacy policy to understand how we protect your personal information.",
      type: 'website',
      url: 'https://acoblighting.com/privacy-policy',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Privacy Policy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy - ACOB Lighting Technology Limited',
      description:
        "Read ACOB Lighting's privacy policy to understand how we protect your personal information.",
      images: [ogImage],
    },
  };
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
