'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle, Info, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AnnouncementBannerProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  showCloseButton?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
  linkText?: string;
  linkHref?: string;
}

const bannerStyles = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    icon: AlertCircle,
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600 dark:text-green-400',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    icon: AlertCircle,
    iconColor: 'text-red-600 dark:text-red-400',
  },
};

export function AnnouncementBanner({
  message,
  type = 'info',
  showCloseButton = true,
  isVisible = true,
  onClose,
  className = '',
  linkText,
  linkHref,
}: AnnouncementBannerProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if banner was dismissed in localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-banner-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleClose = () => {
    setIsHidden(true);
    setIsDismissed(true);
    localStorage.setItem('announcement-banner-dismissed', 'true');
    onClose?.();
  };

  const styles = bannerStyles[type];
  const IconComponent = styles.icon;

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div
      className={`transition-all duration-300 ease-in-out sticky top-0 z-[500] ${
        isHidden ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
      }`}
    >
      <div
        className={`${styles.bg} ${styles.border} border-b ${styles.text} px-4 py-1 ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconComponent className={`h-5 w-5 ${styles.iconColor} flex-shrink-0`} />
            <p className="text-sm font-medium leading-relaxed">
              {message}
            </p>
            {linkText && linkHref && (
              <Link
                href={linkHref}
                className="inline-flex items-center gap-1 text-sm font-semibold hover:underline transition-colors"
              >
                {linkText}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className={`h-8 w-8 p-0 ${styles.text} hover:bg-black/5 dark:hover:bg-white/5`}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close announcement</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Dynamic hiring banner that checks for active job postings
export function HiringAnnouncementBanner() {
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch('/api/job-postings');
        if (response.ok) {
          const jobs = await response.json();
          setJobPostings(jobs);
        }
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  // Only show banner if there are active job postings
  if (isLoading || jobPostings.length === 0) {
    return null;
  }

  return (
    <AnnouncementBanner
      message="We're hiring! Join our team and help power Nigeria's clean energy future."
      type="success"
      linkText="View openings"
      linkHref="/contact/careers"
      isVisible={true}
    />
  );
}

// Example usage component for demonstration
export function DemoAnnouncementBanner() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [currentType, setCurrentType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [isVisible, setIsVisible] = useState(false);
  const [currentLinkText, setCurrentLinkText] = useState<string>('');
  const [currentLinkHref, setCurrentLinkHref] = useState<string>('');

  // Example announcements - you can customize these
  const announcements = [
    {
      message: "We're hiring! Join our team and help power Nigeria's clean energy future.",
      type: 'success' as const,
      linkText: 'View openings',
      linkHref: '/contact/careers',
    },
    {
      message: "Special offer: 15% off solar installations this month.",
      type: 'info' as const,
      linkText: 'Get quote',
      linkHref: '/contact/quote',
    },
    {
      message: "Scheduled maintenance: Our website will be temporarily unavailable on Sunday, 2-4 AM.",
      type: 'warning' as const,
      linkText: '',
      linkHref: '',
    },
    {
      message: "Customer support: Our phone lines are experiencing high volume. Email us for faster response.",
      type: 'error' as const,
      linkText: 'Contact us',
      linkHref: '/contact',
    },
  ];

  const showAnnouncement = (index: number) => {
    const announcement = announcements[index];
    setCurrentMessage(announcement.message);
    setCurrentType(announcement.type);
    setCurrentLinkText(announcement.linkText);
    setCurrentLinkHref(announcement.linkHref);
    setIsVisible(true);
    // Clear any existing dismissal
    localStorage.removeItem('announcement-banner-dismissed');
  };

  return (
    <div className="space-y-4">
      <AnnouncementBanner
        message={currentMessage}
        type={currentType}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        linkText={currentLinkText}
        linkHref={currentLinkHref}
      />
      
      {/* Demo controls - remove this in production */}
      <div className="fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border">
        <h3 className="text-sm font-semibold mb-2">Banner Demo</h3>
        <div className="space-y-2">
          {announcements.map((announcement, index) => (
            <button
              key={index}
              onClick={() => showAnnouncement(index)}
              className="block w-full text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Show {announcement.type}
            </button>
          ))}
          <button
            onClick={() => setIsVisible(false)}
            className="block w-full text-xs px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/40"
          >
            Hide Banner
          </button>
        </div>
      </div>
    </div>
  );
}
