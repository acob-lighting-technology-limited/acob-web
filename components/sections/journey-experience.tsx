'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Maximize,
  Minimize,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ANNIVERSARY_2026 } from '@/lib/constants/anniversary';
import { COMPANY_STATS } from '@/lib/constants/app.constants';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Animation primitives                                               */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6500;

/** Reveals a phrase word-by-word with a rising stagger. */
function _StaggerWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={cn('inline-block', className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ amount: 0.8 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.06 }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Simple fade-up block. */
function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Thin uppercase kicker line with animated rules on each side. */
function Kicker({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Rise delay={delay} className="flex items-center justify-center gap-3">
      <motion.span
        className="h-px bg-primary/70 origin-left"
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 0.8, ease: EASE, delay: delay + 0.2 }}
      />
      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.35em] text-primary">
        {children}
      </span>
      <motion.span
        className="h-px bg-primary/70 origin-right"
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 0.8, ease: EASE, delay: delay + 0.2 }}
      />
    </Rise>
  );
}

/** Full-viewport snap slide with an oversized background word behind the content. */
function Slide({
  children,
  image,
  className,
}: {
  children: React.ReactNode;
  image?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative flex h-dvh w-full snap-start items-center justify-center overflow-hidden px-6',
        className,
      )}
    >
      {image && (
        <>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.15 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{
              opacity: { duration: 1.1, ease: EASE },
              scale: { duration: 8, ease: 'easeOut' },
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        </>
      )}
      {/* Content fades up each time the slide scrolls into view. */}
      <motion.div
        className={cn(
          'relative z-10 mx-auto w-full max-w-4xl text-center',
          image && 'text-white',
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.35 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/** The oversized background word — placed right under the chapter's Kicker on each slide. */
function GhostWord({ text, light }: { text: string; light?: boolean }) {
  return (
    <motion.span
      className={cn(
        'mb-6 mt-3 block font-bold uppercase leading-[0.95] tracking-tight text-[clamp(2.4rem,7vw,5.5rem)]',
        light ? 'text-white' : 'text-primary',
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {text}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  'A decade of light',
  'Where it began',
  'The conviction',
  'What we built',
  'The grid, reimagined',
  'Beyond power',
  'In numbers',
  'Across Nigeria',
  'The people',
  'Trusted to deliver',
  'Lighting up Nigeria',
  'The next decade',
];

const BUILT_LINES = [
  'Solar hybrid mini-grids for underserved communities.',
  'Street lighting that keeps towns alive after dark.',
  'Power for schools, clinics, markets, and homes.',
  'Local teams trained to keep every system running.',
];

const BEYOND_LINES = [
  'A clinic that can now refrigerate its vaccines.',
  'A workshop that runs past sundown.',
  'A classroom lit long after the sun sets.',
  'A market that trades into the evening.',
];

const REACH_STATES = [
  'Abuja',
  'Kano',
  'Kaduna',
  'Borno',
  'Rivers',
  'Delta',
  'Edo',
  'Kogi',
  'Nasarawa',
  'Jigawa',
  'Ogun',
  'Enugu',
  'Ondo',
];

const SLIDE_AUDIO_FILES = [
  '/audio/journey/slide-01.mp3',
  '/audio/journey/slide-02.mp3',
  '/audio/journey/slide-03.mp3',
  '/audio/journey/slide-04.mp3',
  '/audio/journey/slide-05.mp3',
  '/audio/journey/slide-06.mp3',
  '/audio/journey/slide-07.mp3',
  '/audio/journey/slide-08.mp3',
  '/audio/journey/slide-09.mp3',
  '/audio/journey/slide-10.mp3',
  '/audio/journey/slide-11.mp3',
  '/audio/journey/slide-12.mp3',
];

export function JourneyExperience({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const slideAudioRef = useRef<HTMLAudioElement | null>(null);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const lastIndex = CHAPTERS.length - 1;

  useEffect(() => setMounted(true), []);

  // Quiet ambient score for the journey — starts on "Start", stops on close.
  useEffect(() => {
    const audio = new Audio('/audio/journey-bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.05;
    bgMusicRef.current = audio;
    return () => {
      audio.pause();
      bgMusicRef.current = null;
    };
  }, []);

  // Persistent audio player instance for slide narrations
  useEffect(() => {
    const player = new Audio();
    slideAudioRef.current = player;
    return () => {
      player.pause();
      slideAudioRef.current = null;
    };
  }, []);

  // Play slide narration audio matching the current active slide
  useEffect(() => {
    const player = slideAudioRef.current;
    if (!player || !started || finished) {
      player?.pause();
      setHasAudio(false);
      return;
    }

    const audioPath = SLIDE_AUDIO_FILES[active];
    if (audioPath && !isMuted) {
      player.pause();
      player.src = audioPath;
      player.currentTime = 0;
      setAudioProgress(0);
      setHasAudio(true);

      player.ontimeupdate = () => {
        if (player.duration) {
          setAudioProgress((player.currentTime / player.duration) * 100);
        }
      };

      player.onended = () => {
        setAudioProgress(100);
        if (isPlaying) {
          setTimeout(() => {
            if (active >= lastIndex) {
              setIsPlaying(false);
              setFinished(true);
            } else {
              goTo(active + 1);
            }
          }, 550);
        }
      };

      if (isPlaying) {
        player.play().catch(() => {
          setHasAudio(false);
        });
      }
    } else {
      player.pause();
      setHasAudio(false);
      setAudioProgress(0);
    }
  }, [active, started, finished, isMuted, isPlaying, lastIndex]);

  const logoSrc = isDark
    ? '/images/acob-logo-dark-2026.webp'
    : '/images/acob-logo-light-2026.webp';

  // Track which slide fills the viewport for the progress rail.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const onScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      setActive(Math.min(lastIndex, Math.max(0, index)));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [lastIndex]);

  const goTo = (index: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const clamped = Math.min(lastIndex, Math.max(0, index));
    container.scrollTo({
      top: clamped * container.clientHeight,
      behavior: 'smooth',
    });
  };

  // Fallback timer: only used when narration audio is muted or unavailable
  useEffect(() => {
    if (!isPlaying || !started || finished || hasAudio) {
      return;
    }

    const t = setTimeout(() => {
      if (active >= lastIndex) {
        setIsPlaying(false);
        setFinished(true);
      } else {
        goTo(active + 1);
      }
    }, AUTOPLAY_MS);

    return () => clearTimeout(t);
  }, [isPlaying, active, started, finished, lastIndex, hasAudio]);

  const handleStart = () => {
    setStarted(true);
    bgMusicRef.current?.play().catch(() => {});
    // Give a 1200ms visual breath so the start overlay transition completes before audio 1 plays
    setTimeout(() => {
      setIsPlaying(true);
    }, 1200);
  };

  const handleRestart = () => {
    setFinished(false);
    setActive(0);
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    setIsPlaying(true);
    const audio = bgMusicRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    if (slideAudioRef.current) {
      slideAudioRef.current.currentTime = 0;
      slideAudioRef.current.play().catch(() => {});
    }
  };

  const togglePlaying = () => {
    setIsPlaying(prev => {
      const next = !prev;
      if (next) {
        bgMusicRef.current?.play().catch(() => {});
        slideAudioRef.current?.play().catch(() => {});
      } else {
        bgMusicRef.current?.pause();
        slideAudioRef.current?.pause();
      }
      return next;
    });
  };

  const stopAndClose = () => {
    bgMusicRef.current?.pause();
    slideAudioRef.current?.pause();
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (bgMusicRef.current) {
        bgMusicRef.current.muted = next;
      }
      if (slideAudioRef.current) {
        slideAudioRef.current.muted = next;
      }
      return next;
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  // Keyboard controls: Esc always exits; space starts/pauses; arrows change chapter.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        stopAndClose();
        return;
      }
      if (!started) {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          handleStart();
        }
        return;
      }
      if (finished) {
        return;
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlaying();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [started, finished, active]);

  const stats = [
    {
      value: COMPANY_STATS.projectsCompleted,
      suffix: '+',
      label: 'Projects delivered',
    },
    {
      value: COMPANY_STATS.totalCapacityMW,
      suffix: 'MW+',
      label: 'Capacity installed',
    },
    {
      value: COMPANY_STATS.communitiesServed,
      suffix: '+',
      label: 'Communities served',
    },
    {
      value: COMPANY_STATS.totalConnections,
      suffix: '+',
      label: 'Connections energised',
    },
    { value: COMPANY_STATS.staffStrength, suffix: '+', label: 'Team members' },
    { value: 10, suffix: '', label: 'Years of impact' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-white text-zinc-950 transition-colors duration-500 dark:bg-zinc-950 dark:text-white">
        {/* Start gate — shown until the visitor chooses to begin */}
        <AnimatePresence>
          {!started && (
            <motion.div
              key="journey-start"
              className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden px-6 text-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.8, ease: EASE }}
            >
              <Image
                src={ANNIVERSARY_2026.image}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />

              <button
                onClick={stopAndClose}
                aria-label="Close the journey"
                className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-white/5 p-2 backdrop-blur-sm transition-colors hover:bg-white/15 sm:right-8 sm:top-8"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
                className="relative z-10 flex flex-col items-center gap-5"
              >
                {mounted && (
                  <Image
                    src={logoSrc}
                    alt="ACOB Lighting"
                    width={320}
                    height={100}
                    priority
                    className="h-16 w-auto sm:h-20 md:h-24"
                  />
                )}
                <span className="text-xs uppercase tracking-[0.4em] text-white/80">
                  {ANNIVERSARY_2026.period}
                </span>
                <h1 className="max-w-2xl font-bold leading-tight text-white text-[clamp(1.9rem,5.5vw,3.25rem)]">
                  {ANNIVERSARY_2026.title}
                </h1>
                <Button
                  size="lg"
                  onClick={handleStart}
                  className="mt-3 px-10 py-6 text-base font-semibold"
                >
                  <Play className="mr-2 h-4 w-4" /> Start the journey
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing card — shown once autoplay has held on the finale */}
        <AnimatePresence>
          {finished && (
            <motion.div
              key="journey-end"
              className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden px-6 text-center"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image
                src={ANNIVERSARY_2026.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />

              <div className="relative z-10 flex flex-col items-center gap-5">
                {mounted && (
                  <Image
                    src={logoSrc}
                    alt="ACOB Lighting"
                    width={180}
                    height={58}
                    className="h-10 w-auto sm:h-12"
                  />
                )}
                <p className="max-w-xl text-base font-medium text-white sm:text-lg">
                  Ten years of light. The next decade starts now.
                </p>
                <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    onClick={handleRestart}
                    variant="outline"
                    className="border-white/30 bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white hover:text-zinc-950"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Restart
                  </Button>
                  <Link href="/projects" onClick={stopAndClose}>
                    <Button
                      size="lg"
                      className="px-8 py-6 text-base font-semibold"
                    >
                      Explore our projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <button
                  onClick={stopAndClose}
                  className="mt-4 text-xs uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
                >
                  ← Close experience
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient glows shared by every slide */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-1/2 top-[-20%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-30%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        {/* Top progress bar — one segment per chapter, synced with audio duration */}
        <div className="fixed inset-x-0 top-0 z-50 flex gap-1 p-2">
          {CHAPTERS.map((label, i) => (
            <div
              key={label}
              className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-900/10 dark:bg-white/15"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-75 ease-linear"
                style={
                  i < active
                    ? { width: '100%' }
                    : i > active
                      ? { width: '0%' }
                      : hasAudio
                        ? { width: `${audioProgress}%` }
                        : {
                            width: '0%',
                            animation: `journeySegmentFill ${AUTOPLAY_MS}ms linear forwards`,
                            animationPlayState: isPlaying
                              ? 'running'
                              : 'paused',
                          }
                }
              />
            </div>
          ))}
        </div>

        {/* Top chrome — logo + controls */}
        <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={stopAndClose}
            aria-label="Close the journey"
            className="transition-opacity hover:opacity-70"
          >
            {mounted ? (
              <Image
                src={logoSrc}
                alt="ACOB Lighting"
                width={150}
                height={44}
                priority
                className="h-9 w-auto sm:h-10"
              />
            ) : (
              <span className="h-9 w-[120px]" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={
                isMuted ? 'Unmute background music' : 'Mute background music'
              }
              className="rounded-full border border-zinc-900/15 bg-zinc-900/5 p-2 backdrop-blur-sm transition-colors hover:bg-zinc-900/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/15"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen ? 'Exit full screen' : 'Enter full screen'
              }
              className="rounded-full border border-zinc-900/15 bg-zinc-900/5 p-2 backdrop-blur-sm transition-colors hover:bg-zinc-900/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/15"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="Toggle light and dark mode"
              className="rounded-full border border-zinc-900/15 bg-zinc-900/5 p-2 backdrop-blur-sm transition-colors hover:bg-zinc-900/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/15"
            >
              {mounted && isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={stopAndClose}
              aria-label="Exit the journey"
              className="rounded-full border border-zinc-900/15 bg-zinc-900/5 p-2 backdrop-blur-sm transition-colors hover:bg-zinc-900/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Bottom chrome — play / pause + counter */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={togglePlaying}
            aria-label={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
            className="flex items-center gap-2 rounded-full border border-zinc-900/15 bg-zinc-900/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-sm transition-colors hover:bg-zinc-900/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/15"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Play
              </>
            )}
          </button>
          <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-white/50">
            {String(active + 1).padStart(2, '0')} /{' '}
            {String(CHAPTERS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress rail */}
        <nav
          aria-label="Journey chapters"
          className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 sm:flex"
        >
          {CHAPTERS.map((label, i) => (
            <button
              key={label}
              onClick={() => goTo(i)}
              aria-label={`Go to chapter: ${label}`}
              aria-current={active === i ? 'true' : undefined}
              className="group flex items-center gap-3"
            >
              <span
                className={cn(
                  'text-[10px] uppercase tracking-[0.2em] transition-all duration-300',
                  active === i
                    ? 'text-primary opacity-100'
                    : 'text-zinc-500 opacity-0 group-hover:opacity-100 dark:text-white/50',
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  active === i
                    ? 'h-5 w-1.5 bg-primary'
                    : 'h-1.5 w-1.5 bg-zinc-400/50 group-hover:bg-zinc-500 dark:bg-white/30 dark:group-hover:bg-white/60',
                )}
              />
            </button>
          ))}
        </nav>

        {/* Slides */}
        <div
          ref={containerRef}
          className="relative z-10 h-dvh snap-y snap-mandatory overflow-y-auto overscroll-contain"
        >
          {/* 01 — Opening */}
          <Slide image="/images/journey/slide-01-hero.jpg">
            <Kicker>ACOB Lighting · {ANNIVERSARY_2026.period}</Kicker>
            <GhostWord text="IT" light />

            <Rise delay={0.9} className="mt-8">
              <p className="mx-auto max-w-xl text-base text-white/80 sm:text-lg">
                {ANNIVERSARY_2026.title}. Ten years of purpose, progress, and
                power — told in twelve short chapters.
              </p>
            </Rise>
            <motion.button
              onClick={() => goTo(1)}
              aria-label="Begin the journey"
              className="mt-14 inline-flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.6 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <span className="text-[11px] uppercase tracking-[0.3em]">
                Scroll
              </span>
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </Slide>

          {/* 02 — Origin */}
          <Slide image="/images/about/our-story.webp">
            <Kicker>Chapter one · Where it began</Kicker>
            <GhostWord text="BEGAN" light />
            <Rise delay={1} className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                In 2016, ACOB Lighting Technology Limited set out from Abuja
                asking what it would take to bring dependable power to the
                communities the grid had left behind.
              </p>
            </Rise>
          </Slide>

          {/* 03 — Conviction */}
          <Slide image="/images/journey/slide-03-healthcare.webp">
            <Kicker>Chapter two · The conviction</Kicker>
            <GhostWord text="WITH A BELIEF" light />

            <Rise delay={1} className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                That belief became our compass: no community left in the dark,
                and no household forced to choose between energy and
                opportunity.
              </p>
            </Rise>
          </Slide>

          {/* 04 — What we built */}
          <Slide image="/images/projects/installation-high-density-streetlight-1.webp">
            <Kicker>Chapter three · What we built</Kicker>
            <GhostWord text="WE BUILT" light />

            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 text-left">
              {BUILT_LINES.map((line, i) => (
                <motion.div
                  key={line}
                  className="flex items-center gap-4 border-l-2 border-primary/60 pl-4"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.6 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 0.35 + i * 0.18,
                  }}
                >
                  <p className="text-sm text-white/90 sm:text-lg">{line}</p>
                </motion.div>
              ))}
            </div>
          </Slide>

          {/* 05 — Mini-grids */}
          <Slide image="/images/services/mini-grid-solutions.webp">
            <Kicker>Chapter four · The grid, reimagined</Kicker>
            <GhostWord text="A GRID" light />

            <Rise delay={1} className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Engineered for the toughest operating environments — pairing
                solar generation with storage so power stays on when the sun
                goes down.
              </p>
            </Rise>
          </Slide>

          {/* 06 — Beyond power */}
          <Slide image="/images/olooji-community.webp">
            <Kicker>Chapter five · Beyond power</Kicker>
            <GhostWord text="THAT REACHED" light />

            <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
              {BEYOND_LINES.map((line, i) => (
                <motion.div
                  key={line}
                  className="rounded-2xl border border-white/20 bg-black/40 p-5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: 0.3 + i * 0.12,
                  }}
                >
                  <p className="text-sm text-white/90 sm:text-base">{line}</p>
                </motion.div>
              ))}
            </div>
          </Slide>

          {/* 07 — Numbers */}
          <Slide image="/images/journey/slide-07-impact.jpg">
            <Kicker>Chapter six · A decade in numbers</Kicker>
            <GhostWord text="THOUSANDS" light />

            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 0.3 + i * 0.1,
                  }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={1800}
                    className="text-4xl font-bold text-primary sm:text-5xl"
                  />
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </Slide>

          {/* 08 — Reach */}
          <Slide image="/images/about/our-reach.webp">
            <Kicker>Chapter seven · Across Nigeria</Kicker>
            <GhostWord text="ACROSS NIGERIA" light />

            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2">
              {REACH_STATES.map((state, i) => (
                <motion.span
                  key={state}
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs text-white/90 sm:text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                >
                  {state}
                </motion.span>
              ))}
            </div>
          </Slide>

          {/* 09 — People */}
          <Slide image="/images/about/acob-team.webp">
            <Kicker>Chapter eight · The people</Kicker>
            <GhostWord text="POWERED BY PEOPLE" light />

            <Rise delay={1} className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Engineers, field technicians, and community operatives — a
                growing team that designs, deploys, and sustains every system we
                leave behind.
              </p>
            </Rise>
          </Slide>

          {/* 10 — Partnerships */}
          <Slide image="/images/about/partners-collage.webp">
            <Kicker>Chapter nine · Trusted to deliver</Kicker>
            <GhostWord text="TRUSTED BY PARTNERS" light />

            <Rise delay={1} className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Government agencies, developers, and financing partners who
                share one goal — expanding reliable energy access across
                Nigeria.
              </p>
            </Rise>
          </Slide>

          {/* 11 — Tagline */}
          <Slide image="/images/services/streetlighting-1.webp">
            <Kicker>Chapter ten · The promise</Kicker>
            <GhostWord text="LIGHTING UP NIGERIA" light />

            <Rise delay={1.1} className="mt-10">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {ANNIVERSARY_2026.hashtags.slice(0, 4).map(tag => (
                  <span key={tag} className="text-xs text-white/70 sm:text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Rise>
          </Slide>

          {/* 12 — Finale */}
          <Slide image="/images/journey/slide-12-future.jpg">
            <Kicker>Chapter eleven · What comes next</Kicker>
            <GhostWord text="WE'RE JUST BEGINNING" light />

            <Rise delay={1} className="mt-8">
              <p className="mx-auto max-w-xl text-base text-white/80 sm:text-lg">
                More communities. More capacity. More light. Be part of what we
                build next.
              </p>
            </Rise>
            <Rise delay={1.2} className="mt-10">
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/projects" onClick={stopAndClose}>
                  <Button
                    size="lg"
                    className="w-full px-8 py-6 text-base font-semibold sm:w-auto"
                  >
                    Explore our projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact" onClick={stopAndClose}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/40 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-zinc-950 sm:w-auto"
                  >
                    Partner with us
                  </Button>
                </Link>
              </div>
            </Rise>
            <Rise delay={1.4} className="mt-12">
              <button
                onClick={stopAndClose}
                className="text-xs uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
              >
                ← Close experience
              </button>
            </Rise>
          </Slide>
        </div>
      </div>
    </MotionConfig>
  );
}
