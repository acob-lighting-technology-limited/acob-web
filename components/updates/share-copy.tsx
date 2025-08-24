'use client';

import { Share2, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface ShareCopyProps {
  className?: string;
  title?: string;
  url?: string;
}

export function ShareCopy({ className, title, url }: ShareCopyProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareTitle, setShareTitle] = useState('');

  useEffect(() => {
    setShareUrl(url ?? window.location.href);
    setShareTitle(title ?? document.title);
  }, [url, title]);

  const handleNativeShare = async () => {
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

  const handleSocialShare = (platform: string) => {
    let socialShareUrl = '';
    
    switch (platform) {
      case 'linkedin':
        socialShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        socialShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we copy the URL
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied for Instagram', {
          description: 'URL copied to clipboard. You can paste it in your Instagram story or post.',
        });
        return;
      default:
        return;
    }

    // Open in new window
    window.open(socialShareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Native Share Button */}
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent cursor-pointer h-10"
        onClick={handleNativeShare}
        disabled={isSharing}
        title="Share this page"
        aria-label="Share this page"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {/* Social Media Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="p-1 h-10 w-10 border"
          onClick={() => handleSocialShare('linkedin')}
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="p-1 h-10 w-10 border"
          onClick={() => handleSocialShare('twitter')}
          title="Share on X (Twitter)"
          aria-label="Share on X (Twitter)"
        >
          <Twitter className="w-6 h-6" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="p-1 h-10 w-10 border"
          onClick={() => handleSocialShare('facebook')}
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-6 h-6" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="p-1 h-10 w-10 border"
          onClick={() => handleSocialShare('instagram')}
          title="Share on Instagram"
          aria-label="Share on Instagram"
        >
          <Instagram className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}


