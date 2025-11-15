'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/data/products-data';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryLabels: Record<string, string> = {
    'solar-panels': 'Solar Panels',
    inverters: 'Inverters',
    batteries: 'Batteries',
    accessories: 'Accessories',
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
            {categoryLabels[product.category]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Key Specs Preview */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          {product.specifications.slice(0, 4).map((spec, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                {spec.label}
              </span>
              <span className="font-medium text-foreground">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Warranty Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-4 border-b">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs">{product.warranty}</span>
        </div>

        {/* Expandable Section */}
        {isExpanded && (
          <div className="space-y-4 mb-4 animate-in slide-in-from-top">
            {/* All Specifications */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">
                Full Specifications
              </h4>
              <div className="space-y-1 text-xs">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-1 border-b border-border/50"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Key Features</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Applications</h4>
              <div className="flex flex-wrap gap-1">
                {product.applications.map((app, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {app}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Show less details' : 'Show more details'}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                View Details
              </>
            )}
          </Button>

          <Button className="w-full" asChild>
            <a
              href={`/contact/quote?product=${encodeURIComponent(product.name)}`}
              aria-label={`Get quote for ${product.name}`}
            >
              Request Quote
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
