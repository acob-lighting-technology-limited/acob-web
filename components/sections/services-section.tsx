import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: (
      <img
        src="/images/mini-grid-solutions.webp"
        alt="Mini-Grid Solutions"
        className="w-20 h-20 object-contain"
      />
    ),
    title: "Mini-Grid Solutions",
    description:
      "ACOB provides minigrid solutions that serve a wide range of customers which include private households, commercial businesses such as shops, ice makers and mobile phone chargers, agricultural loads.",
  },
  {
    icon: (
      <img
        src="/images/captive-power-solutions.webp"
        alt="Captive Power Solutions"
        className="w-20 h-20 object-contain"
      />
    ),
    title: "Captive Power Solutions",
    description:
      "ACOB provides Solar and Inverter system to residential customers, commercial customers and for public driven projects. For example, gas stations, banks, schools, business offices and other type of facilities/buildings that require reliable power.",
  },
  {
    icon: (
      <img
        src="/images/professional-energy-audit.webp"
        alt="Professional Energy Audit"
        className="w-20 h-20 object-contain"
      />
    ),
    title: "Professional Energy Audit",
    description:
      "Over the years, ACOB has built competence in Energy Audit for industries, residential buildings, offices and public lighting facilities.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Container className="px-4">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
              A Leading Supplier Of Solar Materials For Manufacturers Installers
              & Contractors, Mini-Grid Solutions.
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Together with experienced technical team, ACOB Lighting provides
              emergency response to electricity outages for customers, standard
              technical O&M activities, design and installation of
              streetlighting infrastructure. We ensure quality control of indoor
              installations and safety training for customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-3 bg-transparent"
              >
                Find Your Solution
              </Button>
            </div>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 relative overflow-hidden"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-6 w-fit transition-transform duration-500 hover:scale-x-[-1]">
                  <span>{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <Button className="bg-black hover:bg-primary duration-500 transition-colors text-white px-6 py-2 text-sm">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>

              {/* Green accent line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
