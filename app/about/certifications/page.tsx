import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { MaskText } from "@/components/animations/MaskText"
import { Award, ShieldCheck, Leaf, Zap } from "lucide-react"

const certifications = [
  {
    name: "ISO 9001:2015 Certified",
    description: "Demonstrates our commitment to quality management systems and continuous improvement.",
    icon: Award,
  },
  {
    name: "Renewable Energy Association of Nigeria (REAN) Member",
    description: "Active participation in shaping Nigeria's renewable energy policies and standards.",
    icon: Leaf,
  },
  {
    name: "Certified Solar Installers",
    description: "Our technical team holds certifications from leading global solar training institutions.",
    icon: ShieldCheck,
  },
  {
    name: "Nigerian Electricity Regulatory Commission (NERC) Licensed",
    description: "Fully compliant with national electricity regulations for mini-grid operations.",
    icon: Zap, // Using Zap for electricity regulation
  },
]

export default function CertificationsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Certifications" },
  ]

  return (
    <>
      <PageHero
        title="Our Certifications & Standards"
        backgroundImage="/images/about/certifications-hero.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <MaskText phrases={["Upholding the Highest Standards of Excellence"]} />
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At ACOB Lighting, quality, safety, and environmental responsibility are at the core of everything we do. Our
            certifications reflect our unwavering commitment to delivering world-class clean energy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <Card
                key={index}
                className="border-0 custom-shadow shadow-none p-6 text-center flex flex-col items-center"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cert.description}</p>
              </Card>
            )
          })}
        </div>

        <Card className="border-0 custom-shadow shadow-none mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Commitment to Quality</h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We adhere to stringent international and national standards in all our operations, from design and
              procurement to installation and maintenance. This ensures that every ACOB Lighting project is built to
              last, performs optimally, and contributes positively to the environment and the communities we serve.
            </p>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
