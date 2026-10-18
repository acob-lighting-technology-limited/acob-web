'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Hero } from '@/components/ui/hero';
import { Container } from '@/components/ui/container';
import { Search, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

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
      <Container className="px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight">
          Category Not Found
        </h2>
        <p className="mt-4 text-muted-foreground">
          The category you&apos;re looking for doesn&apos;t exist.
        </p>
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
        titleSize="display"
      />
      <Container className="px-4 py-8">
        {/* Breadcrumb + Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />

          <div className="relative w-full sm:w-96">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-11 border-2 bg-background pl-10 pr-10 transition-all duration-300 focus:border-primary"
              disabled={isLoading}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-muted"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Search result count */}
        {searchQuery && !isLoading && (
          <div className="mb-8 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">
                {filteredProducts.length}
              </span>{' '}
              product{filteredProducts.length !== 1 ? 's' : ''} found for{' '}
              <span className="font-semibold text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </p>
            <button
              onClick={handleClearSearch}
              className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-primary"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-border"
              >
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-6">
                  <div className="mb-4 h-6 rounded bg-muted" />
                  <div className="mb-2 h-4 rounded bg-muted" />
                  <div className="h-10 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-2xl font-bold tracking-tight">
              No products found
            </h3>
            <p className="mb-6 text-muted-foreground">
              Try adjusting your search terms or browse all products.
            </p>
            <Button variant="outline" onClick={handleClearSearch}>
              View All Products
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 border-t border-border pt-6">
              <SectionEyebrow>
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? 's' : ''} found
              </SectionEyebrow>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground">
                {info.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
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
