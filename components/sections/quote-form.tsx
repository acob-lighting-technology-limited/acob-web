'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Dot } from 'lucide-react';
import { MaskText } from '../animations/MaskText';
import { infoPoints } from '@/lib/data/contact-section-data';
import {
  quoteFormFields,
  contactMethodOptions,
} from '@/lib/data/quote-form-data';

// Types
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  installer: string;
  completionTime: string;
  monthlyUsage: string;
  systemType: string;
  panelPlace: string;
  roofMaterial: string;
  additionalInfo: string;
  contactMethod: string;
  [key: string]: string;
}

// Mock Container component
const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
);

export function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    installer: '',
    completionTime: '',
    monthlyUsage: '',
    systemType: '',
    panelPlace: '',
    roofMaterial: '',
    additionalInfo: '',
    contactMethod: 'all',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (id: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRadioChange = (value: string): void => {
    setFormData(prev => ({
      ...prev,
      contactMethod: value,
    }));
  };

  const sendEmail = async (formData: QuoteFormData): Promise<unknown> => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'New Quote Request',
          message: `Quote Request Details:
            Installer: ${formData.installer}
            Completion Time: ${formData.completionTime}
            Monthly Usage: ${formData.monthlyUsage} kWh
            System Type: ${formData.systemType}
            Panel Place: ${formData.panelPlace}
            Roof Material: ${formData.roofMaterial}
            Additional Info: ${formData.additionalInfo}
            Contact Method: ${formData.contactMethod}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      return result;
    } catch (error: unknown) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);

    // Basic form validation
    const requiredFields: (keyof QuoteFormData)[] = [
      'installer',
      'completionTime',
      'systemType',
      'panelPlace',
      'roofMaterial',
    ];
    const missingFields = requiredFields.filter(
      field => !formData[field].trim(),
    );

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields', {
        description: `Missing: ${missingFields
          .map(field => quoteFormFields.find(f => f.id === field)?.label)
          .join(', ')}`,
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
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
      const loadingToast = toast.loading('Submitting your request...', {
        description: 'Please wait while we process your energy audit request',
      });

      await sendEmail(formData);

      toast.dismiss(loadingToast);
      toast.success('Request submitted successfully! 🎉', {
        description:
          'Thank you for your interest. We will get back to you within 24 hours with your energy audit details.',
        duration: 6000,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        installer: '',
        completionTime: '',
        monthlyUsage: '',
        systemType: '',
        panelPlace: '',
        roofMaterial: '',
        additionalInfo: '',
        contactMethod: 'all',
      });
    } catch (_error: unknown) {
      toast.error('Failed to submit request', {
        description:
          'Something went wrong. Please try again or contact us directly.',
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
    <section className="py-16  bg-primary text-primary-foreground transition-colors duration-700">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <MaskText
              phrases={[
                // 'Lighting Up Nigeria,',
                "Need an Installation?",
                'Request For Professional Energy Audit',
              ]}
              className="text-3xl md:text-4xl font-bold mb-6 italic"
            />

            <MaskText
              phrases={[
                'Get a comprehensive energy assessment for your facility.',
                'Our experts will analyze your current energy usage',
                'and provide recommendations for optimal solar solutions.',
              ]}
              className="text-lg opacity-90 mb-8"
            />

            <ul className="space-y-3 text-sm opacity-90">
              {infoPoints.map((line, index) => (
                <li key={index} className="flex">
                  <Dot />
                  <MaskText phrases={[line]} />
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-surface text-foreground border-border border-[1px]">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Request A Quote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {quoteFormFields
                  .filter(field => field.half && field.type !== 'textarea')
                  .map(({ id, label, type, options, placeholder }) => (
                    <div key={id}>
                      <Label htmlFor={id} className="text-foreground">
                        {label} *
                      </Label>
                      {type === 'select' ? (
                        <select
                          id={id}
                          value={formData[id]}
                          onChange={e => handleSelectChange(id, e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus-visible:!ring-[0.5px] bg-surface text-foreground ring-[0.5px] ring-border focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">{placeholder}</option>
                          {options?.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={id}
                          placeholder={placeholder}
                          type={type}
                          value={formData[id]}
                          onChange={handleInputChange}
                          className="focus-visible:!ring-[0.5px] bg-surface text-foreground ring-[0.5px] ring-border"
                        />
                      )}
                    </div>
                  ))}
              </div>

              {/* Additional Information */}
              {quoteFormFields
                .filter(field => field.type === 'textarea')
                .map(({ id, label, placeholder, rows }) => (
                  <div key={id} className="mb-4">
                    <Label htmlFor={id} className="text-foreground">
                      {label}
                    </Label>
                    <Textarea
                      id={id}
                      placeholder={placeholder}
                      rows={rows}
                      value={formData[id]}
                      onChange={handleInputChange}
                      className="focus-visible:!ring-[0.5px] bg-surface text-foreground ring-[0.5px] ring-border"
                    />
                  </div>
                ))}

              {/* Contact Method */}
              <div className="mb-4">
                <Label className="text-foreground">
                  Preferred Contact Method
                </Label>
                <RadioGroup
                  value={formData.contactMethod}
                  onValueChange={handleRadioChange}
                  className="flex gap-4 mt-2"
                >
                  {contactMethodOptions.map(option => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.id}
                        className="text-primary"
                      />
                      <Label htmlFor={option.id} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
