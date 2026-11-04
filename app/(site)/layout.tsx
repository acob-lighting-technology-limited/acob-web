import { type ReactNode, Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { ChatBot } from '@/components/features/chat-bot';
import { ChatErrorBoundary } from '@/components/error-boundary/error-boundary';
import { SkipNavigation } from '@/components/ui/skip-navigation';
import AnnouncementBannerSlot from '@/components/ui/announcement-banner-slot';
import { JourneyProvider } from '@/components/features/journey/journey-provider';
import SiteRevealProvider from '@/components/loader/site-reveal-provider';
import IntroPanel from '@/components/loader/intro-panel';
import { isAnniversaryYear2026 } from '@/lib/constants/anniversary';

export const revalidate = 86400;

export default function SiteLayout({ children }: { children: ReactNode }) {
  // Journey overlay mounts here so any /journey link opens it in place.
  return (
    <JourneyProvider>
      {/* Server-rendered so it paints on the first byte, before any JS. */}
      <IntroPanel showAnniversary={isAnniversaryYear2026()} />
      <SiteRevealProvider>
        <div className="flex min-h-screen flex-col w-full bg-background transition-colors duration-500 selection:bg-primary selection:text-primary-foreground">
          <SkipNavigation />
          <Suspense fallback={null}>
            <AnnouncementBannerSlot />
          </Suspense>
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
        </div>
      </SiteRevealProvider>
    </JourneyProvider>
  );
}
