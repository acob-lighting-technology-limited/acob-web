import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight, Phone } from 'lucide-react';

interface ServiceHeroProps {
  title: string;
  // description: string
  backgroundImage: string;
  className?: string;
}

export function ServiceHero({
  title,
  backgroundImage,
  className = '',
}: ServiceHeroProps) {
  return (
    <section
      className={`relative h-[400px] flex items-end justify-left w-full ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <Container className="relative z-10 px-4">
        <div className="max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          {/* <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl leading-relaxed">{description}</p> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="px-8 py-3"
            >
              Get Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent px-8 py-3"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
