import type React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Container({ children, className, noPadding }: ContainerProps) {
  return (
    <div
      className={cn(
        '2xl:container max-w-7xl mx-auto px-4 relative',
        !noPadding && 'py-16',
        className,
      )}
    >
      {children}
    </div>
  );
}
