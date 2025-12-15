'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative max-w-3xl mx-auto', className)}>
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 h-full " />

      <div className="space-y-2">
        {items.map((item, index) => {
          const IconComponent = LucideIcons[
            item.icon as keyof typeof LucideIcons
          ] as React.ComponentType<{ className?: string }>;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                'relative flex items-center',
                isEven ? 'flex-row' : 'flex-row-reverse',
              )}
            >
              {/* Content Card */}
              <div
                className={cn(
                  'flex-1 max-w-[280px]',
                  isEven ? 'pr-4 text-right' : 'pl-4 text-left',
                )}
              >
                <Card className="group hover:shadow-lg transition-all duration-500 border-l-4 border-l-primary/20 hover:border-l-primary">
                  <CardContent className="p-3">
                    <div
                      className={cn(
                        'flex items-center gap-2 mb-2',
                        isEven ? 'justify-end' : 'justify-start',
                      )}
                    >
                      <div className="relative w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                        <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                        {IconComponent && (
                          <IconComponent className="w-3 h-3 relative z-10 text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-background border-3 border-primary rounded-full z-10 shadow-lg" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Mobile-friendly timeline variant
export function TimelineMobile({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 h-full" />

      <div className="space-y-3">
        {items.map((item, index) => {
          const IconComponent = LucideIcons[
            item.icon as keyof typeof LucideIcons
          ] as React.ComponentType<{ className?: string }>;

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-start gap-3"
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 transform -translate-x-1/2 w-5 h-5 bg-background border-3 border-primary rounded-full z-10 shadow-lg" />

              {/* Content Card */}
              <div className="flex-1 ml-9">
                <Card className="group hover:shadow-lg transition-all duration-500 border-l-4 border-l-primary/20 hover:border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                        <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                        <IconComponent className="w-3.5 h-3.5 relative z-10 text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground" />
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
