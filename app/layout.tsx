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

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ACOB Lighting Technology Limited',
  description:
    'Leading supplier of solar materials and renewable energy solutions in Nigeria',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simple offline detection and fetch override
              if (typeof window !== 'undefined') {
                const originalFetch = window.fetch;
                window.fetch = function(input, init) {
                  const url = typeof input === 'string' ? input : input.toString();
                  
                  // If offline, return a successful response for Next.js internal calls
                  if (!navigator.onLine) {
                    if (url.includes('__next') || url.includes('webpack') || url.includes('react-server')) {
                      return Promise.resolve(new Response('', { status: 200 }));
                    }
                  }
                  
                  return originalFetch.call(this, input, init);
                };
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <NProgressProvider>
            <Toaster closeButton position="top-right" />
            <div className="flex min-h-screen flex-col w-full">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
