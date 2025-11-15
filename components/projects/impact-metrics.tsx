'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ProjectImpactMetrics } from '@/lib/types';
import { Users, Briefcase, Leaf, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImpactMetricsProps {
  metrics: ProjectImpactMetrics;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
  index: number;
}

const MetricCard = ({
  icon,
  label,
  value,
  unit,
  color,
  index,
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full sm:flex-1 sm:min-w-[200px]"
    >
      <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className={`p-2 sm:p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              {unit && (
                <span className="text-sm text-muted-foreground font-medium">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  // Check if any metrics are provided
  const hasMetrics =
    metrics.beneficiaries ||
    metrics.jobsCreatedDirectly ||
    metrics.jobsCreatedIndirectly ||
    metrics.annualCO2Reduction ||
    metrics.annualEnergyOutput;

  if (!hasMetrics) {
    return null;
  }

  const metricsData = [
    {
      icon: <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />,
      label: 'Beneficiaries',
      value: metrics.beneficiaries,
      color: 'bg-blue-100 dark:bg-blue-950',
      show: !!metrics.beneficiaries,
    },
    {
      icon: <Briefcase className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />,
      label: 'Direct Jobs Created',
      value: metrics.jobsCreatedDirectly,
      color: 'bg-green-100 dark:bg-green-950',
      show: !!metrics.jobsCreatedDirectly,
    },
    {
      icon: <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />,
      label: 'Indirect Jobs Created',
      value: metrics.jobsCreatedIndirectly,
      color: 'bg-purple-100 dark:bg-purple-950',
      show: !!metrics.jobsCreatedIndirectly,
    },
    {
      icon: <Leaf className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-600" />,
      label: 'Annual CO₂ Reduction',
      value: metrics.annualCO2Reduction,
      unit: 't/yr',
      color: 'bg-emerald-100 dark:bg-emerald-950',
      show: !!metrics.annualCO2Reduction,
    },
    {
      icon: <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />,
      label: 'Annual Energy Output',
      value: metrics.annualEnergyOutput,
      unit: 'kWh/yr',
      color: 'bg-amber-100 dark:bg-amber-950',
      show: !!metrics.annualEnergyOutput,
    },
  ].filter(metric => metric.show);

  return (
    <div className="mt-6 sm:mt-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          Project Impact
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4">
        {metricsData.map((metric, index) => (
          <MetricCard
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value || 0}
            unit={metric.unit}
            color={metric.color}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
