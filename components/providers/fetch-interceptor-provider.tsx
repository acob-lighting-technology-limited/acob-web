'use client';

import { useEffect } from 'react';
import { installFetchInterceptor } from '@/lib/utils/fetch-interceptor';

interface FetchInterceptorProviderProps {
  children: React.ReactNode;
}

export function FetchInterceptorProvider({
  children,
}: FetchInterceptorProviderProps) {
  useEffect(() => {
    // Ensure the fetch interceptor is installed
    installFetchInterceptor();
  }, []);

  return <>{children}</>;
}
