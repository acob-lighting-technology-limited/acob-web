import type React from 'react';
import './globals.css';
import '../styles/customShadow.css';
import '../styles/animations.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/providers/session-provider';
import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Toaster } from 'sonner';
import { ChatBot } from '@/components/features/chat-bot';
import { headers } from 'next/headers';

import { ChatErrorBoundary } from '@/components/error-boundary/error-boundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import { getActiveJobCount } from '@/sanity/lib/client';
import { StructuredData } from '@/components/seo/structured-data';

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
  metadataBase: new URL('https://www.acoblighting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://www.acoblighting.com',
    siteName: 'ACOB Lighting Technology Limited',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.acoblighting.com/images/og-image.webp',
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
    images: ['https://www.acoblighting.com/images/og-image.webp'],
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
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Routes that should not have header and footer
  const isStudioRoute = pathname.startsWith('/studio');
  const isOfflineRoute = pathname.startsWith('/offline');
  const shouldHideLayout = isStudioRoute || isOfflineRoute;

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
            <div className="flex min-h-screen flex-col w-full bg-background  transition-colors duration-500 selection:bg-primary selection:text-primary-foreground ">
              {!shouldHideLayout && <AnnouncementBanner jobCount={jobCount} />}
              {!shouldHideLayout && <Header />}
              <main
                id="main-content"
                className={
                  shouldHideLayout ? 'flex-1' : 'flex-1 border-b border-b-muted'
                }
              >
                {children}
              </main>
              {!shouldHideLayout && <Footer />}
              {!shouldHideLayout && (
                <div className="z-50 fixed -bottom-2 right-0 flex flex-col gap-2 items-center w-16 h-32 sm:w-20 sm:h-40">
                  <ScrollToTop />
                  <ChatErrorBoundary>
                    <ChatBot />
                  </ChatErrorBoundary>
                </div>
              )}
              <Analytics />
              <SpeedInsights />
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
