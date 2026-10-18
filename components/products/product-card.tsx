'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { useState } from 'react';
import { Eye, Phone } from 'lucide-react';
import { ContactDialog } from './contact-dialog';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    sku?: string;
    availability: string;
    productImage: {
      asset?: {
        url: string;
      };
      alt?: string;
      url?: string;
    };
    category?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const availabilityLabels: Record<
    string,
    { label: string; variant: 'default' | 'secondary' | 'destructive' }
  > = {
    'in-stock': { label: 'In Stock', variant: 'default' },
    'out-of-stock': { label: 'Out of Stock', variant: 'destructive' },
    'pre-order': { label: 'Pre-Order', variant: 'secondary' },
    'coming-soon': { label: 'Coming Soon', variant: 'secondary' },
  };

  const availability = availabilityLabels[product.availability] || {
    label: product.availability,
    variant: 'secondary' as const,
  };

  const imageUrl =
    product.productImage?.asset?.url ||
    (typeof product.productImage?.url === 'string'
      ? product.productImage.url
      : null);
  const imageAlt = product.productImage?.alt || product.title;

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden bg-muted rounded-t">
          {imageUrl && imageUrl.trim() !== '' && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <Badge
            className="absolute right-3 top-3 backdrop-blur-sm"
            variant={availability.variant}
          >
            {availability.label}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-1 text-lg font-extrabold tracking-tight text-foreground line-clamp-2">
            {product.title}
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            SKU: {product.sku}
          </p>

          <div className="mt-auto space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/products/${product.slug.current}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>

            <Button className="w-full" onClick={() => setIsContactOpen(true)}>
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        productName={product.title}
      />
    </>
  );
}
