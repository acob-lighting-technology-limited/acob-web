'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { MaskText } from './animations/MaskText';
import { CONTACT_INFO } from '@/lib/constants/app.constants';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface JobApplicationFormProps {
  jobTitle: string;
  jobSlug: string;
}

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  experience: string;
  education: string;
  availability: string;
  resumeFile?: globalThis.File | null;
}

type TextFieldId = Exclude<keyof ApplicationFormData, 'resumeFile'>;
type FormErrors = Partial<Record<TextFieldId | 'resume', string>>;

interface InputFieldConfig {
  id: TextFieldId;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'url';
  autoComplete: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  spellCheck?: boolean;
  required?: boolean;
}

const PERSONAL_FIELDS: InputFieldConfig[] = [
  {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'e.g. Ada Okafor…',
    type: 'text',
    autoComplete: 'name',
    required: true,
  },
  {
    id: 'email',
    label: 'Email Address',
    placeholder: 'e.g. ada@example.com…',
    type: 'email',
    autoComplete: 'email',
    spellCheck: false,
    required: true,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    placeholder: 'e.g. +234 803 000 0000…',
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
    required: true,
  },
  {
    id: 'location',
    label: 'Location',
    placeholder: 'e.g. Lagos, Nigeria…',
    type: 'text',
    autoComplete: 'address-level2',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Profile',
    placeholder: 'e.g. linkedin.com/in/adaokafor…',
    type: 'url',
    inputMode: 'url',
    autoComplete: 'url',
    spellCheck: false,
  },
  {
    id: 'portfolio',
    label: 'Portfolio/Website',
    placeholder: 'e.g. adaokafor.com…',
    type: 'url',
    inputMode: 'url',
    autoComplete: 'url',
    spellCheck: false,
  },
];

const TEXT_FIELDS: Array<{
  id: TextFieldId;
  label: string;
  placeholder: string;
  rows: number;
  required?: boolean;
}> = [
  {
    id: 'coverLetter',
    label: 'Cover Letter',
    placeholder:
      'Tell us why you want this role and what makes you a great fit…',
    rows: 5,
    required: true,
  },
  {
    id: 'experience',
    label: 'Relevant Experience',
    placeholder: 'e.g. 3 years installing solar mini-grids…',
    rows: 3,
  },
];

const EXTRA_FIELDS: Array<{
  id: TextFieldId;
  label: string;
  placeholder: string;
}> = [
  {
    id: 'education',
    label: 'Education',
    placeholder: 'e.g. BSc in Electrical Engineering…',
  },
  {
    id: 'availability',
    label: 'Availability',
    placeholder: 'e.g. Immediately, or 2 weeks’ notice…',
  },
];

const FIELD_CLASSES =
  'border-border bg-surface text-foreground text-sm focus-visible:border-primary focus-visible:ring-primary/30';

const EMPTY_FORM: ApplicationFormData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  coverLetter: '',
  experience: '',
  education: '',
  availability: '',
  resumeFile: null,
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
      {message}
    </p>
  );
}

function validate(data: ApplicationFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) {
    errors.fullName = 'Enter your full name.';
  }
  if (!data.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter an email like name@example.com.';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Enter a phone number we can reach you on.';
  }
  if (!data.coverLetter.trim()) {
    errors.coverLetter = 'Add a short cover letter.';
  }
  return errors;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
);

