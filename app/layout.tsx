import type React from 'react';
import './globals.css';
import '../styles/customShadow.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/session-provider';
import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Toaster } from 'sonner';
import { ChatBot } from '@/components/features/chat-bot';
import { LazyCookieConsent } from '@/components/lazy-components';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ACOB Lighting Technology Limited',
  description:
    'Leading supplier of solar materials and renewable energy solutions in Nigeria',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NProgressProvider>
            <Toaster closeButton position="top-right" />
                        <div className="flex min-h-screen flex-col w-full bg-background transition-all duration-500 ">
              
              <Header />
              <main className="flex-1 border-b border-b-muted">{children}</main>
              <Footer />
              <div className="fixed bottom-2 right-2 flex flex-col gap-2 items-center">
                <ScrollToTop />
                <ChatBot />
              </div>
              <LazyCookieConsent />
              <Analytics />
              <SpeedInsights />
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
