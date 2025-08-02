'use client';

import { useEffect } from 'react';
import {
  installFetchWrapper,
  restoreOriginalFetch,
} from '@/lib/utils/fetch-wrapper';

interface FetchWrapperProviderProps {
  children: React.ReactNode;
}

export function FetchWrapperProvider({ children }: FetchWrapperProviderProps) {
  useEffect(() => {
    // Install the custom fetch wrapper
    installFetchWrapper();

    // Cleanup function to restore original fetch
    return () => {
      restoreOriginalFetch();
    };
  }, []);

  return <>{children}</>;
}
