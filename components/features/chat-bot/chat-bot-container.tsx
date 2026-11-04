'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from 'ai';
import { useNavigation } from '@/lib/utils/navigation';
import { useChatBot } from './use-chat-bot';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';
import { ChatInput } from './chat-input';
import { SuggestedQuestions } from './suggested-questions';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { useDialogFocus } from '@/hooks/use-dialog-focus';

interface ChatBotContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Main chat container component with messages area and all chat functionality
 */
export function ChatBotContainer({ isOpen, onClose }: ChatBotContainerProps) {
  const { navigateTo } = useNavigation();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    error,
    stop,
    navigationRoutes,
    setNavigationRoutes,
    messageCount,
    rateLimitReached,
    messagesEndRef,
    messagesContainerRef,
    MESSAGE_LIMIT,
  } = useChatBot();

  const isChatting = isLoading;
  const scrollPositionRef = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Move focus into the panel, keep Tab inside it, close on Escape and hand
  // focus back to the launcher on close.
  useDialogFocus(panelRef, isOpen, onClose);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      const preventTouch = (e: TouchEvent) => {
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer && messagesContainer.contains(e.target as Node)) {
          return;
        }
        e.preventDefault();
      };

      document.addEventListener('touchmove', preventTouch, { passive: false });

      return () => {
        // Restore scroll without flickering
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        // Restore scroll position without animation
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant' as 'auto' | 'smooth' | 'instant',
        });

        document.removeEventListener('touchmove', preventTouch);
      };
    }
  }, [isOpen, messagesContainerRef]);

  // Handle viewport changes when keyboard opens/closes
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let initialViewportHeight = window.innerHeight;
    let timeoutId: NodeJS.Timeout;

    const handleViewportChange = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;

      if (Math.abs(heightDifference) > 150) {
        timeoutId = setTimeout(() => {
          window.scrollTo(0, 0);
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    };

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      initialViewportHeight = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleViewportChange);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen]);

  // Handle scroll events within messages container
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer || !isOpen) {
      return;
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
    };

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    messagesContainer.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    messagesContainer.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });
    messagesContainer.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      messagesContainer.removeEventListener('touchstart', handleTouchStart);
      messagesContainer.removeEventListener('touchmove', handleTouchMove);
      messagesContainer.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, messagesContainerRef]);

  const handleQuickReply = (message: string) => {
    setInput(message);
    setTimeout(() => {
      const form = document.getElementById('chat-form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 0);
  };

  const handleNavigate = (route: string, messageId: string) => {
    navigateTo(route);
    onClose();
    setNavigationRoutes(prev => {
      const newMap = new Map(prev);
      newMap.delete(messageId);
      return newMap;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Chat Container */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="ACOBot chat"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[75dvh] sm:h-[80vh] max-h-[620px] rounded-2xl overflow-hidden shadow-2xl bg-background border border-border flex flex-col z-50 transition-colors duration-500 chat-container"
            onTouchStart={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
          >
            <ChatHeader isChatting={isChatting} onClose={onClose} />

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              role="log"
              aria-live="polite"
              aria-busy={isLoading}
              aria-label="Conversation"
              className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 bg-muted/30 relative"
              style={{
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
              }}
              onTouchStart={e => e.stopPropagation()}
              onTouchMove={e => e.stopPropagation()}
            >
              {/* Rate Limit Counter */}
              {messages.length > 0 && !rateLimitReached && (
                <div className="sticky top-0 z-10 flex justify-center py-2 backdrop-blur-sm">
                  <div className="bg-muted/80 px-3 py-1 rounded-full shadow-sm border border-muted-foreground/20">
                    <p className="text-xs text-muted-foreground">
                      {MESSAGE_LIMIT - messageCount} messages remaining today
                    </p>
                  </div>
                </div>
              )}

              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="border-border bg-card rounded-2xl border p-3.5 text-sm shadow-sm">
                  <p className="text-foreground">
                    👋 Hi, I&apos;m <strong>ACOBot</strong> — your virtual
                    assistant from ACOB Lighting. Ask me anything about our
                    products, projects or services.
                  </p>
                  <span className="text-muted-foreground mt-1 block text-xs">
                    {MESSAGE_LIMIT - messageCount} messages remaining today
                  </span>
                </div>
              )}

              {/* Rate Limit Message */}
              {rateLimitReached && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center my-4"
                  role="status"
                >
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-amber-700 dark:text-amber-400 text-sm text-center">
                      <strong>Daily message limit reached.</strong> You&apos;ve
                      used all {MESSAGE_LIMIT} messages for today. Please try
                      again in 24 hours or contact us directly at{' '}
                      <a
                        href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}
                        className="underline"
                      >
                        {CONTACT_INFO.phone.primary}
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((m: Message) => (
                <ChatMessage
                  key={m.id}
                  message={m}
                  navigationRoute={navigationRoutes.get(m.id)}
                  onNavigate={
                    navigationRoutes.get(m.id)
                      ? route => handleNavigate(route, m.id)
                      : undefined
                  }
                />
              ))}

              {/* Typing Indicator */}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <TypingIndicator label="Searching ACOB info…" />
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center my-4"
                  role="alert"
                >
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-destructive text-sm text-center">
                      <strong>Message failed to send.</strong> Check your
                      connection and send it again.
                    </p>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Messages */}
            {messages.length === 0 && !rateLimitReached && (
              <SuggestedQuestions
                onSelect={handleQuickReply}
                isChatting={isChatting}
                rateLimitReached={rateLimitReached}
              />
            )}

            {/* Input Area */}
            <ChatInput
              input={input}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onStop={stop}
              isLoading={isLoading}
              rateLimitReached={rateLimitReached}
              topBorder={!(messages.length === 0 && !rateLimitReached)}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
