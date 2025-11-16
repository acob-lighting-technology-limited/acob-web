import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  value?: string | number;
  label?: string;
  variant?: 'default' | 'metric' | 'feature';
  className?: string;
}

export function InfoCard({
  icon: Icon,
  title,
  description,
  value,
  label,
  variant = 'default',
  className,
}: InfoCardProps) {
  if (variant === 'metric') {
    // Metric variant for stats/numbers
    return (
      <div
        className={cn(
          'rounded-2xl border border-border bg-surface p-2 sm:p-4 shadow-sm',
          className,
        )}
      >
        <div className="text-3xl font-semibold text-foreground">{value}</div>
        <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
    );
  }

  if (variant === 'feature') {
    // Feature variant with icon
    return (
      <Card
        className={cn(
          'group flex h-full flex-col justify-between rounded-3xl border border-border bg-card/80 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg',
          className,
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
            )}
            {title && (
              <h4 className="text-xl font-semibold text-foreground">{title}</h4>
            )}
          </div>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-card/90 p-4 sm:p-6 xl:p-8 shadow-sm',
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary">
          <Icon className="h-6 w-6" />
        </div>
      )}
      {title && (
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      )}
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
