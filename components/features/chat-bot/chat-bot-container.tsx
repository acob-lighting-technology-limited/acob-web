'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from 'ai';
import { useNavigation } from '@/lib/utils/navigation';
import { useChatBot } from './use-chat-bot';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';
import { ChatInput } from './chat-input';
import { SuggestedQuestions } from './suggested-questions';

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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
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
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';

        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

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
          />

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 w-[calc(100vw-2rem)] sm:w-[380px] h-[75dvh] sm:h-[80vh] max-h-[600px] rounded-lg overflow-hidden shadow-2xl bg-background border border-border flex flex-col z-50 transition-colors duration-500 chat-container"
            onTouchStart={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
          >
            <ChatHeader isChatting={isChatting} onClose={onClose} />

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-background relative"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-16-16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
                <div className="flex justify-center my-4">
                  <div className="bg-muted/50 px-4 py-2 rounded-lg shadow-sm border border-muted-foreground/30">
                    <p className="text-xs text-muted-foreground text-center">
                      You&apos;re chatting with <strong>ACOBot</strong> — your
                      virtual assistant from ACOB Lighting. Have a question?
                      Just ask — I&apos;m here to help!
                      <br />
                      <span className="text-xs text-muted-foreground/70 mt-1 block">
                        ({MESSAGE_LIMIT - messageCount} messages remaining
                        today)
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Rate Limit Message */}
              {rateLimitReached && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center my-4"
                >
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-amber-700 dark:text-amber-400 text-sm text-center">
                      <strong>Daily message limit reached.</strong> You&apos;ve
                      used all {MESSAGE_LIMIT} messages for today. Please try
                      again in 24 hours or contact us directly at{' '}
                      <a href="tel:+2347049202634" className="underline">
                        +234 704 920 2634
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
                <TypingIndicator />
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center my-4"
                >
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-destructive text-sm text-center">
                      <strong>Message failed to send.</strong> Try again.
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
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
