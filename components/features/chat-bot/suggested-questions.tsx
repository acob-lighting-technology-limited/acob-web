import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { suggestedMessages } from '@/lib/data';

interface SuggestedQuestionsProps {
  onSelect: (_message: string) => void;
  isChatting: boolean;
  rateLimitReached: boolean;
}

/**
 * Suggested question buttons for quick chat interactions
 */
export function SuggestedQuestions({
  onSelect,
  isChatting,
  rateLimitReached,
}: SuggestedQuestionsProps) {
  return (
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
              onClick={() => onSelect(msg)}
              className="rounded-full text-xs px-3 py-1 h-auto bg-surface !border border-muted text-muted-foreground hover:bg-muted transition-all duration-500 disabled:opacity-50"
              disabled={isChatting || rateLimitReached}
            >
              {msg}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
