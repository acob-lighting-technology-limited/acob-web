'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Briefcase, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBannerProps {
  jobCount: number;
  productCount: number;
}

export function AnnouncementBanner({
  jobCount,
  productCount,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const JOB_STORAGE_KEY = 'acob-job-banner-dismissed';
  const PRODUCT_STORAGE_KEY = 'acob-product-banner-dismissed';

  // Build announcements array based on what's available
  const announcements = [];

  if (jobCount > 0) {
    announcements.push({
      id: 'jobs',
      icon: Briefcase,
      message: "We're hiring!",
      details: `${jobCount} ${jobCount === 1 ? 'position' : 'positions'} available.`,
      link: '/contact/careers',
      linkText: 'View openings →',
      storageKey: JOB_STORAGE_KEY,
    });
  }

  if (productCount > 0) {
    announcements.push({
      id: 'products',
      icon: Package,
      message: 'New products available!',
      details: `${productCount} ${productCount === 1 ? 'product' : 'products'} in stock.`,
      link: '/products',
      linkText: 'Browse products →',
      storageKey: PRODUCT_STORAGE_KEY,
    });
  }

  useEffect(() => {
    if (announcements.length === 0) {
      return;
    }

    // Check if any announcement should be shown
    const shouldShow = announcements.some(announcement => {
      const dismissed = localStorage.getItem(announcement.storageKey);
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
  }, [jobCount, productCount, announcements.length]);

  // Rotate through announcements every 5 seconds if there are multiple
  useEffect(() => {
    if (announcements.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleDismiss = () => {
    const currentAnnouncement = announcements[currentIndex];
    localStorage.setItem(
      currentAnnouncement.storageKey,
      new Date().toISOString(),
    );

    // If there are more announcements, show the next one
    if (announcements.length > 1) {
      const remainingAnnouncements = announcements.filter((_, index) => {
        const dismissed = localStorage.getItem(announcements[index].storageKey);
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary text-primary-foreground overflow-hidden relative"
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
                  {currentAnnouncement.id === 'products' ? (
                    <motion.div
                      animate={{
                        filter: [
                          'drop-shadow(0 0 4px rgba(255,255,255,0.6))',
                          'drop-shadow(0 0 12px rgba(255,255,255,1)) drop-shadow(0 0 16px rgba(255,255,255,0.8)) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
                          'drop-shadow(0 0 4px rgba(255,255,255,0.6))',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                    </motion.div>
                  ) : (
                    <Icon className="h-5 w-5 flex-shrink-0" />
                  )}
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
                    {announcements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-primary-foreground w-4'
                            : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
                        }`}
                        aria-label={`Go to announcement ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1 hover:bg-primary-foreground/10 rounded transition-colors"
                  aria-label="Dismiss announcement"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
