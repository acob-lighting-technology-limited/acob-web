import { X, Bot } from 'lucide-react';

interface ChatHeaderProps {
  isChatting: boolean;
  onClose: () => void;
}

/**
 * Chat header — mirrors the ERP ACOBot widget header (Bot avatar in a translucent
 * ring, title, status dot + subtitle, close button).
 */
export function ChatHeader({ isChatting, onClose }: ChatHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground relative flex items-center gap-3 px-4 py-3">
      <div className="bg-primary-foreground/15 ring-primary-foreground/25 flex h-9 w-9 items-center justify-center rounded-full ring-1">
        <Bot className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight">ACOBot</p>
        <p className="text-primary-foreground/80 flex items-center gap-1.5 text-xs">
          <span className="bg-primary-foreground/70 inline-block h-1.5 w-1.5 rounded-full" />
          {isChatting ? 'typing…' : 'ACOB Lighting assistant'}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Chat"
        className="hover:bg-primary-foreground/15 rounded-full p-1.5 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
