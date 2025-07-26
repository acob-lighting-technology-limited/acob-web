"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Types
interface MaskTextProps {
  phrases: string[];
  className?: string;
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface FormField {
  id: keyof FormData;
  label: string;
  placeholder: string;
  type: string;
  half?: boolean;
  rows?: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

type SubmitStatus = "success" | "error" | null;

// Mock MaskText component for the artifact
const MaskText: React.FC<MaskTextProps> = ({ phrases, className }) => (
  <div className={className}>
    {phrases.map((phrase, index) => (
      <span key={index}>{phrase} </span>
    ))}
  </div>
);

// Mock Container component
const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
);

const infoPoints = [
  "✓ Comprehensive energy analysis",
  "✓ Cost-benefit assessment",
  "✓ Custom solar solution design",
  "✓ ROI calculations and projections",
];

const formFields: FormField[] = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    type: "text",
    half: true,
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    type: "text",
    half: true,
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "tel",
  },
  {
    id: "company",
    label: "Company Name",
    placeholder: "Enter your company name",
    type: "text",
  },
  {
    id: "message",
    label: "Project Details",
    placeholder: "Tell us about your energy needs and project requirements",
    type: "textarea",
    rows: 4,
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

// Update just the sendEmail function in your component:

const sendEmail = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic form validation
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "message",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      await sendEmail(formData);
      setSubmitStatus("success");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary text-white">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <MaskText
              phrases={[
                "Lighting Up Nigeria,",
                "Request For Professional Energy Audit",
              ]}
              className="text-3xl md:text-4xl font-bold mb-6 italic"
            />

            <MaskText
              phrases={[
                "Get a comprehensive energy assessment for your facility.",
                "Our experts will analyze your current energy usage",
                "and provide recommendations for optimal solar solutions.",
              ]}
              className="text-lg opacity-90 mb-8"
            />

            <ul className="space-y-3 text-sm opacity-90">
              {infoPoints.map((line, index) => (
                <li key={index}>
                  <MaskText phrases={[line]} />
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-white text-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl">Request A Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {submitStatus === "success" && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Thank you! Your request has been submitted successfully. We'll
                  get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  There was an error submitting your request. Please check all
                  fields and try again.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {formFields
                  .filter((field) => field.half)
                  .map(({ id, label, placeholder, type }) => (
                    <div key={id}>
                      <Label htmlFor={id}>{label} *</Label>
                      <Input
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={formData[id]}
                        onChange={handleInputChange}
                        className="focus-visible:!ring-[0.5px] ring-[0.5px] ring-gray-200"
                      />
                    </div>
                  ))}
              </div>

              {formFields
                .filter((field) => !field.half)
                .map(({ id, label, placeholder, type, rows }) => (
                  <div key={id} className="mb-4">
                    <Label htmlFor={id}>
                      {label} {id !== "company" ? "*" : ""}
                    </Label>
                    {type === "textarea" ? (
                      <Textarea
                        id={id}
                        placeholder={placeholder}
                        rows={rows}
                        value={formData[id]}
                        onChange={handleInputChange}
                        className="focus-visible:!ring-[0.5px] ring-[0.5px] ring-gray-200"
                      />
                    ) : (
                      <Input
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={formData[id]}
                        onChange={handleInputChange}
                        className="focus-visible:!ring-[0.5px] ring-[0.5px] ring-gray-200"
                      />
                    )}
                  </div>
                ))}

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
