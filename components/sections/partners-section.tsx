// components/PartnersSection.tsx
import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/container";

const partners = [
  { name: "AEDC", logo: "/images/aedc.png?height=60&width=120" },
  { name: "PHCN", logo: "/images/SHOTO.png?height=60&width=120" },
  { name: "NERC", logo: "/images/jed-logo.png?height=60&width=120" },
  { name: "REA", logo: "/images/JINKO.png?height=60&width=120" },
  { name: "USAID", logo: "/images/Starsight.png?height=60&width=120" },
  { name: "World Bank", logo: "/images/sma-solar-technology.png?height=60&width=120" },
];

export function PartnersSection() {
  return (
    <section className=" bg-muted dark:bg-muted/20  transition-colors duration-700">
      <Container className="px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground transition-colors duration-700">Our Partners & Clients</h2>
                      <p className="text-muted-foreground transition-colors duration-700">
            Trusted by leading organizations and government agencies
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <Marquee speed={50} gradient={false} loop={0}>
            {partners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center px-8">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto  transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}
