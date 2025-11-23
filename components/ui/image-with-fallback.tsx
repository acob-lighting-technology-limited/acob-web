'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fill?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
  priority = false,
  fallbackSrc = '/images/placeholder.svg',
  objectFit = 'cover',
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn('relative overflow-hidden w-full h-full', className)}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
          )}
          <Image
            src={imgSrc}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={cn(
              'h-full w-full transition-opacity duration-500 select-none',
              isLoading ? 'opacity-0' : 'opacity-100',
            )}
            style={{ objectFit }}
            priority={priority}
            onError={handleError}
            onLoad={handleLoad}
            sizes={sizes}
            draggable={false}
          />
          {hasError && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image unavailable</span>
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem disabled className="text-xs text-muted-foreground">
          Images are protected by copyright
        </ContextMenuItem>
        <ContextMenuItem disabled className="text-xs text-muted-foreground">
          © ACOB Lighting Technology Limited
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
