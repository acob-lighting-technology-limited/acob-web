'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock } from 'lucide-react';

export interface TimelinePhase {
  phase: string;
  duration: string;
  description: string;
  completed: boolean;
}

interface CaseStudyTimelineProps {
  phases: TimelinePhase[];
}

export function CaseStudyTimeline({ phases }: CaseStudyTimelineProps) {
  if (!phases || phases.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Project Timeline
        </h3>

        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div key={index} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    phase.completed
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  aria-label={
                    phase.completed ? 'Completed phase' : 'Pending phase'
                  }
                >
                  {phase.completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                {index < phases.length - 1 && (
                  <div
                    className={`w-0.5 h-full min-h-[60px] ${
                      phase.completed ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>

              {/* Phase Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{phase.phase}</h4>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    {phase.duration}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
