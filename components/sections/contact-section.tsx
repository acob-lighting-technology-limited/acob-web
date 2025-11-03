import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Dot } from 'lucide-react';
import { MaskText } from '../animations/MaskText';
import { infoPoints } from '@/lib/data/contact-section-data';

// Mock Container component
const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>;

export function ContactSection() {
  return (
    <section className="py-16 selection:bg-primary-foreground selection:text-primary bg-primary text-primary-foreground transition-colors duration-500">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Info Points */}
          <div className="space-y-6">
            <div className="space-y-4">
              <MaskText className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground">
                Get Your Custom Quote
              </MaskText>
              <p className="text-lg text-primary-foreground/90">
                Partner with us to bring reliable solar energy to your project.
                Our team will provide a tailored quote based on your specific
                requirements.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {infoPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Dot className="h-6 w-6 text-primary-foreground mt-1 flex-shrink-0" />
                  <p className="text-base text-primary-foreground/90">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - CTA Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mx-auto">
                  <MessageSquare className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-center text-primary-foreground">
                  Ready to Get Started?
                </h3>
                <p className="text-center text-primary-foreground/90">
                  Fill out our comprehensive quote form and our team will get
                  back to you within 24 hours with a detailed proposal.
                </p>
              </div>

              <div className="space-y-4">
                <Link href="/contact/quote" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-background hover:bg-background/90 text-foreground group transition-all duration-500"
                  >
                    Get Your Quote
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-primary-foreground/70">
                  No obligation • Free consultation • Quick response
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
