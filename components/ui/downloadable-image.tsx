'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface DownloadableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  onClick?: () => void;
  showDownloadButton?: boolean;
}

/**
 * Image component with watermarked download functionality
 * Displays clean images on the website, but adds ACOB watermark when downloaded
 */
export function DownloadableImage({
  src,
  alt,
  width,
  height,
  className,
  fill,
  priority,
  quality = 90,
  onClick,
  showDownloadButton = true,
}: DownloadableImageProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) {
      return;
    }
    setIsDownloading(true);

    try {
      // Create download URL with watermark
      const downloadUrl = `/api/download?url=${encodeURIComponent(src)}`;

      // Fetch the watermarked image
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${alt.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      window.alert('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative group">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        fill={fill}
        priority={priority}
        quality={quality}
        onClick={onClick}
      />

      {/* Download button overlay */}
      {showDownloadButton && (
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50"
          title="Download with ACOB watermark"
          aria-label="Download image with watermark"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Right-click protection context menu */}
      <div
        className="absolute inset-0"
        onContextMenu={e => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleDownload(e as any);
        }}
      />
    </div>
  );
}
