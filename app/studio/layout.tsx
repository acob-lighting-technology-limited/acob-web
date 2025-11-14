import type React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/providers/session-provider';
import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { Toaster } from 'sonner';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.className} ${plusJakarta.variable}`}>
        <Providers>
          <NProgressProvider>
            <Toaster closeButton position="top-right" />
            <div className="flex min-h-screen flex-col w-full bg-background transition-colors duration-500">
              <main className="flex-1">{children}</main>
            </div>
          </NProgressProvider>
        </Providers>
      </body>
    </html>
  );
}
