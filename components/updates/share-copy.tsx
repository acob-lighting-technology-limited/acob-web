'use client';

import { Share2, Linkedin, Facebook, Instagram } from 'lucide-react';
import { XIcon } from '@/components/icons/x-icon';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
// import { toast } from 'sonner';
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
      // toast.success('Link copied', {
      //   description: 'URL has been copied to your clipboard.',
      // });

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
      case 'x':
        socialShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we copy the URL
        navigator.clipboard.writeText(shareUrl);
        // toast.success('Link copied for Instagram', {
        //   description: 'URL copied to clipboard. You can paste it in your Instagram story or post.',
        // });
        return;
      case 'whatsapp':
        socialShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`;
        break;
      default:
        return;
    }

    // Open in new window
    window.open(
      socialShareUrl,
      '_blank',
      'width=600,height=400,scrollbars=yes,resizable=yes',
    );
  };

  // Brand colors for social media platforms
  const brandColors = {
    share: 'hsl(var(--primary))',
    linkedin: '#0A66C2',
    x: '#000000',
    facebook: '#1877F2',
    instagram: '#E4405F',
    whatsapp: '#25D366',
  };

  // Social button component with animated background
  const SocialButton = ({
    platform,
    icon: Icon,
    brandColor,
    label,
  }: {
    platform: string;
    icon: React.ComponentType<{ className?: string }>;
    brandColor: string;
    label: string;
  }) => {
    return (
      <button
        onClick={() => handleSocialShare(platform)}
        title={`Share on ${label}`}
        aria-label={`Share on ${label}`}
        className="group relative inline-flex items-center justify-center rounded-md border border-input bg-transparent h-10 w-10 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden transition-all duration-300"
      >
        {/* Animated fill effect - fills entire button */}
        <div
          className="absolute inset-0 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-[1.02] rounded-md origin-center"
          style={{ backgroundColor: brandColor }}
        />
        {/* Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
          <Icon className="w-4 h-4 text-foreground group-hover:text-white transition-colors duration-500" />
        </div>
      </button>
    );
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Native Share Button */}
      <button
        onClick={handleNativeShare}
        disabled={isSharing}
        title="Share this page"
        aria-label="Share this page"
        className="group relative inline-flex items-center justify-center gap-2 rounded-md border border-input bg-transparent px-3 h-10 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden transition-all duration-300"
      >
        {/* Animated fill effect */}
        <div
          className="absolute inset-0 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-md origin-center"
          style={{ backgroundColor: brandColors.share }}
        />
        <span className="relative z-10 flex items-center gap-2 text-foreground group-hover:text-white transition-colors duration-500">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </span>
      </button>

      {/* Social Media Buttons */}
      <div className="flex items-center gap-1">
        <SocialButton
          platform="linkedin"
          icon={Linkedin}
          brandColor={brandColors.linkedin}
          label="LinkedIn"
        />
        <SocialButton
          platform="x"
          icon={XIcon}
          brandColor={brandColors.x}
          label="X"
        />
        <SocialButton
          platform="facebook"
          icon={Facebook}
          brandColor={brandColors.facebook}
          label="Facebook"
        />
        <SocialButton
          platform="instagram"
          icon={Instagram}
          brandColor={brandColors.instagram}
          label="Instagram"
        />
        <SocialButton
          platform="whatsapp"
          icon={WhatsAppIcon}
          brandColor={brandColors.whatsapp}
          label="WhatsApp"
        />
      </div>
    </div>
  );
}
