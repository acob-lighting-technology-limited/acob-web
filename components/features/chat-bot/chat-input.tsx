import { Send, StopCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Textarea } from '@/components/ui';

interface ChatInputProps {
  input: string;
  onInputChange: (_event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (_event: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
  isLoading: boolean;
  rateLimitReached: boolean;
}

/**
 * Chat input form with send/stop buttons and rate limit handling
 */
export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onStop,
  isLoading,
  rateLimitReached,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!rateLimitReached) {
        const form = document.getElementById('chat-form') as HTMLFormElement;
        if (form) {
          const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true,
          });
          form.dispatchEvent(submitEvent);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="px-4 py-2"
    >
      <form
        id="chat-form"
        onSubmit={onSubmit}
        className="flex items-stretch gap-3 mb-3"
      >
        <div className="flex-1 relative bg-card rounded-full flex items-center px-4 py-0 border border-muted-foreground focus-within:border-border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
          <Textarea
            value={input}
            onChange={onInputChange}
            placeholder={
              rateLimitReached ? 'Message limit reached' : 'Type a message...'
            }
            className="flex-1 flex text-foreground justify-end !bg-transparent items-end min-h-9 max-h-28 resize-none border-0 focus:ring-0 focus:outline-none text-sm focus-visible:ring-0 placeholder:text-muted-foreground outline-none py-1 rounded-full"
            rows={1}
            onKeyDown={handleKeyDown}
            disabled={isLoading || rateLimitReached}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          />
        </div>

        {isLoading ? (
          <Button
            type="button"
            size="icon"
            onClick={onStop}
            className="self-stretch w-10 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all duration-500 flex-shrink-0"
            disabled={!isLoading}
          >
            <StopCircle className="h-4 w-4" />
            <span className="sr-only">Stop generation</span>
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || rateLimitReached}
            className="self-stretch min-h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500 flex-shrink-0 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        )}
      </form>
    </motion.div>
  );
}
