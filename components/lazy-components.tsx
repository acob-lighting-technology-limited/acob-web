'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyChatBot = dynamic(
  () => import('./features/chat-bot').then(mod => ({ default: mod.ChatBot })),
  {
    loading: () => (
      <div className="fixed bottom-4 right-4 w-12 h-12 bg-primary rounded-full animate-pulse" />
    ),
    ssr: false,
  },
);

export const LazyBackupStrategy = dynamic(
  () =>
    import('./business/backup-strategy').then(mod => ({
      default: mod.BackupStrategy,
    })),
  {
    loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />,
    ssr: false,
  },
);

// export const LazyCookieConsent = dynamic(
//   () =>
//     import('./business/cookie-consent').then(mod => ({
//       default: mod.CookieConsent,
//     })),
//   {
//     loading: () => null,
//     ssr: false,
//   },
// );

export const LazySpamProtection = dynamic(
  () =>
    import('./business/spam-protection').then(mod => ({
      default: mod.SpamProtection,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);



// Lazy load heavy sections
export const LazyProjectsSection = dynamic(
  () =>
    import('./sections/projects-section').then(mod => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" />,
  },
);

export const LazyNewsSection = dynamic(
  () =>
    import('./sections/updates-section').then(mod => ({
      default: mod.UpdatesSection,
    })),
  {
    loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" />,
  },
);

// Lazy load UI components
export const LazyCarousel = dynamic(
  () => import('./ui/carousel').then(mod => ({ default: mod.Carousel })),
  {
    loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />,
  },
);

export const LazyStackCards = dynamic(() => import('./ui/stack-cards'), {
  loading: () => <div className="h-screen bg-muted animate-pulse" />,
});
