'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Image as ImageIcon,
  Video,
  Camera,
  Filter,
  Grid,
  List,
} from 'lucide-react';

import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  type: 'image' | 'video';
  src: string;
  category: string;
  date: string;
  description: string;
}

interface GalleryClientProps {
  galleryItems: GalleryItem[];
  galleryCategories: string[];
}

export function GalleryClient({ galleryItems, galleryCategories }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter gallery items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory, galleryItems]);

  return (
    <div className="space-y-8">
      {/* Gallery Controls */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {galleryCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <Card className="!border-t-2 !border-t-primary border border-border">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p>No gallery items match the selected category.</p>
            </div>
            <Button variant="outline" onClick={() => setSelectedCategory('All')}>
              View All Items
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
          {filteredItems.map(item => (
            <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
              viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}>
              <div className={`${viewMode === 'list' ? 'md:w-1/3' : ''} aspect-[4/3] overflow-hidden relative`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Video className="h-12 w-12 text-white" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {item.type === 'video' ? 'Video' : 'Image'}
                  </span>
                </div>
              </div>
              <CardContent className={`p-4 ${viewMode === 'list' ? 'md:w-2/3 md:flex md:flex-col md:justify-between' : ''}`}>
                <div>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{item.category}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className={`font-semibold mb-2 text-foreground ${viewMode === 'list' ? 'text-lg' : ''}`}>{item.title}</h3>
                  <p className={`text-sm text-muted-foreground mb-3 ${viewMode === 'list' ? 'text-base' : ''}`}>{item.description}</p>
                </div>
                <Button variant="outline" size="sm" className={`${viewMode === 'list' ? 'w-auto' : 'w-full'}`}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  View Full Size
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center pt-8">
        <Button size="lg" variant="outline">
          Load More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
