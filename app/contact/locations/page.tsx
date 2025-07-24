import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { MaskText } from "@/components/animations/MaskText"

export default function LocationsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "Office Locations" },
  ]

  return (
    <>
      <PageHero title="Our Office Locations" backgroundImage="/images/contact/locations-hero.jpg?height=400&width=1200">
        <MaskText
          phrases={[
            "Visit us at our offices or reach out through our contact details.",
            "We're always happy to welcome you.",
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Office Details */}
          <div className="space-y-8">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Head Office"]} />
                </h2>
                <div className="space-y-4 text-gray-700 text-lg">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>
                      Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Service Scheme,
                      Setraco Gate Gwarinpa, Abuja, Nigeria.
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>0704 920 2634, 0803 290 2825</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                    <Link href="mailto:info@acoblighting.com" className="hover:underline text-primary">
                      info@acoblighting.com
                    </Link>
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Branch Office"]} />
                </h2>
                <div className="space-y-4 text-gray-700 text-lg">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja, Nigeria</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>0704 920 2634, 0803 290 2825</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                    <Link href="mailto:info@acoblighting.com" className="hover:underline text-primary">
                      info@acoblighting.com
                    </Link>
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Rochas+Plaza,+26+Herbert+Macaulay+Way,+Abuja,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="w-full h-[500px] rounded-lg overflow-hidden custom-shadow sticky top-20 self-start">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.0004937198446!2d7.418824175135592!3d9.11723979094763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b1e73987599%3A0xd8a3ed0c898644c5!2sACOB%20LIGHTING%20TECHNOLOGY%20LIMITED!5e1!3m2!1sen!2sng!4v1752592656509!5m2!1sen!2sng&maptype=satellite"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
    </>
  )
}
