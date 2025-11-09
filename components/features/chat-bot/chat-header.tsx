import { motion } from 'framer-motion';
import { X, Bot } from 'lucide-react';
import { Button } from '@/components/ui';

interface ChatHeaderProps {
  isChatting: boolean;
  onClose: () => void;
}

/**
 * Chat bot header component with status indicator
 */
export function ChatHeader({ isChatting, onClose }: ChatHeaderProps) {
  return (
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
            <h3 className="font-semibold text-primary-foreground">ACOBot</h3>
            <p className="text-xs text-primary-foreground/80">
              {isChatting ? 'typing...' : 'online'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
