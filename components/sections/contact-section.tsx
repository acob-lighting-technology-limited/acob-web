import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MaskText } from "../animations/MaskText"

const infoPoints = [
  "✓ Comprehensive energy analysis",
  "✓ Cost-benefit assessment",
  "✓ Custom solar solution design",
  "✓ ROI calculations and projections",
]

const formFields = [
  { id: "firstName", label: "First Name", placeholder: "Enter your first name", type: "text", half: true },
  { id: "lastName", label: "Last Name", placeholder: "Enter your last name", type: "text", half: true },
  { id: "email", label: "Email Address", placeholder: "Enter your email", type: "email" },
  { id: "phone", label: "Phone Number", placeholder: "Enter your phone number", type: "tel" },
  { id: "company", label: "Company Name", placeholder: "Enter your company name", type: "text" },
  { id: "message", label: "Project Details", placeholder: "Tell us about your energy needs and project requirements", type: "textarea", rows: 4 },
]

export function ContactSection() {
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields
                  .filter((field) => field.half)
                  .map(({ id, label, placeholder, type }) => (
                    <div key={id}>
                      <Label htmlFor={id}>{label}</Label>
                      <Input id={id} placeholder={placeholder} type={type}  className="focus-visible:!ring-[0.5px] ring-[0.5px] ring-gray-200 "/>
                    </div>
                  ))}
              </div>

              {formFields
                .filter((field) => !field.half)
                .map(({ id, label, placeholder, type, rows }) => (
                  <div key={id}>
                    <Label htmlFor={id}>{label}</Label>
                    {type === "textarea" ? (
                      <Textarea
                        id={id}
                        placeholder={placeholder}
                        rows={rows} className="focus-visible:!ring-[0.5px] ring-[0.5px] ring-gray-200 "
                      />
                    ) : (
                      <Input id={id} placeholder={placeholder} type={type} className="focus-visible:!ring-[0.5px] ring-[0.5px] ring-gray-200 "/>
                    )}
                  </div>
                ))}

              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Submit Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
