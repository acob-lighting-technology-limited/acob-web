import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  message = 'Loading...',
  className = '',
  size = 'md',
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-primary mb-4`}
        aria-hidden="true"
      />
      <p className="text-muted-foreground text-sm">{message}</p>
      <span className="sr-only">{message}</span>
    </div>
  );
}
