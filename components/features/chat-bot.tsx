'use client';

// React imports
import { useState, useRef, useEffect } from 'react';

// Third-party library imports
import { useChat } from 'ai/react';
import type { Message } from 'ai';
import {
  Send,
  MessageSquare,
  X,
  StopCircle,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// UI component imports
import { Button, Textarea } from '@/components/ui';

// Data imports
import { ACOB_SYSTEM_PROMPT, suggestedMessages } from '@/lib/data';

// Navigation imports
import {
  findMatchingRoute,
  extractNavigationIntent,
  useNavigation,
} from '@/lib/utils/navigation';

const formatMessage = (content: string) => {
  if (!content) {
    return content;
  }

  // Debug logging (only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log('Raw message content:', content);
  }

  // Remove stray '/>' if any
  content = content.replace(/\/>/g, '');

  // Convert special characters to HTML-safe
  let formatted = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert URLs to clickable links
  formatted = formatted.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>',
  );

  // Convert email addresses
  formatted = formatted.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<a href="mailto:$1" class="text-blue-600 hover:text-blue-800 underline">$1</a>',
  );

  // Convert phone numbers
  formatted = formatted.replace(
    /(\d{4}\s?\d{3}\s?\d{4})/g,
    '<a href="tel:$1" class="text-blue-600 hover:text-blue-800 underline">$1</a>',
  );

  // Convert line breaks
  formatted = formatted.replace(/\n/g, '<br />');

  // Now convert markdown-style bold/italic
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

  return formatted;
};

