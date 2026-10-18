'use client';

import { useState } from 'react';
import { resourcesData, resourceCategories } from '@/lib/data/resources-data';
import { ResourceCard } from './resource-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export function ResourcesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resourcesData.filter(resource => {
    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  return (
    <div>
      {/* Search and filter */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-11 border-2 bg-background pl-10 transition-all duration-300 focus:border-primary"
            aria-label="Search resources"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All Resources
          </Button>
          {resourceCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured resources */}
      {featuredResources.length > 0 && selectedCategory === 'all' && (
        <div className="mt-12">
          <SectionEyebrow>Highlighted</SectionEyebrow>
          <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground">
            Featured Resources
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} featured />
            ))}
          </div>
        </div>
      )}

      {/* All resources */}
      <div className="mt-12">
        {selectedCategory !== 'all' && (
          <h3 className="text-2xl font-extrabold uppercase tracking-tight text-foreground">
            {resourceCategories.find(cat => cat.id === selectedCategory)?.name}
          </h3>
        )}

        <div className="mt-2 text-sm text-muted-foreground">
          Showing {regularResources.length} resource
          {regularResources.length !== 1 && 's'}
        </div>

        {regularResources.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border py-12 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No resources found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Help band */}
      <div className="mt-16 bg-primary px-6 py-10 text-center text-primary-foreground md:px-12 md:py-14">
        <h3 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          Need Custom Documentation?
        </h3>
        <p className="mx-auto mt-3 max-w-[52ch] text-primary-foreground/90">
          Can&apos;t find what you&apos;re looking for? Contact our support team
          for custom documentation and technical assistance.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="secondary">
            <a href="/contact/support">Contact Support</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <a href={`mailto:${CONTACT_INFO.email.support}`}>Email Us</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
