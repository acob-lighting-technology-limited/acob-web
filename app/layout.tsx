import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/customShadow.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Providers } from '@/components/providers/session-provider';
import { Toaster } from 'sonner';
import { StructuredData } from '@/components/seo/structured-data';
import { WebVitals } from '@/components/performance/web-vitals';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { CookieConsent } from '@/components/business/cookie-consent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ACOB Lighting Technology Limited - Solar Energy Solutions',
    template: '%s | ACOB Lighting Technology Limited',
  },
  description:
    'Leading supplier of solar materials for manufacturers, installers & contractors. Mini-grid solutions, captive power systems, and professional energy audits.',
  keywords: [
    'solar energy',
    'mini-grid solutions',
    'renewable energy',
    'Nigeria',
    'solar panels',
    'energy audit',
    'captive power systems',
    'solar lighting',
    'energy solutions',
    'sustainable energy',
    'ACOB Lighting',
    'solar technology',
  ],
  authors: [{ name: 'ACOB Lighting Technology Limited' }],
  creator: 'ACOB Lighting Technology Limited',
  publisher: 'ACOB Lighting Technology Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://acoblighting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://acoblighting.com',
    title: 'ACOB Lighting Technology Limited - Solar Energy Solutions',
    description:
      'Lighting Up Nigeria with Advanced Solar Solutions. Leading supplier of solar materials, mini-grid solutions, and professional energy audits.',
    siteName: 'ACOB Lighting Technology Limited',
    images: [
      {
        url: '/images/ACOB-logo.png',
        width: 1200,
        height: 630,
        alt: 'ACOB Lighting Technology Limited - Solar Energy Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB Lighting Technology Limited - Solar Energy Solutions',
    description:
      'Lighting Up Nigeria with Advanced Solar Solutions. Leading supplier of solar materials, mini-grid solutions, and professional energy audits.',
    images: ['/images/ACOB-logo.png'],
    creator: '@acoblighting',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/ACOB-logo.png', type: 'image/png' },
    ],
    apple: [{ url: '/images/ACOB-logo.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <WebVitals />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.className} antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-all duration-700`}
      >
        <Providers>
          <Toaster closeButton position="top-right" />
          <div className="flex min-h-screen flex-col w-full">
            <Header />
            <main className="flex-1 border-b border-b-border">{children}</main>

            <Footer />

            <ScrollToTop />
            <CookieConsent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
