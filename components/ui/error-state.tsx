import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { CONTACT_INFO } from '@/lib/constants/app.constants';

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  supportEmail?: string;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  retry,
  supportEmail = CONTACT_INFO.email.support,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {retry && (
            <Button
              onClick={retry}
              variant="outline"
              size="sm"
              className="gap-2"
              aria-label="Try again"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${supportEmail}`}>Contact Support</a>
          </Button>
        </div>
      </Alert>
    </div>
  );
}
