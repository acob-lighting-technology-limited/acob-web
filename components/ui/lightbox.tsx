'use client';

/**
 * Lightbox — industry-standard full-screen media viewer.
 *
 * Layout (all in px, constant):
 *   ┌──────────────────────────────────────────┐  ← TOPBAR_H  (56 px)
 *   │  counter   title              zoom  close │
 *   ├──┬───────────────────────────────────┬───┤
 *   │◀ │                                   │ ▶│  ← media area fills remaining height
 *   │  │   img/video  w-full h-full        │  │    left/right = ARROW_W (52 px) when
 *   │  │   object-contain                  │  │    multiple items, else 0
 *   │  │                                   │  │
 *   ├──┴───────────────────────────────────┴───┤
 *   │  [thumb] [thumb*] [thumb] [thumb]        │  ← THUMBBAR_H (88 px) when >1 item
 *   └──────────────────────────────────────────┘
 *
 * Key insight: media area has explicit top/bottom/left/right so the browser knows
 * its exact dimensions. The img/video then uses w-full h-full object-contain —
 * this guarantees the full image is always visible, never cropped.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDialogFocus } from '@/hooks/use-dialog-focus';

type MediaType = 'image' | 'video';

interface MediaItem {
  src: string;
  alt: string;
  type: MediaType;
}

export interface LightboxProps {
  media: Array<{ src: string; alt: string; type?: MediaType }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const TOPBAR_H = 56; // px
const THUMBBAR_H = 88; // px  (0 when single item)
const ARROW_W = 52; // px  (0 when single item)

function getTouchDist(t1: React.Touch, t2: React.Touch) {
  const dx = t2.clientX - t1.clientX;
  const dy = t2.clientY - t1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function Lightbox({
  media,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragOrigin = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const swipeOrigin = useRef({ x: 0, y: 0 });
  const pinchDist0 = useRef(0);
  const pinchZoom0 = useRef(1);
  const savedScroll = useRef(0);
  const videoRef = useRef<React.ElementRef<'video'>>(null);
  // Guard: ignore close calls that arrive within 300 ms of the lightbox opening
  // (prevents the opening click from immediately re-closing via event propagation)
  const justOpenedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Normalise media items
  const items: MediaItem[] = media.map(m => ({
    src: m.src,
    alt: m.alt,
    type: m.type ?? (m.src.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image'),
  }));

  const current = items[index];
  const isVideo = current?.type === 'video';
  const isZoomed = zoom > 1.01;
  const multi = items.length > 1;
  const arrowW = multi ? ARROW_W : 0;
  const thumbbarH = multi ? THUMBBAR_H : 0;
  const canRender = isOpen && mounted && Boolean(current);

  // ── Sync index with caller ────────────────────────────────────────────────
  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  // ── Reset zoom/pan on item change ─────────────────────────────────────────
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [index]);

  // ── Mount guard for SSR ───────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Body scroll lock (overflow only — no position:fixed to avoid layout jumps) ──
  useEffect(() => {
    if (!canRender) {
      return;
    }
    savedScroll.current = window.scrollY;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      // Restore scroll position in case layout shifted while locked
      window.scrollTo({
        top: savedScroll.current,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [canRender]);

  // ── Just-opened guard — blocks close() for 300 ms after opening ──────────
  useEffect(() => {
    if (!canRender) {
      return;
    }
    justOpenedRef.current = true;
    const t = window.setTimeout(() => {
      justOpenedRef.current = false;
    }, 300);
    return () => {
      window.clearTimeout(t);
      justOpenedRef.current = false;
    };
  }, [canRender]);

  // ── Reset on close ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // ── Navigation helpers ────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (items.length === 0) {
      return;
    }
    setIndex(i => (i + 1) % items.length);
  }, [items.length]);
  const goPrev = useCallback(() => {
    if (items.length === 0) {
      return;
    }
    setIndex(i => (i - 1 + items.length) % items.length);
  }, [items.length]);

  // ── Safe close (respects just-opened guard) ───────────────────────────────
  const handleClose = useCallback(() => {
    if (justOpenedRef.current) {
      return;
    }
    onClose();
  }, [onClose]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canRender) {
      return;
    }
    const handler = (e: KeyboardEvent) => {
      // Escape is handled by useDialogFocus below.
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [canRender, handleClose, goNext, goPrev]);

  // ── Focus: move in on open, trap Tab, Escape closes, restore on close ────
  useDialogFocus(dialogRef, canRender, handleClose);

  // ── Zoom toggle ───────────────────────────────────────────────────────────
  const toggleZoom = () => {
    if (isZoomed) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2.5);
    }
  };

  // ── Mouse drag (pan when zoomed) ──────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed || isVideo) {
      return;
    }
    e.preventDefault();
    setDragging(true);
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    panOrigin.current = { ...pan };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) {
      return;
    }
    setPan({
      x: panOrigin.current.x + (e.clientX - dragOrigin.current.x),
      y: panOrigin.current.y + (e.clientY - dragOrigin.current.y),
    });
  };
  const onMouseUp = () => setDragging(false);

  // ── Touch ─────────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchDist0.current = getTouchDist(e.touches[0], e.touches[1]);
      pinchZoom0.current = zoom;
    } else {
      swipeOrigin.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      if (isZoomed) {
        dragOrigin.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        panOrigin.current = { ...pan };
      }
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      const newZoom = Math.max(
        1,
        Math.min(5, pinchZoom0.current * (dist / pinchDist0.current)),
      );
      setZoom(newZoom);
      if (newZoom <= 1) {
        setPan({ x: 0, y: 0 });
      }
    } else if (isZoomed && e.touches.length === 1) {
      setPan({
        x: panOrigin.current.x + (e.touches[0].clientX - dragOrigin.current.x),
        y: panOrigin.current.y + (e.touches[0].clientY - dragOrigin.current.y),
      });
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1 && !isZoomed) {
      const dx = e.changedTouches[0].clientX - swipeOrigin.current.x;
      if (Math.abs(dx) > 50) {
        if (dx < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
    if (zoom <= 1) {
      setPan({ x: 0, y: 0 });
    }
  };

  if (!canRender || !current) {
    return null;
  }

  const portal = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt || 'Media viewer'}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] bg-black overscroll-contain"
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* ── Top bar ────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 bg-gradient-to-b from-black/80 to-transparent"
        style={{ height: TOPBAR_H }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left: counter + title */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white/60 text-sm font-mono tabular-nums shrink-0">
            {index + 1}&nbsp;/&nbsp;{items.length}
          </span>
          {current.alt && (
            <span className="text-white text-sm truncate hidden sm:block">
              {current.alt}
            </span>
          )}
        </div>

        {/* Right: zoom + close */}
        <div className="flex items-center gap-1 shrink-0">
          {!isVideo && (
            <button
              onClick={e => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? (
                <ZoomOut className="w-5 h-5" />
              ) : (
                <ZoomIn className="w-5 h-5" />
              )}
            </button>
          )}
          <button
            onClick={e => {
              e.stopPropagation();
              handleClose();
            }}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* ── Prev arrow ─────────────────────────────────── */}
      {multi && (
        <button
          className="absolute left-0 z-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          style={{ top: TOPBAR_H, bottom: thumbbarH, width: ARROW_W }}
          onClick={e => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* ── Next arrow ─────────────────────────────────── */}
      {multi && (
        <button
          className="absolute right-0 z-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          style={{ top: TOPBAR_H, bottom: thumbbarH, width: ARROW_W }}
          onClick={e => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* ── Media area ─────────────────────────────────── */}
      {/*
          THIS is the critical piece. The area is defined by explicit pixel
          offsets so the browser knows its exact size. Then the media element
          uses w-full h-full object-contain — meaning it fills that box while
          always showing the full image/video without any cropping.
      */}
      <div
        className="absolute overflow-hidden"
        style={{
          touchAction: 'none',
          top: TOPBAR_H,
          bottom: thumbbarH,
          left: arrowW,
          right: arrowW,
          cursor: isVideo
            ? 'default'
            : isZoomed
              ? dragging
                ? 'grabbing'
                : 'grab'
              : 'zoom-in',
        }}
        onClick={e => {
          e.stopPropagation();
        }}
        onDoubleClick={e => {
          e.stopPropagation();
          if (!isVideo) {
            toggleZoom();
          }
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            key={current.src}
            src={current.src}
            controls
            className="lb-media-enter w-full h-full"
            style={{ objectFit: 'contain', display: 'block' }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            /* w-full h-full fills the explicit-bounds parent;
               object-contain ensures the full image is visible. */
            className="lb-media-enter w-full h-full"
            style={{
              objectFit: 'contain',
              display: 'block',
              transform: isZoomed
                ? `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`
                : 'none',
              transformOrigin: 'center center',
              transition: dragging ? 'none' : 'transform 0.2s ease',
            }}
          />
        )}
      </div>

      {/* ── Thumbnail strip ────────────────────────────── */}
      {multi && (
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-2 px-4 bg-gradient-to-t from-black/80 to-transparent overflow-x-auto"
          style={{ height: THUMBBAR_H }}
          onClick={e => e.stopPropagation()}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                'relative shrink-0 rounded overflow-hidden transition-[opacity,transform,border-color,box-shadow] duration-200 border-2',
                i === index
                  ? 'border-primary opacity-100 scale-110 shadow-lg'
                  : 'border-transparent opacity-50 hover:opacity-80 hover:scale-105',
              )}
              style={{ width: 56, height: 56 }}
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === index}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return createPortal(portal, document.body);
}
