'use client';

import { ProjectImpactMetrics } from '@/lib/types';
import {
  Users,
  Briefcase,
  Leaf,
  Zap,
  TrendingUp,
  Battery,
  Fuel,
  DollarSign,
  Activity,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface ImpactMetricsProps {
  metrics: ProjectImpactMetrics;
}

interface MetricBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
  iconColor: string;
  textColor: string;
  showPlus?: boolean;
  index: number;
}

const MetricBadge = ({
  icon,
  label,
  value,
  unit,
  color,
  iconColor,
  textColor,
  showPlus,
  index,
}: MetricBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full sm:flex-1"
    >
      <div
        className={`group relative rounded-xl border-2 ${color} ${textColor} p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-background/50 p-2 transition-all duration-500 group-hover:scale-110 sm:h-12 sm:w-12">
            {/* Animated fill effect */}
            <div
              className={`absolute inset-0 origin-center scale-0 rounded-full transform transition-transform duration-500 ease-out group-hover:scale-100 ${iconColor}`}
            />
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              {icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 truncate">
              {label}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-xl sm:text-2xl font-bold ${textColor} transition-colors duration-300`}
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
                {showPlus ? '+' : ''}
              </span>
              {unit && (
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
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

  // One brand palette for every metric: the icon and number carry the
  // meaning, so per-metric rainbow colours only added noise.
  const TILE = 'bg-card border-border hover:border-primary/40';

  const metricsData = [
    {
      icon: (
        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Beneficiaries',
      value: metrics.beneficiaries,
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      showPlus: true,
      show: !!metrics.beneficiaries,
    },
    {
      icon: (
        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Direct Jobs Created',
      value: metrics.jobsCreatedDirectly,
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      showPlus: true,
      show: !!metrics.jobsCreatedDirectly,
    },
    {
      icon: (
        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Indirect Jobs Created',
      value: metrics.jobsCreatedIndirectly,
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      showPlus: true,
      show: !!metrics.jobsCreatedIndirectly,
    },
    {
      icon: (
        <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Annual CO₂ Reduction',
      value: metrics.annualCO2Reduction,
      unit: 't/yr',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.annualCO2Reduction,
    },
    {
      icon: (
        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Annual Energy Output',
      value: metrics.annualEnergyOutput,
      unit: 'kWh/yr',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.annualEnergyOutput,
    },
    {
      icon: (
        <Battery className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Battery Storage (BESS)',
      value: metrics.bess,
      unit: 'kWh',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.bess,
    },
    {
      icon: (
        <Fuel className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Diesel Displacement',
      value: metrics.dieselReduc,
      unit: '%',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.dieselReduc,
    },
    {
      icon: (
        <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Energy Cost Savings',
      value: metrics.costSavings,
      unit: '%',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.costSavings,
    },
    {
      icon: (
        <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Patient Care Increment',
      value: metrics.patientCareInc,
      unit: '%',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.patientCareInc,
    },
    {
      icon: (
        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-white transition-colors duration-500" />
      ),
      label: 'System Uptime',
      value: metrics.uptime,
      unit: '%',
      color: TILE,
      iconColor: 'bg-primary',
      textColor: 'text-primary',
      show: !!metrics.uptime,
    },
  ].filter(metric => metric.show);

  return (
    <div className="mt-6 sm:mt-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SectionEyebrow>By the numbers</SectionEyebrow>
        <h2 className="mt-2 mb-4 text-2xl font-extrabold uppercase tracking-tight text-foreground sm:mb-6 sm:text-3xl">
          Project Impact
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {metricsData.map((metric, index) => (
          <MetricBadge
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value || 0}
            unit={metric.unit}
            color={metric.color}
            iconColor={metric.iconColor}
            textColor={metric.textColor}
            showPlus={metric.showPlus}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
