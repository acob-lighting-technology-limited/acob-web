import { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { ACOB_SYSTEM_PROMPT } from '@/lib/data';
import { extractNavigationIntent } from '@/lib/utils/navigation';

const MESSAGE_LIMIT = 5;
const RATE_LIMIT_KEY = 'acob_chat_messages';
const RATE_LIMIT_TIMESTAMP_KEY = 'acob_chat_timestamp';

/**
 * Custom hook for chat bot logic including rate limiting and message management
 *
 * @returns Chat bot state and functions
 */
export function useChatBot() {
  const [navigationRoutes, setNavigationRoutes] = useState<Map<string, string>>(
    new Map(),
  );
  const [messageCount, setMessageCount] = useState(0);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Check rate limit on mount
  useEffect(() => {
    const storedCount = localStorage.getItem(RATE_LIMIT_KEY);
    const storedTimestamp = localStorage.getItem(RATE_LIMIT_TIMESTAMP_KEY);

    if (storedCount && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp);
      const now = Date.now();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursElapsed < 24) {
        const count = parseInt(storedCount);
        setMessageCount(count);
        setRateLimitReached(count >= MESSAGE_LIMIT);
      } else {
        localStorage.removeItem(RATE_LIMIT_KEY);
        localStorage.removeItem(RATE_LIMIT_TIMESTAMP_KEY);
        setMessageCount(0);
        setRateLimitReached(false);
      }
    }
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    setInput,
    error,
    stop,
  } = useChat({
    api: '/api/chat',
    initialMessages: [ACOB_SYSTEM_PROMPT],
    onFinish: message => {
      // Extract navigation intent
      const route = extractNavigationIntent(message.content);
      if (route) {
        setNavigationRoutes(prev => new Map(prev).set(message.id, route));
      }
    },
    onError: error => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Chat error:', error);
      }
    },
  });

  // Wrap handleSubmit with rate limit check
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rateLimitReached) {
      return;
    }

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    if (!localStorage.getItem(RATE_LIMIT_TIMESTAMP_KEY)) {
      localStorage.setItem(RATE_LIMIT_TIMESTAMP_KEY, Date.now().toString());
    }
    localStorage.setItem(RATE_LIMIT_KEY, newCount.toString());

    if (newCount >= MESSAGE_LIMIT) {
      setRateLimitReached(true);
    }

    originalHandleSubmit(e);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const displayMessages = messages.filter(m => m.role !== 'system');

  return {
    messages: displayMessages,
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
  };
}
