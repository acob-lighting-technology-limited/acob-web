'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollPosition = useRef<number>(0);
  const videoRef = useRef<React.ElementRef<'video'>>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const pinchStartDistance = useRef<number>(0);
  const pinchStartZoom = useRef<number>(1);
  const panStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPinchDistance = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Reset video state and zoom when changing media
  useEffect(() => {
    setIsPlaying(false);
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsPinching(false);
    setIsPanning(false);
    pinchStartDistance.current = 0;
    lastPinchDistance.current = 0;
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

  // Reset zoom when lightbox closes
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

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
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Calculate distance between two touch points
  const getTouchDistance = (
    touch1: React.Touch,
    touch2: React.Touch,
  ): number => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle pinch-to-zoom
  const handlePinchStart = (e: React.TouchEvent) => {
    if (
      normalizedMedia[currentIndex]?.type === 'video' ||
      e.touches.length !== 2
    ) {
      return;
    }
    e.stopPropagation();
    setIsPinching(true);
    setIsPanning(false);
    const distance = getTouchDistance(e.touches[0], e.touches[1]);
    pinchStartDistance.current = distance;
    lastPinchDistance.current = distance;
    pinchStartZoom.current = zoomLevel;
  };

  const handlePinchMove = (e: React.TouchEvent) => {
    if (
      normalizedMedia[currentIndex]?.type === 'video' ||
      e.touches.length !== 2 ||
      !isPinching ||
      pinchStartDistance.current === 0
    ) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    const distance = getTouchDistance(e.touches[0], e.touches[1]);

    // Only update if distance changed significantly (reduces jitter)
    const distanceDelta = Math.abs(distance - lastPinchDistance.current);
    if (distanceDelta < 3) {
      return;
    }

    lastPinchDistance.current = distance;

    // Calculate zoom - use ratio of current distance to initial distance
    // This gives smooth, proportional zooming
    const distanceRatio = distance / pinchStartDistance.current;
    const newZoom = Math.max(
      1,
      Math.min(pinchStartZoom.current * distanceRatio, 5),
    );

    // Update zoom level directly (no smoothing to avoid lag)
    setZoomLevel(newZoom);
    setIsZoomed(newZoom > 1.1);
  };

  const handlePinchEnd = () => {
    setIsPinching(false);
    pinchStartDistance.current = 0;
    lastPinchDistance.current = 0;
    pinchStartZoom.current = zoomLevel;
  };

  // Handle pan when zoomed
  const handlePanStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (
      !isZoomed ||
      normalizedMedia[currentIndex]?.type === 'video' ||
      isPinching
    ) {
      return;
    }
    e.stopPropagation();
    setIsPanning(true);
    if ('touches' in e && e.touches.length === 1) {
      panStart.current = {
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y,
      };
    } else if ('clientX' in e) {
      panStart.current = {
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      };
    }
  };

  const handlePanMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (
      !isZoomed ||
      !isPanning ||
      normalizedMedia[currentIndex]?.type === 'video' ||
      isPinching
    ) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    if ('touches' in e && e.touches.length === 1) {
      const newX = e.touches[0].clientX - panStart.current.x;
      const newY = e.touches[0].clientY - panStart.current.y;
      setPanPosition({ x: newX, y: newY });
    } else if ('clientX' in e) {
      const newX = e.clientX - panStart.current.x;
      const newY = e.clientY - panStart.current.y;
      setPanPosition({ x: newX, y: newY });
    }
  };

  const handlePanEnd = () => {
    setIsPanning(false);
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

  // Handle touch events for swipe gestures (only when not zoomed and single touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      handlePinchStart(e);
      return;
    }
    if (isZoomed && !isPinching) {
      handlePanStart(e);
      return;
    }
    if (!isZoomed && normalizedMedia[currentIndex]?.type !== 'video') {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      handlePinchMove(e);
      return;
    }
    if (isZoomed && !isPinching) {
      handlePanMove(e);
      return;
    }
    if (!isZoomed && normalizedMedia[currentIndex]?.type !== 'video') {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Still one touch, might be transitioning
      return;
    }
    if (isPinching) {
      handlePinchEnd();
    }
    if (isPanning) {
      handlePanEnd();
    }
    if (isZoomed) {
      return;
    }
    if (normalizedMedia[currentIndex]?.type === 'video') {
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
    !mounted ||
    normalizedMedia.length === 0 ||
    !normalizedMedia[currentIndex]
  ) {
    return null;
  }

  const currentMedia = normalizedMedia[currentIndex];
  const isVideo = currentMedia.type === 'video';

  const lightboxContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black touch-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitOverflowScrolling: 'auto',
        overscrollBehavior: 'contain',
        touchAction: isZoomed ? 'pan-x pan-y pinch-zoom' : 'none',
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
            ref={imageContainerRef}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              slideDirection === 'left' && 'slide-in-from-right',
              slideDirection === 'right' && 'slide-in-from-left',
              isZoomed && !isVideo && 'cursor-move overflow-auto',
            )}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              touchAction: isZoomed ? 'pan-x pan-y pinch-zoom' : 'none',
            }}
            onMouseDown={handlePanStart}
            onMouseMove={handlePanMove}
            onMouseUp={handlePanEnd}
            onMouseLeave={handlePanEnd}
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
                      transform: isZoomed
                        ? `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`
                        : 'scale(1) translate(0, 0)',
                      transformOrigin: 'center center',
                      transition:
                        isPanning || isPinching
                          ? 'none'
                          : 'transform 0.2s ease-out',
                    }}
                    onContextMenu={e => e.preventDefault()}
                  >
                    <Image
                      src={currentMedia.src}
                      alt={currentMedia.alt}
                      fill
                      className={cn(
                        'object-contain select-none',
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

  return createPortal(lightboxContent, document.body);
}
