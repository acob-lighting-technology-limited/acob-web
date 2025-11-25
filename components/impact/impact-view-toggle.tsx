'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'cards' | 'chart';

export function ImpactViewToggle() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  useEffect(() => {
    // Toggle visibility based on view mode
    const cardsView = document.getElementById('impact-cards-view');
    const chartView = document.getElementById('impact-chart-view');

    if (viewMode === 'cards') {
      cardsView?.classList.remove('hidden');
      chartView?.classList.add('hidden');
    } else {
      cardsView?.classList.add('hidden');
      chartView?.classList.remove('hidden');
    }
  }, [viewMode]);

  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg w-fit">
      <Button
        variant={viewMode === 'cards' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('cards')}
        className={cn(
          'flex items-center gap-2',
          viewMode === 'cards' && 'shadow-sm',
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        Cards
      </Button>
      <Button
        variant={viewMode === 'chart' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('chart')}
        className={cn(
          'flex items-center gap-2',
          viewMode === 'chart' && 'shadow-sm',
        )}
      >
        <BarChart3 className="h-4 w-4" />
        Chart
      </Button>
    </div>
  );
}
