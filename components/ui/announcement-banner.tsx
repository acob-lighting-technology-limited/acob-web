'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Briefcase, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { readStorage, writeStorage } from '@/lib/utils/safe-storage';
import { useAutoplayPause } from '@/hooks/use-autoplay-pause';

interface AnnouncementBannerProps {
  jobCount: number;
}

export function AnnouncementBanner({ jobCount }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const JOB_STORAGE_KEY = 'acob-job-banner-dismissed';

  // Build announcements array based on what's available
  const announcements: Array<{
    id: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: 'true' }>;
    message: string;
    details: string;
    link: string;
    linkText: string;
    storageKey: string;
  }> = [];

  if (jobCount > 0) {
    announcements.push({
      id: 'jobs',
      icon: Briefcase,
      message: 'We’re hiring!',
      details: `${jobCount} ${jobCount === 1 ? 'position' : 'positions'} available.`,
      link: '/contact/careers',
      linkText: 'View Openings →',
      storageKey: JOB_STORAGE_KEY,
    });
  }

  useEffect(() => {
    if (announcements.length === 0) {
      return;
    }

    // Check if any announcement should be shown
    const shouldShow = announcements.some(announcement => {
      const dismissed = readStorage(announcement.storageKey);
      const dismissedDate = dismissed ? new Date(dismissed) : null;
      const now = new Date();

      // Show banner again after 7 days
      return (
        !dismissedDate ||
        now.getTime() - dismissedDate.getTime() > 7 * 24 * 60 * 60 * 1000
      );
    });

    if (shouldShow) {
      setIsVisible(true);
    }
  }, [jobCount, announcements.length]);

  const autoplay = useAutoplayPause();

  // Rotate through announcements every 5 seconds if there are multiple
  useEffect(() => {
    if (announcements.length <= 1 || autoplay.paused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length, autoplay.paused]);

  const handleDismiss = () => {
    const currentAnnouncement = announcements[currentIndex];
    writeStorage(currentAnnouncement.storageKey, new Date().toISOString());

    // If there are more announcements, show the next one
    if (announcements.length > 1) {
      const remainingAnnouncements = announcements.filter((_, index) => {
        const dismissed = readStorage(announcements[index].storageKey);
        const dismissedDate = dismissed ? new Date(dismissed) : null;
        const now = new Date();
        return (
          !dismissedDate ||
          now.getTime() - dismissedDate.getTime() > 7 * 24 * 60 * 60 * 1000
        );
      });

      if (remainingAnnouncements.length === 0) {
        setIsVisible(false);
      } else {
        setCurrentIndex(0);
      }
    } else {
      setIsVisible(false);
    }
  };

  if (announcements.length === 0) {
    return null;
  }

  const currentAnnouncement = announcements[currentIndex];
  const Icon = currentAnnouncement.icon;

  // Always-present wrapper (height tracks the banner) so the fixed Header can
  // measure it and offset itself to sit just below the banner.
  return (
    <div data-announcement-banner>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary text-primary-foreground overflow-hidden relative"
            role="region"
            aria-label="Announcements"
            {...autoplay.handlers}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-3 gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAnnouncement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <Icon
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {currentAnnouncement.message}{' '}
                        <span className="hidden sm:inline">
                          {currentAnnouncement.details}
                        </span>
                      </p>
                    </div>
                    <Link
                      href={currentAnnouncement.link}
                      className="text-sm font-semibold hover:underline whitespace-nowrap"
                    >
                      {currentAnnouncement.linkText}
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-2">
                  {/* Indicator dots for multiple announcements */}
                  {announcements.length > 1 && (
                    <div className="flex gap-1.5 mr-2">
                      <button
                        type="button"
                        onClick={autoplay.toggle}
                        className="flex h-6 w-6 items-center justify-center rounded hover:bg-primary-foreground/10"
                        aria-label={
                          autoplay.stopped
                            ? 'Play Announcements'
                            : 'Pause Announcements'
                        }
                      >
                        {autoplay.stopped ? (
                          <Play className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <Pause className="h-3 w-3" aria-hidden="true" />
                        )}
                      </button>
                      {announcements.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          className="group flex h-6 items-center px-0.5"
                          aria-label={`Go to announcement ${index + 1}`}
                          aria-current={index === currentIndex}
                        >
                          <span
                            className={`block h-1.5 rounded-full transition-[width,background-color] ${
                              index === currentIndex
                                ? 'bg-primary-foreground w-4'
                                : 'w-1.5 bg-primary-foreground/40 group-hover:bg-primary-foreground/60'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="flex-shrink-0 p-1 hover:bg-primary-foreground/10 rounded transition-colors"
                    aria-label="Dismiss announcement"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
