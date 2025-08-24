'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ShareCopyProps {
  className?: string;
  title?: string;
  url?: string;
}

export function ShareCopy({ className, title, url }: ShareCopyProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleClick = async () => {
    const shareUrl = url ?? window.location.href;
    const shareTitle = title ?? document.title;

    try {
      setIsSharing(true);
      // 1) Copy to clipboard first
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied', {
        description: 'URL has been copied to your clipboard.',
      });

      // 2) Then open native share sheet if available
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url: shareUrl });
      }
    } catch {
      // Silently handle errors without showing toast
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn('bg-transparent cursor-pointer', className)}
      onClick={handleClick}
      disabled={isSharing}
      title="Share this page"
      aria-label="Share this page"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  );
}


