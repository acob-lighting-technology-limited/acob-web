import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Lighting Up Nigeria, Request For Professional Energy Audit
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get a comprehensive energy assessment for your facility. Our experts will analyze your current energy
              usage and provide recommendations for optimal solar solutions.
            </p>
            <ul className="space-y-3 text-sm opacity-90">
              <li>✓ Comprehensive energy analysis</li>
              <li>✓ Cost-benefit assessment</li>
              <li>✓ Custom solar solution design</li>
              <li>✓ ROI calculations and projections</li>
            </ul>
          </div>

          <Card className="bg-white text-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl">Request A Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
              <div>
                <Label htmlFor="message">Project Details</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your energy needs and project requirements"
                  rows={4}
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
