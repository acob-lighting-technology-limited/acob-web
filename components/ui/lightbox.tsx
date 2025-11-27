'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

type MediaType = 'image' | 'video';

interface MediaItem {
  src: string;
  alt: string;
  type: MediaType;
}

interface LightboxProps {
  media: Array<{ src: string; alt: string; type?: MediaType }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({
  media,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [previousIndex, setPreviousIndex] = useState(initialIndex);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollPosition = useRef<number>(0);
  const videoRef = useRef<React.ElementRef<'video'>>(null);

  // Normalize media items to include type
  const normalizedMedia: MediaItem[] = media.map(item => ({
    ...item,
    type:
      item.type ||
      (item.src.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image'),
  }));

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Reset video state when changing media
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (
        e.key === ' ' &&
        normalizedMedia[currentIndex]?.type === 'video'
      ) {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, normalizedMedia]);

  // Prevent body scroll and hide background when lightbox is open
  useEffect(() => {
    if (isOpen) {
      scrollPosition.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
    } else {
      const scrollY = scrollPosition.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      window.scrollTo(0, scrollY);
    }

    return () => {
      const scrollY = scrollPosition.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setPreviousIndex(currentIndex);
    setSlideDirection('left');
    setCurrentIndex(prev => (prev + 1) % normalizedMedia.length);
    setIsZoomed(false);
    setTimeout(() => setSlideDirection(null), 500);
  }, [normalizedMedia.length, currentIndex]);

  const handlePrevious = useCallback(() => {
    setPreviousIndex(currentIndex);
    setSlideDirection('right');
    setCurrentIndex(
      prev => (prev - 1 + normalizedMedia.length) % normalizedMedia.length,
    );
    setIsZoomed(false);
    setTimeout(() => setSlideDirection(null), 500);
  }, [normalizedMedia.length, currentIndex]);

  const toggleZoom = () => {
    if (normalizedMedia[currentIndex]?.type === 'video') {
      return;
    }
    setIsZoomed(!isZoomed);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed || normalizedMedia[currentIndex]?.type === 'video') {
      return;
    }
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isZoomed || normalizedMedia[currentIndex]?.type === 'video') {
      return;
    }
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isZoomed || normalizedMedia[currentIndex]?.type === 'video') {
      return;
    }

    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (
    !isOpen ||
    normalizedMedia.length === 0 ||
    !normalizedMedia[currentIndex]
  ) {
    return null;
  }

  const currentMedia = normalizedMedia[currentIndex];
  const isVideo = currentMedia.type === 'video';

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black touch-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitOverflowScrolling: 'auto',
        overscrollBehavior: 'contain',
        touchAction: 'none',
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm font-medium">
            {currentIndex + 1} / {normalizedMedia.length}
          </span>
          {currentMedia.alt && (
            <span className="text-white text-sm font-medium hidden sm:block">
              {currentMedia.alt}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle (only for images) */}
          {!isVideo && (
            <button
              onClick={e => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? (
                <ZoomOut className="h-5 w-5" />
              ) : (
                <ZoomIn className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Media Container */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Previous Media (sliding out) */}
          {slideDirection && previousIndex !== currentIndex && (
            <div
              key={`prev-${previousIndex}`}
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                slideDirection === 'left' && 'slide-out-left',
                slideDirection === 'right' && 'slide-out-right',
              )}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="relative w-full h-full">
                {normalizedMedia[previousIndex]?.type === 'video' ? (
                  <video
                    src={normalizedMedia[previousIndex].src}
                    className="w-full h-full object-contain"
                    muted
                  />
                ) : (
                  <Image
                    src={normalizedMedia[previousIndex]?.src || ''}
                    alt={normalizedMedia[previousIndex]?.alt || ''}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={95}
                  />
                )}
              </div>
            </div>
          )}

          {/* Current Media (sliding in from appropriate side) */}
          <div
            key={`current-${currentIndex}`}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              slideDirection === 'left' && 'slide-in-from-right',
              slideDirection === 'right' && 'slide-in-from-left',
              isZoomed && !isVideo && 'scale-150 cursor-move overflow-auto',
            )}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {isVideo ? (
              <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                <video
                  ref={videoRef}
                  src={currentMedia.src}
                  className="w-full h-full object-contain"
                  controls
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onClick={e => e.stopPropagation()}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 rounded-full p-4">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div
                    className="relative w-full h-full"
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      WebkitTouchCallout: 'none',
                    }}
                    onContextMenu={e => e.preventDefault()}
                  >
                    <Image
                      src={currentMedia.src}
                      alt={currentMedia.alt}
                      fill
                      className={cn(
                        'object-contain transition-all duration-300 select-none',
                        isZoomed && 'object-cover',
                      )}
                      sizes="100vw"
                      priority
                      quality={98}
                      loading="eager"
                      unoptimized
                      draggable={false}
                    />
                    <div
                      className="absolute inset-0"
                      onContextMenu={e => e.preventDefault()}
                      onDragStart={e => e.preventDefault()}
                    />
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem
                    disabled
                    className="text-xs text-muted-foreground"
                  >
                    Images are protected by copyright
                  </ContextMenuItem>
                  <ContextMenuItem
                    disabled
                    className="text-xs text-muted-foreground"
                  >
                    © ACOB Lighting Technology Limited
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {normalizedMedia.length > 1 && (
        <>
          <button
            onClick={e => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {normalizedMedia.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
            {normalizedMedia.map((item, index) => (
              <button
                key={index}
                onClick={e => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setIsZoomed(false);
                }}
                className={cn(
                  'relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300',
                  index === currentIndex
                    ? 'border-primary scale-110 shadow-lg shadow-primary/50'
                    : 'border-white/30 hover:border-white/60 opacity-60 hover:opacity-100',
                )}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-black/50 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                    <video
                      src={item.src}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                      muted
                    />
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
