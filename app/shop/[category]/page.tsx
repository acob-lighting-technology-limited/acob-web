'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Hero } from '@/components/ui/hero';
import { Container } from '@/components/ui/container';
import { Search, X } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  availability: string;
  productImage: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  category?: string;
}

const categoryInfo: Record<
  string,
  { title: string; description: string; image: string }
> = {
  'solar-panel': {
    title: 'Solar Panels',
    description: 'High-efficiency photovoltaic panels for all applications',
    image: '/images/products/solar-panel-hero.webp?height=400&width=1200',
  },
  inverter: {
    title: 'Inverters',
    description: 'Advanced power conversion systems',
    image: '/images/products/inverter-hero.webp?height=400&width=1200',
  },
  battery: {
    title: 'Batteries',
    description: 'Reliable energy storage solutions',
    image: '/images/products/battery-hero.webp?height=400&width=1200',
  },
};

export default function ShopCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const info = categoryInfo[category];

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products?category=${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (category) {
      fetchProducts();
    }
  }, [category]);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (!info) {
    return (
      <Container className="px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The category you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: info.title },
  ];

  return (
    <>
      <Hero
        image={info.image}
        title={info.title}
        description={info.description}
      />
      <Container className="px-4 py-8">
        {/* Breadcrumb with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="relative w-full sm:w-96">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-11 pl-10 pr-10 bg-background border-2 focus:border-primary transition-all duration-300"
              disabled={isLoading}
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
        {searchQuery && !isLoading && (
          <div className="mb-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">
                      {filteredProducts.length}
                    </span>{' '}
                    product{filteredProducts.length !== 1 ? 's' : ''} found for{' '}
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

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-10 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="!border-t-2 !border-t-primary border border-border">
            <CardContent className="p-4 sm:p-6 xl:p-8 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p>Try adjusting your search terms or browse all products.</p>
              </div>
              <Button variant="outline" onClick={handleClearSearch}>
                View All Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
