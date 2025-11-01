import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'default' | 'primary';
  title: string | ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = 'default',
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  const badgeClasses =
    badgeVariant === 'primary'
      ? 'border-primary/40 bg-primary/20 text-primary'
      : 'border-border text-muted-foreground';

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        isCenter && 'items-center text-center',
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
            badgeClasses,
            isCenter && 'justify-center mx-auto'
          )}
        >
          {badge}
        </span>
      )}
      {typeof title === 'string' ? (
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          {title}
        </h2>
      ) : (
        title
      )}
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed text-muted-foreground md:text-lg',
            isCenter && 'max-w-3xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
