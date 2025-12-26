'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { ChatBotContainer } from './chat-bot-container';

/**
 * Main ChatBot component with floating button and chat modal
 *
 * Provides an AI-powered chat interface for users to interact with ACOB Lighting's
 * virtual assistant. Includes rate limiting, navigation suggestions, and responsive design.
 *
 * @example
 * ```tsx
 * <ChatBot />
 * ```
 */
export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const pathname = usePathname();

  // Check if we're on a products slug page and on mobile
  useEffect(() => {
    const checkShouldHide = () => {
      const isProductsSlugPage =
        pathname?.startsWith('/products/') && pathname !== '/products';
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      setShouldHide(isProductsSlugPage && isMobile);
    };

    checkShouldHide();
    window.addEventListener('resize', checkShouldHide);

    return () => {
      window.removeEventListener('resize', checkShouldHide);
    };
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 200px (appears before ScrollToTop at 300px)
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Show tooltip after button becomes visible
  useEffect(() => {
    if (isVisible && !tooltipDismissed && !isOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 1000); // Show tooltip 1 second after button appears

      // Auto-hide tooltip after 8 seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        setTooltipDismissed(true);
      }, 9000);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible, tooltipDismissed, isOpen]);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setTooltipDismissed(true);
    }
  }, [isOpen]);

  // Don't render on mobile for products slug pages
  if (shouldHide) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button with Notification Tooltip */}
      <div className="relative">
        {/* Chat Button */}
        <div className="relative">
          {/* Notification Tooltip */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute right-full -top-1/4 -translate-y-1/2 mr-3 w-64"
              >
                <div className="relative bg-primary text-primary-foreground rounded-lg shadow-xl p-3 border border-primary-foreground/20">
                  {/* Close button */}
                  <button
                    onClick={() => {
                      setShowTooltip(false);
                      setTooltipDismissed(true);
                    }}
                    className="absolute top-1 right-1 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  {/* Content */}
                  <div className="pr-6">
                    <p className="text-sm font-semibold mb-1">👋 Need help?</p>
                    <p className="text-xs opacity-90">
                      Chat with ACOBot, our AI assistant! Ask about projects,
                      products, or services.
                    </p>
                  </div>

                  {/* Arrow pointing to button */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-r border-t border-primary-foreground/20 transform rotate-45" />
                </div>

                {/* Pulsing indicator */}
                <motion.div
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={`relative h-16 w-16 rounded-full border border-primary-foreground bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-lg hover:scale-110 transition-all duration-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
            aria-label="Open chat"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="h-7 w-7 sm:h-7 sm:w-7" />
              ) : (
                <MessageSquare className="h-7 w-7 sm:h-7 sm:w-7" />
              )}
            </motion.div>

            {/* Notification badge */}
            {!tooltipDismissed && !isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center">
                  <span className="text-[10px] font-bold text-white">1</span>
                </span>
              </motion.span>
            )}
          </Button>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatBotContainer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
