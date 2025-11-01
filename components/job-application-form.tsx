'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, FileText, X } from 'lucide-react';
import { MaskText } from './animations/MaskText';

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

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
);

export function JobApplicationForm({
  jobTitle,
  jobSlug,
}: JobApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
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
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
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
        toast.error('Invalid file type', {
          description: 'Please upload a PDF or Word document',
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: 'Please upload a file smaller than 5MB',
        });
        return;
      }

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

  const sendApplication = async (
    formData: ApplicationFormData
  ): Promise<unknown> => {
    try {
      const formDataToSend = new globalThis.FormData();

      // Append all form fields
      formDataToSend.append('jobTitle', jobTitle);
      formDataToSend.append('jobSlug', jobSlug);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('education', formData.education);
      formDataToSend.append('availability', formData.availability);

      // Append resume file if exists
      if (formData.resumeFile) {
        formDataToSend.append('resume', formData.resumeFile);
      }

      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      return result;
    } catch (error: unknown) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);

    // Basic form validation
    const requiredFields: (keyof ApplicationFormData)[] = [
      'fullName',
      'email',
      'phone',
      'coverLetter',
    ];
    const missingFields = requiredFields.filter(field => {
      const value = formData[field];
      if (value === null || value === undefined) {
        return true;
      }
      return !value.toString().trim();
    });

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields', {
        description: 'Full name, email, phone, and cover letter are required',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email address', {
        description: 'Please enter a valid email address',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const loadingToast = toast.loading('Submitting your application...', {
        description: 'Please wait while we process your application',
      });

      await sendApplication(formData);

      toast.dismiss(loadingToast);
      toast.success('Application submitted successfully! 🎉', {
        description:
          'Thank you for your interest. We will review your application and get back to you soon.',
        duration: 6000,
      });

      // Reset form
      setFormData({
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
      });
      setFileName('');
    } catch {
      toast.error('Failed to submit application', {
        description:
          'Something went wrong. Please try again or contact us directly at careers@acoblighting.com',
        duration: 5000,
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground transition-colors duration-700">
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
            <CardContent className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-foreground pb-1">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground pb-1">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground pb-1">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+234 XXX XXX XXXX"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-foreground pb-1">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Lagos, Nigeria"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin" className="text-foreground pb-1">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/johndoe"
                    type="url"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio" className="text-foreground pb-1">
                    Portfolio/Website
                  </Label>
                  <Input
                    id="portfolio"
                    placeholder="portfolio.com"
                    type="url"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <Label htmlFor="resume" className="text-foreground pb-1">
                  Resume/CV (PDF or Word, max 5MB)
                </Label>
                {!fileName ? (
                  <div className="relative">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary transition-colors bg-surface/50"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload resume
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 border border-border rounded-md bg-surface/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground">
                        {fileName}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="h-auto p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="coverLetter" className="text-foreground">
                  Cover Letter *
                </Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience" className="text-foreground">
                  Relevant Experience
                </Label>
                <Textarea
                  id="experience"
                  placeholder="Briefly describe your relevant work experience..."
                  rows={3}
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Education */}
              <div>
                <Label htmlFor="education" className="text-foreground">
                  Education
                </Label>
                <Input
                  id="education"
                  placeholder="e.g., BSc in Electrical Engineering"
                  type="text"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Availability */}
              <div>
                <Label htmlFor="availability" className="text-foreground">
                  Availability
                </Label>
                <Input
                  id="availability"
                  placeholder="e.g., Immediately, 2 weeks notice"
                  type="text"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="border border-border rounded-md focus-visible:!ring-[1px] bg-surface text-foreground/60 text-xs ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
