'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBannerProps {
  jobCount: number;
}

export function AnnouncementBanner({ jobCount }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const STORAGE_KEY = 'acob-job-banner-dismissed';

  useEffect(() => {
    // Only show if there are jobs and banner hasn't been dismissed
    if (jobCount > 0) {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      const dismissedDate = dismissed ? new Date(dismissed) : null;
      const now = new Date();

      // Show banner again after 7 days
      if (
        !dismissedDate ||
        now.getTime() - dismissedDate.getTime() > 7 * 24 * 60 * 60 * 1000
      ) {
        setIsVisible(true);
      }
    }
  }, [jobCount]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  };

  if (jobCount === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary text-primary-foreground overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3 gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Briefcase className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    We&apos;re hiring!{' '}
                    <span className="hidden sm:inline">
                      {jobCount} {jobCount === 1 ? 'position' : 'positions'}{' '}
                      available.
                    </span>
                  </p>
                </div>
                <Link
                  href="/contact/careers"
                  className="text-sm font-semibold hover:underline whitespace-nowrap"
                >
                  View openings →
                </Link>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 hover:bg-primary-foreground/10 rounded transition-colors"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