// Get current time in WhatsApp format
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [navigationRoute, setNavigationRoute] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
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
  } = useChat({
    api: '/api/chat',
    initialMessages: [ACOB_SYSTEM_PROMPT],
    onFinish: message => {
      // Debug logging (only in development)
      if (process.env.NODE_ENV !== 'production') {
        console.log('AI Response:', message);
      }

      // Check for navigation intent in the response
      const route = extractNavigationIntent(message.content);
      if (route) {
        setNavigationRoute(route);
      }
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

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
  }, [isOpen]);

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

      // If viewport height changed significantly (keyboard opened/closed)
      if (Math.abs(heightDifference) > 150) {
        // Reset viewport after a short delay
        timeoutId = setTimeout(() => {
          window.scrollTo(0, 0);
          // Force a resize event to trigger any necessary recalculations
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    };

    const handleResize = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Update initial height
      initialViewportHeight = window.innerHeight;
    };

    // Listen for viewport changes
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
  }, [isOpen]);

  const handleQuickReply = (message: string) => {
    // Check if this is a navigation request
    const route = findMatchingRoute(message);
    if (route) {
      navigateTo(route);
      setIsOpen(false);
      return;
    }

    setInput(message);
    setTimeout(() => {
      const form = document.getElementById('chat-form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 0);
  };

  const displayMessages = messages.filter(m => m.role !== 'system');
  const isChatting = isLoading;

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300 }}
        className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50"
      >
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border border-muted-foreground bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-lg hover:scale-110 transition-all duration-300"
          aria-label="Open chat"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="h-5 w-5 sm:h-7 sm:w-7" />
            ) : (
              <MessageSquare className="h-5 w-5 sm:h-7 sm:w-7" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 w-[calc(100vw-2rem)] sm:w-[380px] h-[75dvh] sm:h-[80vh] max-h-[600px] rounded-lg overflow-hidden shadow-2xl bg-background border border-border flex flex-col z-50 transition-colors duration-700 chat-container"
              onTouchStart={e => e.stopPropagation()}
              onTouchMove={e => e.stopPropagation()}
            >
              {/* WhatsApp Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-sm outline-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-foreground">
                        ACOBot
                      </h3>
                      <p className="text-xs text-primary-foreground/80">
                        {isChatting ? 'typing...' : 'online'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* WhatsApp Messages Area with Chat Wallpaper */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-background"
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
                {/* Welcome Message */}
                {displayMessages.length === 0 && (
                  <div className="flex justify-center my-4">
                    <div className="bg-muted/50  px-4 py-2 rounded-lg shadow-sm border border-muted-foreground/30">
                      <p className="text-xs text-muted-foreground text-center">
                        You&apos;re chatting with <strong>ACOBot</strong> — your
                        virtual assistant from ACOB Lighting. Have a question?
                        Just ask — I&apos;m here to help!
                      </p>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {displayMessages.map((m: Message) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div
                      className={`max-w-[85%] relative group ${
                        m.role === 'user'
                          ? 'bg-primary/10 rounded-t-2xl rounded-bl-2xl rounded-br-md'
                          : 'bg-surface rounded-t-2xl rounded-br-2xl rounded-bl-md'
                      } shadow-sm`}
                    >
                      <div className="px-3 py-2">
                        <div
                          className="text-sm leading-relaxed text-foreground"
                          style={{
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                            minWidth: 0,
                            width: '100%',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(m.content),
                          }}
                        />
                        <div className="flex items-center justify-end gap-1 mt-1 text-muted-foreground">
                          <span className="text-xs">{getCurrentTime()}</span>
                          {m.role === 'user' && (
                            <div className="flex">
                              <div className="w-4 h-3 flex items-end justify-end">
                                <svg
                                  viewBox="0 0 16 15"
                                  width="16"
                                  height="15"
                                  className="text-muted-foreground"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l3.132 3.006c.143.14.361.125.484-.033l5.929-7.615a.366.366 0 0 0-.063-.51z"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp-style message tail */}
                      <div
                        className={`absolute top-0 ${
                          m.role === 'user' ? '-right-1' : '-left-1'
                        } w-3 h-3 transform rotate-45 ${
                          m.role === 'user' ? 'bg-primary/10' : 'bg-surface'
                        }`}
                      />
                    </div>
                  </div>
                ))}

                {/* WhatsApp Typing Indicator */}
                {isLoading &&
                  displayMessages[displayMessages.length - 1]?.role ===
                    'user' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-2"
                  >
                    <div className="bg-surface rounded-t-2xl rounded-br-2xl rounded-bl-md shadow-sm px-4 py-3 relative">
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      </div>
                      <div className="absolute top-0 -left-1 w-3 h-3 transform rotate-45 bg-surface" />
                    </div>
                  </motion.div>
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

                {/* Navigation Button */}
                {navigationRoute && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center my-4"
                  >
                    <Button
                      onClick={() => {
                        navigateTo(navigationRoute);
                        setIsOpen(false);
                        setNavigationRoute(null);
                      }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full shadow-lg flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Navigate to{' '}
                      {navigationRoute === '/'
                        ? 'Home'
                        : navigationRoute === '/contact/quote'
                          ? 'Get Quote Page'
                          : navigationRoute === '/services'
                            ? 'Services Page'
                            : navigationRoute === '/projects'
                              ? 'Projects Page'
                              : navigationRoute === '/contact/support'
                                ? 'Support Page'
                                : navigationRoute === '/contact/locations'
                                  ? 'Office Locations'
                                  : navigationRoute === '/contact/careers'
                                    ? 'Careers Page'
                                    : navigationRoute === '/about'
                                      ? 'About Us Page'
                                      : navigationRoute === '/updates/gallery'
                                        ? 'Gallery Page'
                                        : navigationRoute ===
                                            '/updates/case-studies'
                                          ? 'Case Studies Page'
                                          : navigationRoute
                                            .split('/')
                                            .pop()
                                            ?.replace(/-/g, ' ')}
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Suggested Messages */}
              {displayMessages.length === 0 && (
                <div className="px-4 py-2 bg-transparent">
                  <div className="flex flex-wrap gap-2">
                    {suggestedMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuickReply(msg)}
                          className="rounded-full text-xs px-3 py-1 h-auto bg-surface !border border-muted text-muted-foreground hover:bg-muted transition-all duration-200 disabled:opacity-50"
                          disabled={isChatting}
                        >
                          {msg}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="px-4 py-2 "
              >
                <form
                  id="chat-form"
                  onSubmit={handleSubmit}
                  className="flex items-stretch gap-3 mb-3"
                >
                  <div className="flex-1 relative bg-card rounded-full flex items-center px-4 py-0 border border-muted-foreground focus-within:border-border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                    <Textarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type a message..."
                      className="flex-1 flex text-foreground justify-end !bg-transparent items-end min-h-9 max-h-28 resize-none border-0 focus:ring-0 focus:outline-none text-sm focus-visible:ring-0 placeholder:text-muted-foreground outline-none py-1 rounded-full"
                      rows={1}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          // Trigger form submission manually
                          const form = document.getElementById(
                            'chat-form',
                          ) as HTMLFormElement;
                          if (form) {
                            const submitEvent = new Event('submit', {
                              bubbles: true,
                              cancelable: true,
                            });
                            form.dispatchEvent(submitEvent);
                          }
                        }
                      }}
                      disabled={isChatting}
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    />
                  </div>

                  {isChatting ? (
                    <Button
                      type="button"
                      size="icon"
                      onClick={stop}
                      className="self-stretch w-10 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all duration-200 flex-shrink-0"
                      disabled={!isChatting}
                    >
                      <StopCircle className="h-4 w-4" />
                      <span className="sr-only">Stop generation</span>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim()}
                      className="self-stretch min-h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 flex-shrink-0 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
