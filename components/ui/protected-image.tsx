'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';

interface ProtectedImageProps extends ImageProps {
  showDownloadOption?: boolean;
  onDownload?: () => void;
}

/**
 * Protected Image component that wraps Next.js Image with context menu
 * Disables right-click and shows copyright notice when right-clicked
 */
export function ProtectedImage({
  className,
  showDownloadOption = false,
  onDownload,
  ...props
}: ProtectedImageProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="relative inline-block"
          onContextMenu={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        >
          <Image
            {...props}
            className={cn('select-none', className)}
            draggable={false}
          />
          {/* Transparent overlay to prevent direct image access */}
          <div
            className="absolute inset-0"
            onContextMenu={e => e.preventDefault()}
            onDragStart={e => e.preventDefault()}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {showDownloadOption && onDownload && (
          <ContextMenuItem onClick={onDownload} className="cursor-pointer">
            Download Image
          </ContextMenuItem>
        )}
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
