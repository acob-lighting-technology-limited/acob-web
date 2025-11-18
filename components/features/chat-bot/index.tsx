'use client';

import { useState, useEffect } from 'react';
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

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`z-50 h-16 w-16 rounded-full border border-primary-foreground bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-lg hover:scale-110 transition-all duration-500 ${
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
      </Button>

      {/* Chat Modal */}
      <ChatBotContainer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
