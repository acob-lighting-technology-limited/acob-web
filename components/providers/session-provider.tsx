'use client';

import type React from 'react';
import { MotionConfig } from 'framer-motion';

import { ThemeProvider } from './theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* The prefers-reduced-motion rule in globals.css only reaches CSS
          animation; this makes every Framer Motion animation honour it too
          (transforms are dropped, opacity fades remain). */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
