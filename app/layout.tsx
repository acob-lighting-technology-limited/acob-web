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
      <body className={inter.className}>
        <Providers>
          <NProgressProvider>
            <Toaster closeButton position="top-right" />
            <div className="flex min-h-screen flex-col w-full">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer /> <ChatBot />
              <ScrollToTop />
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
