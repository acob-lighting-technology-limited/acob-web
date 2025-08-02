'use client';

import { useEffect, useState } from 'react';

interface OfflineSafeProviderProps {
  children: React.ReactNode;
}

export function OfflineSafeProvider({ children }: OfflineSafeProviderProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // When offline, render children without external request components
  if (!isOnline) {
    return <>{children}</>;
  }

  // When online, render normally
  return <>{children}</>;
}
