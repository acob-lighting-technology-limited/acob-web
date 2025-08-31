import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications - ACOB Lighting Technology Limited',
  description: 'View ACOB Lighting Technology Limited\'s certifications and accreditations. We maintain the highest standards in solar energy solutions and mini-grid technology across Nigeria.',
  keywords: 'ACOB Lighting certifications, solar energy certifications, renewable energy accreditations, Nigeria solar certifications, quality standards',
  openGraph: {
    title: 'Certifications - ACOB Lighting Technology Limited',
    description: 'View ACOB Lighting\'s certifications and accreditations for solar energy solutions.',
    type: 'website',
    url: 'https://acoblighting.com/about/certifications',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications - ACOB Lighting Technology Limited',
    description: 'View ACOB Lighting\'s certifications and accreditations for solar energy solutions.',
  },
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
