'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeroCarousel } from '@/components/ui/page-hero-carousel';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { servicesData } from '@/lib/data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  StaggerChildren,
  staggerItem,
} from '@/components/animations/StaggerChildren';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(servicesData);

  useEffect(() => {
    let filtered = servicesData;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredServices(filtered);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Services' }];

  // Get all service images for carousel
  const serviceImages = useMemo(() => {
    return servicesData.map(service => ({
      src: service.image,
      alt: service.title,
    }));
  }, []);

  return (
    <>
      <PageHeroCarousel
        images={serviceImages}
        title="Our Services"
        description="Comprehensive Solar Energy Solutions for Every Need"
      />

      <Container className="px-4 py-8">
        {/* Breadcrumb with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="relative w-full sm:w-96">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-11 pl-10 pr-10 bg-background border-2 focus:border-primary transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">
                      {filteredServices.length}
                    </span>{' '}
                    service{filteredServices.length !== 1 ? 's' : ''} found for{' '}
                    <span className="font-medium">"{searchQuery}"</span>
                  </p>
                  <Button
                    variant="ghost"
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
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse all services.
              </p>
              <Button onClick={handleClearSearch}>
                <X className="mr-2 h-4 w-4" />
                View All Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First card - visible immediately on mobile */}
            {filteredServices.length > 0 && (
              <div className="block md:hidden">
                <Link
                  href={`/services/${filteredServices[0].slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      <Image
                        src={filteredServices[0].image}
                        alt={filteredServices[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {filteredServices[0].title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {filteredServices[0].excerpt}
                      </p>

                      {/* View Service Link */}
                      <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )}

            {/* Rest of the cards with animation */}
            <StaggerChildren
              staggerDelay={0.1}
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-full"
            >
              {filteredServices.map(service => (
                <motion.div key={service.id} variants={staggerItem}>
                  <Link href={`/services/${service.slug}`} className="group">
                    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                      {/* Image */}
                      <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardContent className="p-6 flex flex-col flex-1">
                        {/* Title */}
                        <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                          {service.excerpt}
                        </p>

                        {/* View Service Link */}
                        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </StaggerChildren>

            {/* Rest of the cards on mobile (without first card) */}
            {filteredServices.length > 1 && (
              <StaggerChildren
                staggerDelay={0.1}
                className="block md:hidden grid grid-cols-1 gap-6"
              >
                {filteredServices.slice(1).map(service => (
                  <motion.div key={service.id} variants={staggerItem}>
                    <Link href={`/services/${service.slug}`} className="group">
                      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                        {/* Image */}
                        <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <CardContent className="p-6 flex flex-col flex-1">
                          {/* Title */}
                          <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                            {service.excerpt}
                          </p>

                          {/* View Service Link */}
                          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                            Learn More
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </StaggerChildren>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
