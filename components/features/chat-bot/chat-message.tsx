import type { Message } from 'ai';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { formatMessage, getCurrentTime, getPageName } from './chat-utils';

interface ChatMessageProps {
  message: Message;
  navigationRoute?: string;
  onNavigate?: (_route: string) => void;
}

/**
 * Individual chat message bubble component with navigation support
 */
export function ChatMessage({
  message,
  navigationRoute,
  onNavigate,
}: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div>
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        <div
          className={`max-w-[85%] relative group ${
            isUser
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
                __html: formatMessage(message.content),
              }}
            />
            <div className="flex items-center justify-end gap-1 mt-1 text-muted-foreground">
              <span className="text-xs">{getCurrentTime()}</span>
              {isUser && (
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
              isUser ? '-right-1' : '-left-1'
            } w-3 h-3 transform rotate-45 ${
              isUser ? 'bg-primary/10' : 'bg-surface'
            }`}
          />
        </div>
      </div>

      {/* Navigation Button */}
      {navigationRoute && !isUser && onNavigate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start mb-2 ml-2"
        >
          <Button
            onClick={() => onNavigate(navigationRoute)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-xs rounded-full shadow-lg flex items-center gap-2"
          >
            <ExternalLink className="h-3 w-3" />
            Navigate to {getPageName(navigationRoute)}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
