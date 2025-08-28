'use client';

import { useState, useEffect } from 'react';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { servicesData, categories, tags } from '@/lib/data';
import CallToAction from '@/components/layout/call-to-action';
import Image from 'next/image';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    let filtered = servicesData;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Services') {
      filtered = filtered.filter(service => {
        // Map the UI categories to actual service categories
        const categoryMapping: { [key: string]: string[] } = {
          'Mini-Grid Solutions': ['Power Solutions'],
          'Captive Power': ['Power Solutions'],
          'Energy Audit': ['Consulting'],
          'Installation': ['Construction'],
          'Maintenance': ['Infrastructure', 'Construction']
        };
        
        const targetCategories = categoryMapping[selectedCategory] || [selectedCategory];
        return targetCategories.includes(service.category);
      });
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };
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
            {/* Search Results Info */}
            {(searchQuery || selectedCategory) && (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {filteredServices.length} service(s) found
                      {searchQuery && ` for "${searchQuery}"`}
                      {selectedCategory && ` in "${selectedCategory}"`}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearSearch}
                      className="text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredServices.length === 0 ? (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No services found</h3>
                    <p>Try adjusting your search terms or browse all services.</p>
                  </div>
                  <Button variant="outline" onClick={handleClearSearch}>
                    View All Services
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredServices.map(service => (
              <Card
                key={service.id}
                className="overflow-hidden p-0 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="hover:scale-105 object-cover"
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
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search Services</h3>
                <div className="relative">
                  <Input
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-border ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category}</span>
                        <span className="text-xs opacity-70">
                          ({(() => {
                            if (category === 'All Services') return servicesData.length;
                            const categoryMapping: { [key: string]: string[] } = {
                              'Mini-Grid Solutions': ['Power Solutions'],
                              'Captive Power': ['Power Solutions'],
                              'Energy Audit': ['Consulting'],
                              'Installation': ['Construction'],
                              'Maintenance': ['Infrastructure', 'Construction']
                            };
                            const targetCategories = categoryMapping[category] || [category];
                            return servicesData.filter(s => targetCategories.includes(s.category)).length;
                          })()})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-2 bg-muted/30 border border-border text-foreground text-sm rounded-lg hover:bg-muted/50 transition-colors duration-200 font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action Widget */}
            <CallToAction />
          </div>
        </div>
      </Container>
    </>
  );
}
