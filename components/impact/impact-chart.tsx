'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Project } from '@/lib/types';
import { TrendingUp, Users, Briefcase, Leaf, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImpactChartProps {
  projects: Project[];
}

export function ImpactChart({ projects }: ImpactChartProps) {
  const currentYear = new Date().getFullYear();
  const startYear = 2016;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  // Group projects by year and calculate metrics per year
  const yearlyData = years.map(year => {
    const yearProjects = projects.filter((project: Project) => {
      if (!project.projectDate) {
        return false;
      }
      const projectYear = new Date(project.projectDate).getFullYear();
      return projectYear === year;
    });

    const yearMetrics = yearProjects.reduce(
      (acc, project: Project) => {
        if (project.impactMetrics) {
          acc.beneficiaries += project.impactMetrics.beneficiaries || 0;
          acc.jobsCreatedDirectly +=
            project.impactMetrics.jobsCreatedDirectly || 0;
          acc.jobsCreatedIndirectly +=
            project.impactMetrics.jobsCreatedIndirectly || 0;
          acc.annualCO2Reduction +=
            project.impactMetrics.annualCO2Reduction || 0;
          acc.annualEnergyOutput +=
            project.impactMetrics.annualEnergyOutput || 0;
        }
        return acc;
      },
      {
        beneficiaries: 0,
        jobsCreatedDirectly: 0,
        jobsCreatedIndirectly: 0,
        annualCO2Reduction: 0,
        annualEnergyOutput: 0,
      },
    );

    return {
      year: year.toString(),
      ...yearMetrics,
    };
  });

  const chartConfig = {
    value: {
      label: 'Value',
    },
  };

  const metrics = [
    {
      key: 'beneficiaries',
      label: 'Beneficiaries',
      color: '#2563eb',
      icon: Users,
    },
    {
      key: 'jobsCreatedDirectly',
      label: 'Direct Jobs Created',
      color: '#16a34a',
      icon: Briefcase,
    },
    {
      key: 'jobsCreatedIndirectly',
      label: 'Indirect Jobs Created',
      color: '#9333ea',
      icon: TrendingUp,
    },
    {
      key: 'annualCO2Reduction',
      label: 'Annual CO₂ Reduction',
      color: '#059669',
      icon: Leaf,
      unit: 't/yr',
    },
    {
      key: 'annualEnergyOutput',
      label: 'Annual Energy Output',
      color: '#d97706',
      icon: Zap,
      unit: 'kWh/yr',
    },
  ];

  return (
    <div className="mt-6 sm:mt-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          Impact Metrics by Year
        </h2>
      </motion.div>

      {metrics.map((metric, metricIndex) => {
        const hasData = yearlyData.some(
          (data: Record<string, number | string>) =>
            (data[metric.key] as number) > 0,
        );
        if (!hasData) {
          return null;
        }

        const Icon = metric.icon;

        return (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: metricIndex * 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-foreground" />
              <h3 className="text-xl font-semibold text-foreground">
                {metric.label}
                {metric.unit && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({metric.unit})
                  </span>
                )}
              </h3>
            </div>
            <div className="w-full">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      className="text-xs"
                    />
                    <YAxis
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      className="text-xs"
                      tickFormatter={value => {
                        if (value >= 1000000) {
                          return `${(value / 1000000).toFixed(1)}M`;
                        }
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(1)}K`;
                        }
                        return value.toString();
                      }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey={metric.key}
                      fill={metric.color}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