export function JobApplicationForm({
  jobTitle,
  jobSlug,
}: JobApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>(EMPTY_FORM);
  const [fileName, setFileName] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const isDirty =
    Boolean(formData.resumeFile) ||
    (Object.keys(EMPTY_FORM) as Array<keyof ApplicationFormData>).some(
      key => key !== 'resumeFile' && Boolean(formData[key]),
    );

  // Warn before leaving with a half-written application.
  useEffect(() => {
    if (!isDirty) {
      return;
    }
    const handleBeforeUnload = (event: Event) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    // Clear a field's error as soon as the user starts fixing it.
    if (errors[id as TextFieldId]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          resume: 'Upload a PDF or Word document (.pdf, .doc or .docx).',
        }));
        e.target.value = '';
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume:
            'That file is over 5 MB. Compress it or upload a smaller one.',
        }));
        e.target.value = '';
        return;
      }

      setErrors(prev => ({ ...prev, resume: undefined }));

      setFormData(prev => ({
        ...prev,
        resumeFile: file,
      }));
      setFileName(file.name);
    }
  };

  const removeFile = (): void => {
    setFormData(prev => ({
      ...prev,
      resumeFile: null,
    }));
    setFileName('');
  };

  async function sendApplication(data: ApplicationFormData): Promise<unknown> {
    const formDataToSend = new globalThis.FormData();
    formDataToSend.append('jobTitle', jobTitle);
    formDataToSend.append('jobSlug', jobSlug);
    formDataToSend.append('fullName', data.fullName);
    formDataToSend.append('email', data.email);
    formDataToSend.append('phone', data.phone);
    formDataToSend.append('location', data.location);
    formDataToSend.append('linkedin', data.linkedin);
    formDataToSend.append('portfolio', data.portfolio);
    formDataToSend.append('coverLetter', data.coverLetter);
    formDataToSend.append('experience', data.experience);
    formDataToSend.append('education', data.education);
    formDataToSend.append('availability', data.availability);
    if (data.resumeFile) {
      formDataToSend.append('resume', data.resumeFile);
    }

    const response = await fetch('/api/job-application', {
      method: 'POST',
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: sendApplication,
    onSuccess: () => {
      toast.success('Application submitted successfully!', {
        description:
          'Thank you for your interest. We will review your application and get back to you soon.',
        duration: 6000,
      });
      setFormData(EMPTY_FORM);
      setFileName('');
      setErrors({});
    },
    onError: (err: Error) => {
      toast.error('Failed to submit application', {
        description:
          err.message ||
          `Please try again or contact us at ${CONTACT_INFO.email.careers}`,
        duration: 5000,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as TextFieldId[]).find(
      key => nextErrors[key],
    );
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    mutate(formData);
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground transition-colors duration-500">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <MaskText
              phrases={['Apply for', jobTitle]}
              className="text-3xl md:text-4xl font-bold mb-6 italic"
            />

            <MaskText
              phrases={[
                "Join our team and be part of Nigeria's energy access revolution. We're looking for passionate individuals who want to make a real impact.",
              ]}
              className="text-lg opacity-90 mb-8"
            />

            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <span className="text-lg">✓</span>
                <span>Work on meaningful projects that power communities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">✓</span>
                <span>
                  Collaborate with industry experts in renewable energy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">✓</span>
                <span>Competitive compensation and benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">✓</span>
                <span>
                  Opportunities for professional growth and development
                </span>
              </li>
            </ul>
          </div>

          <Card className="bg-surface text-foreground border-border border-[1px]">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Submit Your Application
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                <p className="text-xs text-muted-foreground">
                  Fields marked * are required.
                </p>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERSONAL_FIELDS.map(field => (
                    <div key={field.id}>
                      <Label
                        htmlFor={field.id}
                        className="text-foreground pb-1"
                      >
                        {field.label}
                        {field.required && ' *'}
                      </Label>
                      <Input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        inputMode={field.inputMode}
                        autoComplete={field.autoComplete}
                        spellCheck={field.spellCheck}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.id] as string}
                        onChange={handleInputChange}
                        aria-invalid={Boolean(errors[field.id])}
                        aria-describedby={
                          errors[field.id] ? `${field.id}-error` : undefined
                        }
                        className={FIELD_CLASSES}
                      />
                      <FieldError id={field.id} message={errors[field.id]} />
                    </div>
                  ))}
                </div>

                {/* Resume Upload */}
                <div>
                  <Label htmlFor="resume" className="text-foreground pb-1">
                    Resume/CV (PDF or Word, max&nbsp;5&nbsp;MB)
                  </Label>
                  {!fileName ? (
                    <div className="relative">
                      {/* Visually hidden, not display:none, so it stays
                          reachable by Tab and the label below shows its focus. */}
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        aria-invalid={Boolean(errors.resume)}
                        aria-describedby={
                          errors.resume ? 'resume-error' : undefined
                        }
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="resume"
                        className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary transition-colors bg-surface peer-focus-visible:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
                      >
                        <Upload
                          className="h-5 w-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-muted-foreground">
                          Choose a Resume File
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 p-3 border border-border rounded-md bg-surface/50">
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText
                          className="h-5 w-5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="truncate text-sm text-foreground">
                          {fileName}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="h-auto shrink-0 p-1"
                        aria-label={`Remove ${fileName}`}
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  )}
                  <FieldError id="resume" message={errors.resume} />
                </div>

                {/* Long-form answers */}
                {TEXT_FIELDS.map(field => (
                  <div key={field.id}>
                    <Label htmlFor={field.id} className="text-foreground">
                      {field.label}
                      {field.required && ' *'}
                    </Label>
                    <Textarea
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      rows={field.rows}
                      required={field.required}
                      autoComplete="off"
                      value={formData[field.id] as string}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors[field.id])}
                      aria-describedby={
                        errors[field.id] ? `${field.id}-error` : undefined
                      }
                      className={FIELD_CLASSES}
                    />
                    <FieldError id={field.id} message={errors[field.id]} />
                  </div>
                ))}

                {/* Education & availability */}
                {EXTRA_FIELDS.map(field => (
                  <div key={field.id}>
                    <Label htmlFor={field.id} className="text-foreground">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type="text"
                      autoComplete="off"
                      placeholder={field.placeholder}
                      value={formData[field.id] as string}
                      onChange={handleInputChange}
                      className={FIELD_CLASSES}
                    />
                  </div>
                ))}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 motion-safe:animate-spin"
                        aria-hidden="true"
                      />
                      Submitting…
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
