'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  TrendingUp,
  Zap,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Battery,
  Sun,
} from 'lucide-react';

export interface CaseStudyMetrics {
  projectSize?: string;
  location?: string;
  duration?: string;
  energyGenerated?: string;
  costSavings?: string;
  co2Reduction?: string;
  beneficiaries?: string;
  systemType?: string;
}

interface CaseStudyMetricsProps {
  metrics: CaseStudyMetrics;
}

export function CaseStudyMetricsComponent({ metrics }: CaseStudyMetricsProps) {
  const metricItems = [
    {
      icon: Sun,
      label: 'Project Size',
      value: metrics.projectSize,
      color: 'text-amber-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: metrics.location,
      color: 'text-blue-500',
    },
    {
      icon: Calendar,
      label: 'Duration',
      value: metrics.duration,
      color: 'text-purple-500',
    },
    {
      icon: Zap,
      label: 'Energy Generated',
      value: metrics.energyGenerated,
      color: 'text-yellow-500',
    },
    {
      icon: DollarSign,
      label: 'Cost Savings',
      value: metrics.costSavings,
      color: 'text-green-500',
    },
    {
      icon: TrendingUp,
      label: 'CO₂ Reduction',
      value: metrics.co2Reduction,
      color: 'text-emerald-500',
    },
    {
      icon: Users,
      label: 'Beneficiaries',
      value: metrics.beneficiaries,
      color: 'text-indigo-500',
    },
    {
      icon: Battery,
      label: 'System Type',
      value: metrics.systemType,
      color: 'text-cyan-500',
    },
  ].filter(item => item.value); // Only show metrics that have values

  if (metricItems.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Project Metrics & Impact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className={`${item.color} mt-1`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-foreground break-words">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
