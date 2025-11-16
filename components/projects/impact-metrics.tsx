'use client';

import { ProjectImpactMetrics } from '@/lib/types';
import { Users, Briefcase, Leaf, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
        className={`group relative rounded-xl border-2 ${color} ${textColor} p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div
            className={
              'relative w-10 h-10 sm:w-12 sm:h-12 rounded-full p-2 overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 bg-background/50 group-hover:scale-110'
            }
          >
            {/* Animated fill effect */}
            <div
              className={`absolute inset-0 ${iconColor} transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center`}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
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

  const metricsData = [
    {
      icon: (
        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Beneficiaries',
      value: metrics.beneficiaries,
      color:
        'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
      iconColor: 'bg-blue-600 dark:bg-blue-500',
      textColor:
        'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300',
      showPlus: true,
      show: !!metrics.beneficiaries,
    },
    {
      icon: (
        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Direct Jobs Created',
      value: metrics.jobsCreatedDirectly,
      color:
        'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800',
      iconColor: 'bg-green-600 dark:bg-green-500',
      textColor:
        'text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300',
      showPlus: true,
      show: !!metrics.jobsCreatedDirectly,
    },
    {
      icon: (
        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Indirect Jobs Created',
      value: metrics.jobsCreatedIndirectly,
      color:
        'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
      iconColor: 'bg-purple-600 dark:bg-purple-500',
      textColor:
        'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300',
      showPlus: true,
      show: !!metrics.jobsCreatedIndirectly,
    },
    {
      icon: (
        <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Annual CO₂ Reduction',
      value: metrics.annualCO2Reduction,
      unit: 't/yr',
      color:
        'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      iconColor: 'bg-emerald-600 dark:bg-emerald-500',
      textColor:
        'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300',
      show: !!metrics.annualCO2Reduction,
    },
    {
      icon: (
        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors duration-500" />
      ),
      label: 'Annual Energy Output',
      value: metrics.annualEnergyOutput,
      unit: 'kWh/yr',
      color:
        'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
      iconColor: 'bg-amber-600 dark:bg-amber-500',
      textColor:
        'text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300',
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
