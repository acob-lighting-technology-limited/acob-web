import type React from 'react';
import './globals.css';
import '../styles/customShadow.css';
import '../styles/animations.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/providers/session-provider';
import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getActiveJobCount } from '@/sanity/lib/client';
import { StructuredData } from '@/components/seo/structured-data';
import { ConditionalLayout } from '@/components/layout/conditional-layout';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
  description:
    'ACOB Lighting Technology Limited is a leading supplier of solar materials for manufacturers, installers & contractors. We provide mini-grid solutions, street lighting infrastructure, and comprehensive solar energy services across Nigeria.',
  keywords:
    'solar energy, mini-grid solutions, street lighting, solar materials, renewable energy, Nigeria, ACOB Lighting',
  authors: [{ name: 'ACOB Lighting Technology Limited' }],
  creator: 'ACOB Lighting Technology Limited',
  publisher: 'ACOB Lighting Technology Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://new.acoblighting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://new.acoblighting.com',
    siteName: 'ACOB Lighting Technology Limited',
    locale: 'en_US',
    images: [
      {
        url: '/images/olooji-community.webp',
        width: 1200,
        height: 630,
        alt: 'ACOB Lighting Solar Energy Solutions - Mini-Grid Projects Across Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    creator: '@acoblighting',
    images: ['/images/olooji-community.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Console verification removed - using Vercel Analytics for site monitoring
  // If you need GSC verification later, add: verification: { google: 'your-actual-code' }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobCount = await getActiveJobCount();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.className} ${plusJakarta.variable}`}>
        <StructuredData />
        <Providers>
          <NProgressProvider>
            <Toaster
              closeButton
              position="bottom-right"
              theme="system"
              richColors
            />
            <div className="flex min-h-screen flex-col w-full bg-background transition-colors duration-500 selection:bg-primary selection:text-primary-foreground">
              <ConditionalLayout jobCount={jobCount}>
                {children}
              </ConditionalLayout>
              <Analytics />
              <SpeedInsights />
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
