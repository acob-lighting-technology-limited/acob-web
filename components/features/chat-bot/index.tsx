'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
            {!isOpen && (
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
