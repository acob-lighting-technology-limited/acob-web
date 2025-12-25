'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  return (
    <div className={cn('group h-full perspective-1000', className)}>
      <div className="relative h-full w-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">{front}</div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
}
