import type React from 'react';
import './globals.css';
import '../styles/customShadow.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/session-provider';
import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function LoadingLayout({
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
            <div className="min-h-screen w-full bg-background">{children}</div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
