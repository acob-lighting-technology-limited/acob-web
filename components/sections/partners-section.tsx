import { Container } from "@/components/ui/container";

const partners = [
  { name: "AEDC", logo: "/images/aedc.png?height=60&width=120" },
  { name: "PHCN", logo: "/images/SHOTO.png?height=60&width=120" },
  { name: "NERC", logo: "/images/jed-logo.png?height=60&width=120" },
  { name: "REA", logo: "/images/JINKO.png?height=60&width=120" },
  { name: "USAID", logo: "/images/Starsight.png?height=60&width=120" },
  {
    name: "World Bank",
    logo: "/images/sma-solar-technology.png?height=60&width=120",
  },
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-gray-50">
      <Container className="px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Partners & Clients</h2>
          <p className="text-gray-600">
            Trusted by leading organizations and government agencies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-16 w-auto  transition-opacity hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
