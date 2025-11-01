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
import { SkipNavigation } from '@/components/ui/skip-navigation';
import { ChatErrorBoundary } from '@/components/error-boundary/error-boundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import { getActiveJobCount } from '@/sanity/lib/client';

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
  metadataBase: new URL('https://acoblighting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://acoblighting.com',
    siteName: 'ACOB Lighting Technology Limited',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
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
  },
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
        <Providers>
          <NProgressProvider>
            <SkipNavigation />
            <Toaster closeButton position="top-right" />
            <div className="flex min-h-screen flex-col w-full bg-background transition-all duration-500 selection:bg-foreground selection:text-primary ">
              <AnnouncementBanner jobCount={jobCount} />
              <Header />
              <main
                id="main-content"
                className="flex-1 border-b border-b-muted"
              >
                {children}
              </main>
              <Footer />
              <div className="z-50 fixed bottom-2 right-2 flex flex-col gap-2 items-center w-16 h-32 sm:w-20 sm:h-40">
                <ScrollToTop />
                <ChatErrorBoundary>
                  <ChatBot />
                </ChatErrorBoundary>
              </div>
              <Analytics />
              <SpeedInsights />
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
