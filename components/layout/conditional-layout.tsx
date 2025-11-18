'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { ChatBot } from '@/components/features/chat-bot';
import { ChatErrorBoundary } from '@/components/error-boundary/error-boundary';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';

interface ConditionalLayoutProps {
  jobCount: number;
  children: React.ReactNode;
}

export function ConditionalLayout({
  jobCount,
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Routes that should not have header and footer
  const isStudioRoute = pathname.startsWith('/studio');
  const isOfflineRoute = pathname.startsWith('/offline');
  const shouldHideLayout = isStudioRoute || isOfflineRoute;

  if (shouldHideLayout) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <AnnouncementBanner jobCount={jobCount} />
      <Header />
      <main id="main-content" className="flex-1 border-b border-b-muted">
        {children}
      </main>
      <Footer />
      <div className="z-50 fixed -bottom-2 right-0 flex flex-col gap-2 items-center w-16 h-32 sm:w-20 sm:h-40">
        <ScrollToTop />
        <ChatErrorBoundary>
          <ChatBot />
        </ChatErrorBoundary>
      </div>
    </>
  );
}
