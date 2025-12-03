/**
 * Utility functions to auto-generate product title and description
 */

interface ProductData {
  category?: string;
  technical?: {
    name?: string;
    model?: string;
    capacity?: string;
    capacityAhOrKwh?: string;
    capacityKvaKw?: string;
    type?: string;
    batteryType?: string;
    cycleLife?: string;
    voltage?: string;
    phaseVoltage?: string;
    inverterType?: string;
    efficiency?: string;
    ipRatings?: string;
  };
}

/**
 * Generate product title from product data
 */
export function generateProductTitle(data: ProductData): string {
  const { category, technical } = data;

  if (!category || !technical) {
    return '';
  }

  const name = technical.name || '';
  const model = technical.model || '';
  const capacity = technical.capacity || '';

  if (!name && !model && !capacity) {
    return '';
  }

  const categoryLabels: Record<string, string> = {
    'solar-panel': 'Solar Panel',
    battery: 'Battery',
    inverter: 'Inverter',
  };

  const categoryLabel = categoryLabels[category] || category;

  // Build title based on available fields
  const parts: string[] = [];

  if (name) {
    parts.push(name);
  }

  if (model) {
    parts.push(model);
  }

  // Use capacity based on category
  if (category === 'solar-panel' && technical.capacity) {
    parts.push(technical.capacity);
  } else if (category === 'battery' && technical.capacityAhOrKwh) {
    parts.push(technical.capacityAhOrKwh);
  } else if (category === 'inverter' && technical.capacityKvaKw) {
    parts.push(technical.capacityKvaKw);
  }

  if (parts.length === 0) {
    return '';
  }

  return `${parts.join(' ')} ${categoryLabel}`;
}

/**
 * Generate product description from product data
 */
export function generateProductDescription(data: ProductData): string {
  const { category, technical } = data;

  if (!category || !technical) {
    return '';
  }

  const categoryLabels: Record<string, string> = {
    'solar-panel': 'solar panel',
    battery: 'battery',
    inverter: 'inverter',
  };

  const categoryLabel = categoryLabels[category] || category;
  let description = `High-quality ${categoryLabel}`;

  const name = technical.name || '';
  const model = technical.model || '';

  // Get capacity based on category
  let capacity = '';
  if (category === 'solar-panel') {
    capacity = technical.capacity || '';
  } else if (category === 'battery') {
    capacity = technical.capacityAhOrKwh || '';
  } else if (category === 'inverter') {
    capacity = technical.capacityKvaKw || '';
  }

  if (name || model) {
    description += ` ${name || model}`.trim();
  }

  if (capacity) {
    description += ` with ${capacity} capacity`;
  }

  // Add category-specific details
  if (category === 'solar-panel') {
    const type = technical.type;
    if (type) {
      description += `. ${type === 'monofacial' ? 'Monofacial' : 'Bifacial'} technology`;
    }
  } else if (category === 'battery') {
    const batteryType = technical.batteryType;
    const cycleLife = technical.cycleLife;
    if (batteryType) {
      description += `. ${batteryType} battery`;
    }
    if (cycleLife) {
      description += ` with ${cycleLife} cycle life`;
    }
  } else if (category === 'inverter') {
    const inverterType = technical.inverterType;
    const efficiency = technical.efficiency;
    if (inverterType) {
      description += `. ${inverterType === 'hybrid' ? 'Hybrid' : 'Non-hybrid'} inverter`;
    }
    if (efficiency) {
      description += ` with ${efficiency} efficiency`;
    }
  }

  description += '.';

  return description;
}

/**
 * Check if required fields are filled for title generation
 */
export function canGenerateTitle(data: ProductData): boolean {
  const { category, technical } = data;
  if (!category || !technical) {
    return false;
  }

  // Need at least one of: name, model, or capacity (category-specific)
  const hasCapacity =
    (category === 'solar-panel' && technical.capacity) ||
    (category === 'battery' && technical.capacityAhOrKwh) ||
    (category === 'inverter' && technical.capacityKvaKw);

  return !!(technical.name || technical.model || hasCapacity);
}

/**
 * Check if required fields are filled for description generation
 */
export function canGenerateDescription(data: ProductData): boolean {
  const { category, technical } = data;
  return !!(category && technical);
}
