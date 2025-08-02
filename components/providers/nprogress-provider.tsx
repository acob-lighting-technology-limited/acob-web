'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from '@/lib/nprogress';

interface NProgressProviderProps {
  children: React.ReactNode;
}

export function NProgressProvider({ children }: NProgressProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Start progress bar on route change
    NProgress.start();

    // Complete progress bar after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return <>{children}</>;
}
