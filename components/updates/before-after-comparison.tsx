'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface BeforeAfterData {
  beforeImage?: string;
  afterImage?: string;
  beforeMetrics?: { label: string; value: string }[];
  afterMetrics?: { label: string; value: string }[];
}

interface BeforeAfterComparisonProps {
  data: BeforeAfterData;
}

export function BeforeAfterComparison({ data }: BeforeAfterComparisonProps) {
  const hasImages = data.beforeImage && data.afterImage;
  const hasMetrics = data.beforeMetrics && data.afterMetrics;

  if (!hasImages && !hasMetrics) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6">Before & After</h3>

        {/* Images Comparison */}
        {hasImages && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="mb-2">
                Before
              </Badge>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={data.beforeImage!}
                  alt="Before installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Badge className="mb-2">After</Badge>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={data.afterImage!}
                  alt="After installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        )}

        {/* Metrics Comparison */}
        {hasMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Before Metrics */}
            <div className="space-y-3 p-4 rounded-lg bg-muted/30">
              <Badge variant="secondary" className="mb-2">
                Before
              </Badge>
              {data.beforeMetrics!.map((metric, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="font-semibold">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight
                className="h-8 w-8 text-primary hidden md:block"
                aria-hidden="true"
              />
            </div>

            {/* After Metrics */}
            <div className="space-y-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <Badge className="mb-2">After</Badge>
              {data.afterMetrics!.map((metric, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="font-semibold text-primary">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
