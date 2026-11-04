import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  input: string;
  onInputChange: (_event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (_event: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
  isLoading: boolean;
  rateLimitReached: boolean;
  /** Hide the top divider when the suggestions block already provides one above. */
  topBorder?: boolean;
}

/**
 * Chat input — mirrors the ERP ACOBot widget: a rounded pill field with a circular
 * send (or stop) button.
 */
export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onStop,
  isLoading,
  rateLimitReached,
  topBorder = true,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!rateLimitReached) {
        const form = document.getElementById('chat-form') as HTMLFormElement;
        form?.requestSubmit();
      }
    }
  };

  return (
    <form
      id="chat-form"
      onSubmit={onSubmit}
      className={`border-border bg-background flex items-center gap-2 px-3 py-2.5 ${
        topBorder ? 'border-t' : ''
      }`}
    >
      <label htmlFor="chat-input" className="sr-only">
        Message ACOBot
      </label>
      <textarea
        id="chat-input"
        name="message"
        data-autofocus
        autoComplete="off"
        value={input}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={isLoading || rateLimitReached}
        placeholder={rateLimitReached ? 'Message limit reached' : 'Ask ACOBot…'}
        className="bg-muted/50 focus-visible:ring-primary/40 placeholder:text-muted-foreground text-foreground max-h-28 min-h-9 flex-1 resize-none rounded-full px-4 py-2 text-sm outline-none focus-visible:ring-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      />

      {isLoading ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop Generating"
          className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
        >
          <Square className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!input.trim() || rateLimitReached}
          aria-label="Send Message"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-colors ${
            input.trim() && !rateLimitReached
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-muted-foreground/40 cursor-not-allowed'
          }`}
        >
          <Send className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
