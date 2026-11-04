'use client';

import { cn } from '@/lib/utils';
import React, { forwardRef, useId } from 'react';

// Shared input styling from quote-form and job-application-form
const inputBaseClasses =
  'border border-border rounded-md bg-surface text-foreground text-sm ring-[0.5px] ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-invalid:border-destructive';

// Native <select> needs explicit colours or Windows dark mode paints a white
// dropdown list.
const selectClasses = 'bg-background text-foreground';

const labelClasses =
  'text-xs font-medium uppercase tracking-wider text-muted-foreground';

// Wires a label and error message to their control by id.
function useFieldIds(id: string | undefined, error: string | undefined) {
  const generated = useId();
  const fieldId = id ?? generated;
  const errorId = `${fieldId}-error`;
  return {
    fieldId,
    errorId,
    describedBy: error ? errorId : undefined,
  };
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) {
    return null;
  }
  return (
    <p id={id} className="text-xs text-destructive">
      {error}
    </p>
  );
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const { fieldId, errorId, describedBy } = useFieldIds(id, error);
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={fieldId} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(inputBaseClasses, className)}
          {...props}
        />
        <FieldError id={errorId} error={error} />
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const { fieldId, errorId, describedBy } = useFieldIds(id, error);
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={fieldId} className={labelClasses}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(inputBaseClasses, 'min-h-[100px] resize-y', className)}
          {...props}
        />
        <FieldError id={errorId} error={error} />
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps extends React.SelectHTMLAttributes<
  React.ElementRef<'select'>
> {
  label?: string;
  error?: string;
}

export const FormSelect = forwardRef<
  React.ElementRef<'select'>,
  FormSelectProps
>(({ label, error, className, children, id, ...props }, ref) => {
  const { fieldId, errorId, describedBy } = useFieldIds(id, error);
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={fieldId} className={labelClasses}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(inputBaseClasses, selectClasses, className)}
        {...props}
      >
        {children}
      </select>
      <FieldError id={errorId} error={error} />
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

// Export the shared classes for edge cases
export { inputBaseClasses, labelClasses };
