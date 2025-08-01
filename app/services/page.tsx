import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Settings, Leaf, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { servicesData } from '@/lib/data/services';
import CallToAction from '@/components/layout/call-to-action';
import { OptimizedImage } from '@/components/ui/optimized-image';

const categories = [
  'All Services',
  'Power Solutions',
  'Consulting',
  'Construction',
  'Infrastructure',
];

const tags = [
  'Solar Energy',
  'Mini-Grid',
  'Energy Audit',
  'Installation',
  'Maintenance',
  'Consulting',
  'EPC',
  'Streetlighting',
];

export default function ServicesPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Services' }];

  return (
    <>
      <PageHero
        title="Services"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {servicesData.map(service => (
              <Card
                key={service.id}
                className="overflow-hidden border-0 custom-shadow shadow-none p-0 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <OptimizedImage
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}
            <div className="bg-muted border-t-2  border-t-primary p-6 rounded-lg border-[1px]">
              <h3 className="text-xl font-bold text-foreground mb-4">Search</h3>
              <div className="relative border-[0.5px] rounded-md border-primary">
                <Input
                  placeholder="Search services..."
                  className="pr-10 bg-surface border-primary !border-[0.5px] focus:border-primary focus:ring-primary text-foreground"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              </div>
            </div>

            {/* Categories */}
            <div className="border-t-2 bg-muted border-t-primary p-6 rounded-lg border-[1px]">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <Link
                      href="#"
                      className=" p-2 border-primary border-[0.5px] rounded-lg bg-surface text-foreground hover:bg-primary hover:text-primary-foreground  flex items-center justify-between"
                    >
                      <span className="font-medium">{category}</span>
                      <span className="text-sm opacity-70">(5)</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-muted border-t-2 border-t-primary p-6 rounded-lg border-[1px]">
              <h3 className="text-xl font-bold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Link
                    key={tag}
                    href="#"
                    className="px-3 py-2 bg-surface border-[0.5px] border-primary text-foreground text-sm rounded-lg hover:bg-primary hover:text-primary-foreground  font-medium"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Call to Action Widget */}
            <CallToAction />
          </div>
        </div>
      </Container>
    </>
  );
}
