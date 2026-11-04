import { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { extractNavigationIntent } from '@/lib/utils/navigation';
import {
  readStorage,
  writeStorage,
  removeStorage,
} from '@/lib/utils/safe-storage';

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
    const storedCount = readStorage(RATE_LIMIT_KEY);
    const storedTimestamp = readStorage(RATE_LIMIT_TIMESTAMP_KEY);

    if (storedCount && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp);
      const now = Date.now();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursElapsed < 24) {
        const count = parseInt(storedCount);
        setMessageCount(count);
        setRateLimitReached(count >= MESSAGE_LIMIT);
      } else {
        removeStorage(RATE_LIMIT_KEY);
        removeStorage(RATE_LIMIT_TIMESTAMP_KEY);
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
    // The persona/system prompt is injected server-side in /api/chat; the
    // client only sends user/assistant turns (system role is rejected there).
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

    if (!readStorage(RATE_LIMIT_TIMESTAMP_KEY)) {
      writeStorage(RATE_LIMIT_TIMESTAMP_KEY, Date.now().toString());
    }
    writeStorage(RATE_LIMIT_KEY, newCount.toString());

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
