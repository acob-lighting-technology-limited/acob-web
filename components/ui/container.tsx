import type React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export function Container({
  children,
  className,
  noPadding,
  style,
}: ContainerProps) {
  return (
    <div
      className={cn(
        '2xl:container max-w-7xl mx-auto px-4 relative',
        !noPadding && 'py-16',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
