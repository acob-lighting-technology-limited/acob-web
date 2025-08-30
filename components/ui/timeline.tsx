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
    <div className={cn('relative max-w-5xl mx-auto', className)}>
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 h-full " />
      
      <div className="space-y-6">
        {items.map((item, index) => {
          const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
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
                isEven ? 'flex-row' : 'flex-row-reverse'
              )}
            >
              {/* Content Card */}
              <div className={cn(
                'flex-1 max-w-sm',
                isEven ? 'pr-6 text-right' : 'pl-6 text-left'
              )}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                  <CardContent className="p-4">
                    <div className={cn(
                      'flex items-center gap-3 mb-3',
                      isEven ? 'justify-end' : 'justify-start'
                    )}>
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-background border-4 border-primary rounded-full z-10 shadow-lg" />
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
      <div className="absolute left-6 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 h-full" />
      
      <div className="space-y-8">
        {items.map((item, index) => {
          const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
          
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 transform -translate-x-1/2 w-6 h-6 bg-background border-4 border-primary rounded-full z-10 shadow-lg" />
              
              {/* Content Card */}
              <div className="flex-1 ml-12">
                <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
