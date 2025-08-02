import type React from 'react';
import './globals.css';
import '../styles/customShadow.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/session-provider';
import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { FetchWrapperProvider } from '@/components/providers/fetch-wrapper-provider';
import { SilentErrorBoundary } from '@/components/error-boundary/silent-error-boundary';
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
              // Early fetch override to prevent Next.js internal errors
              if (typeof window !== 'undefined') {
                const originalFetch = window.fetch;
                window.fetch = function(input, init) {
                  const url = typeof input === 'string' ? input : input.toString();
                  
                  // If offline, handle Next.js internal requests
                  if (!navigator.onLine) {
                    if (url.includes('__next') || url.includes('webpack') || url.includes('react-server') || url.includes('layout-router') || url.includes('error-boundary') || url.includes('resolveErrorDev') || url.includes('processFullStringRow') || url.includes('processFullBinaryRow') || url.includes('__nextjs_original-stack-frames') || url.includes('__nextjs_original-stack-frame') || url.startsWith('/_next/') || url.includes('webpack-internal') || url.includes('react-server-dom-webpack') || url.includes('app-pages-browser') || url.includes('next/dist/') || url.includes('compiled/react-server-dom-webpack')) {
                      console.log('🔄 Early fetch override: Intercepted Next.js internal request:', url);
                      
                      // Return JSON for stack frame requests
                      if (url.includes('__nextjs_original-stack-frames') || url.includes('__nextjs_original-stack-frame')) {
                        return Promise.resolve(new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } }));
                      }
                      
                      return Promise.resolve(new Response('', { status: 200 }));
                    }
                  }
                  
                  // If online, use original fetch but catch errors
                  return originalFetch.call(this, input, init).catch(function(error) {
                    console.log('🔄 Early fetch override: Network error caught:', error.message);
                    
                    // For Next.js internal requests, return empty response
                    if (url.includes('__next') || url.includes('webpack') || url.includes('react-server') || url.includes('layout-router') || url.includes('error-boundary') || url.includes('resolveErrorDev') || url.includes('processFullStringRow') || url.includes('processFullBinaryRow') || url.includes('__nextjs_original-stack-frames') || url.includes('__nextjs_original-stack-frame') || url.startsWith('/_next/') || url.includes('webpack-internal') || url.includes('react-server-dom-webpack') || url.includes('app-pages-browser') || url.includes('next/dist/') || url.includes('compiled/react-server-dom-webpack')) {
                      // Return JSON for stack frame requests
                      if (url.includes('__nextjs_original-stack-frames') || url.includes('__nextjs_original-stack-frame')) {
                        return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
                      }
                      
                      return new Response('', { status: 200 });
                    }
                    
                    // For other requests, return service unavailable
                    return new Response(JSON.stringify({ error: 'Network error occurred' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
                  });
                };
                console.log('✅ Early fetch override installed');
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <SilentErrorBoundary>
          <Providers>
            <FetchWrapperProvider>
              <NProgressProvider>
                <Toaster closeButton position="top-right" />
                <div className="flex min-h-screen flex-col w-full">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <ScrollToTop />
                </div>
              </NProgressProvider>
            </FetchWrapperProvider>
          </Providers>
        </SilentErrorBoundary>
      </body>
    </html>
  );
}
