'use client';

import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

// Shared input styling from quote-form and job-application-form
const inputBaseClasses =
  'border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary';

const labelClasses =
  'text-xs font-medium uppercase tracking-wider text-muted-foreground';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className={labelClasses}>{label}</label>}
        <input
          ref={ref}
          className={cn(inputBaseClasses, className)}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className={labelClasses}>{label}</label>}
        <textarea
          ref={ref}
          className={cn(inputBaseClasses, 'min-h-[100px] resize-y', className)}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps
  extends React.SelectHTMLAttributes<React.ElementRef<'select'>> {
  label?: string;
  error?: string;
}

export const FormSelect = forwardRef<
  React.ElementRef<'select'>,
  FormSelectProps
>(({ label, error, className, children, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className={labelClasses}>{label}</label>}
      <select ref={ref} className={cn(inputBaseClasses, className)} {...props}>
        {children}
      </select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

// Export the shared classes for edge cases
export { inputBaseClasses, labelClasses };
