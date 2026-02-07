'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
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

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
            {(() => {
              // Handle nested asset structure from Sanity
              // The API returns: productImage{ asset->{ url }, alt }
              const imageUrl =
                product.productImage?.asset?.url ||
                (typeof product.productImage?.url === 'string'
                  ? product.productImage.url
                  : null);
              const imageAlt = product.productImage?.alt || product.title;

              // Only render if we have a valid URL string
              if (
                imageUrl &&
                typeof imageUrl === 'string' &&
                imageUrl.trim() !== ''
              ) {
                return (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                );
              }
              return null;
            })()}
            <Badge
              className="absolute top-3 right-3 backdrop-blur-sm"
              variant={availability.variant}
            >
              {availability.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold mb-3 line-clamp-2 flex-1">
              {product.title}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground mb-4">
            SKU: {product.sku}
          </p>

          {/* Actions */}
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
        </CardContent>
      </Card>

      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        productName={product.title}
      />
    </>
  );
}
