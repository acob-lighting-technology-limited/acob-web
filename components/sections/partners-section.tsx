// components/PartnersSection.tsx
import Marquee from 'react-fast-marquee';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import { partners } from '@/lib/data/partners-data';

export function PartnersSection() {
  return (
    <section className=" bg-muted dark:bg-muted/20  transition-colors duration-700">
      <Container className="px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground transition-colors duration-700">
            Our Partners & Clients
          </h2>
          <p className="text-muted-foreground transition-colors duration-700">
            Trusted by leading organizations and government agencies
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <Marquee speed={50} gradient={false} loop={0}>
            {partners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center px-8">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={64}
                  height={64}
                  className="h-16 w-auto transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}
