'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Hero } from '@/components/ui/hero';
import { Container } from '@/components/ui/container';
import { Search, X } from 'lucide-react';
import { QUERY_KEYS } from '@/lib/query-keys';
import {
  CardSkeleton,
  QueryError,
  EmptyState,
} from '@/components/ui/query-states';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  sku: string;
  availability: string;
  description: string;
  productImage: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  category?: string;
}

interface ProductCatalogProps {
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export function ProductCatalog({ breadcrumbItems }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.products(),
    queryFn: fetchProducts,
  });

  const filteredProducts = useMemo(
    () =>
      products.filter(product => {
        return (
          searchQuery === '' ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.sku &&
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }),
    [products, searchQuery],
  );

  // Generate hero images from filtered products
  const productImages = useMemo(() => {
    return filteredProducts
      .filter((product: Product) => product.productImage?.asset?.url)
      .map((product: Product) => ({
        src: product.productImage!.asset!.url,
        alt: product.productImage!.alt || product.title,
        href: `/products/${product.slug.current}`,
      }));
  }, [filteredProducts]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (isError) {
    return (
      <Container className="px-4 py-8">
        <QueryError
          message="Could not load products."
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  return (
    <>
      <Hero
        image={productImages}
        title="Product Catalog"
        description="Built to Perform."
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

        {/* Standfirst */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>Solar equipment</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            A comprehensive range of high-quality solar equipment and
            components.
          </p>
        </div>

        {/* Search result count */}
        {searchQuery && !isLoading && (
          <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
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
          <div className="mt-10">
            <CardSkeleton count={8} />
          </div>
        ) : filteredProducts.length === 0 ? (
          searchQuery ? (
            <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
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
            <div className="mt-10">
              <EmptyState message="No products found." />
            </div>
          )
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
