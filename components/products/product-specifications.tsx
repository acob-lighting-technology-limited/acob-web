'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface ProductSpecificationsProps {
  category: 'solar-panel' | 'battery' | 'inverter';
  specifications?: {
    panelSpecifications?: {
      powerRatingWatts: string;
      efficiencyPercent: string;
      voltageVmpVoc: string;
      dimensionsMm: string;
      warranty: string;
    };
    batterySpecifications?: {
      capacityAhOrKwh: string;
      batteryType: string;
      cycleLife: string;
      voltage: string;
      warranty: string;
    };
    inverterSpecifications?: {
      powerRatingKvaKw: string;
      inputVoltage: string;
      outputVoltage: string;
      efficiencyPercent: string;
      warranty: string;
    };
  };
}

export function ProductSpecifications({
  category,
  specifications,
}: ProductSpecificationsProps) {
  if (!specifications) {
    return null;
  }

  const getCategoryLabel = () => {
    switch (category) {
      case 'solar-panel':
        return 'Solar Panel Specifications';
      case 'battery':
        return 'Battery Specifications';
      case 'inverter':
        return 'Inverter Specifications';
      default:
        return 'Product Specifications';
    }
  };

  const getSpecItems = () => {
    switch (category) {
      case 'solar-panel': {
        if (!specifications.panelSpecifications) {
          return [];
        }
        const panel = specifications.panelSpecifications;
        return [
          { label: 'Power Rating', value: panel.powerRatingWatts },
          { label: 'Efficiency', value: panel.efficiencyPercent },
          { label: 'Voltage (Vmp / Voc)', value: panel.voltageVmpVoc },
          { label: 'Dimensions', value: panel.dimensionsMm },
          { label: 'Warranty', value: panel.warranty },
        ];
      }
      case 'battery': {
        if (!specifications.batterySpecifications) {
          return [];
        }
        const battery = specifications.batterySpecifications;
        return [
          { label: 'Capacity', value: battery.capacityAhOrKwh },
          { label: 'Battery Type', value: battery.batteryType },
          { label: 'Cycle Life', value: battery.cycleLife },
          { label: 'Voltage', value: battery.voltage },
          { label: 'Warranty', value: battery.warranty },
        ];
      }
      case 'inverter': {
        if (!specifications.inverterSpecifications) {
          return [];
        }
        const inverter = specifications.inverterSpecifications;
        return [
          { label: 'Power Rating', value: inverter.powerRatingKvaKw },
          { label: 'Input Voltage', value: inverter.inputVoltage },
          { label: 'Output Voltage', value: inverter.outputVoltage },
          { label: 'Efficiency', value: inverter.efficiencyPercent },
          { label: 'Warranty', value: inverter.warranty },
        ];
      }
      default:
        return [];
    }
  };

  const specItems = getSpecItems();

  if (specItems.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          {getCategoryLabel()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          {specItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start py-2 border-b last:border-0"
            >
              <dt className="text-muted-foreground font-medium pr-4">
                {item.label}
              </dt>
              <dd className="font-semibold text-right flex-1">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
