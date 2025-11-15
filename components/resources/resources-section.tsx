'use client';

import { useState } from 'react';
import { resourcesData, resourceCategories } from '@/lib/data/resources-data';
import { ResourceCard } from './resource-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

  // Separate featured resources
  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search resources"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
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

      {/* Featured Resources */}
      {featuredResources.length > 0 && selectedCategory === 'all' && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="space-y-4">
        {selectedCategory !== 'all' && (
          <h3 className="text-2xl font-bold">
            {resourceCategories.find(cat => cat.id === selectedCategory)?.name}
          </h3>
        )}

        <div className="text-sm text-muted-foreground">
          Showing {regularResources.length} resource
          {regularResources.length !== 1 && 's'}
        </div>

        {regularResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
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

      {/* Help Section */}
      <div className="mt-12 p-8 bg-muted/50 rounded-lg border text-center">
        <h3 className="text-2xl font-bold mb-2">Need Custom Documentation?</h3>
        <p className="text-muted-foreground mb-6">
          Can't find what you're looking for? Contact our support team for
          custom documentation and technical assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/contact/support">Contact Support</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:support@acoblighting.com">Email Us</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
