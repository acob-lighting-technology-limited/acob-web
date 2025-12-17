/**
 * Product Types
 *
 * Type definitions for product-related data structures.
 */

import type { SanitySlug } from './sanity.types';

// ============================================================================
// PRODUCT SPECIFICATIONS
// ============================================================================

/**
 * Solar panel specifications
 */
export interface PanelSpecifications {
  /** Power rating in watts */
  powerRatingWatts: string;
  /** Efficiency percentage */
  efficiencyPercent: string;
  /** Voltage (Vmp/Voc) */
  voltageVmpVoc: string;
  /** Dimensions in millimeters */
  dimensionsMm: string;
  /** Warranty period */
  warranty: string;
}

/**
 * Battery specifications
 */
export interface BatterySpecifications {
  /** Capacity in Ah or kWh */
  capacityAhOrKwh: string;
  /** Battery type (e.g., "Lithium-ion", "Lead-acid") */
  batteryType: string;
  /** Cycle life */
  cycleLife: string;
  /** Voltage */
  voltage: string;
  /** Warranty period */
  warranty: string;
}

/**
 * Inverter specifications
 */
export interface InverterSpecifications {
  /** Power rating in kVA/kW */
  powerRatingKvaKw: string;
  /** Input voltage */
  inputVoltage: string;
  /** Output voltage */
  outputVoltage: string;
  /** Efficiency percentage */
  efficiencyPercent: string;
  /** Warranty period */
  warranty: string;
}

/**
 * Combined product specifications
 */
export interface ProductSpecifications {
  /** Solar panel specs (if applicable) */
  panelSpecifications?: PanelSpecifications;
  /** Battery specs (if applicable) */
  batterySpecifications?: BatterySpecifications;
  /** Inverter specs (if applicable) */
  inverterSpecifications?: InverterSpecifications;
}

// ============================================================================
// PRODUCT
// ============================================================================

/**
 * Product category types
 */
export type ProductCategory = 'solar-panel' | 'battery' | 'inverter';

/**
 * Product availability status
 */
export type ProductAvailability =
  | 'in-stock'
  | 'out-of-stock'
  | 'pre-order'
  | 'coming-soon';

/**
 * Product image
 */
export interface ProductImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

/**
 * Solar product
 */
export interface Product {
  /** Unique product ID */
  _id: string;
  /** Product title */
  title: string;
  /** URL slug */
  slug: SanitySlug;
  /** Product category */
  category: ProductCategory;
  /** Stock Keeping Unit */
  sku: string;
  /** Availability status */
  availability: ProductAvailability;
  /** Product description */
  description: string;
  /** Main product image */
  productImage: ProductImage;
  /** Additional product images */
  productImages?: ProductImage[];
  /** Technical specifications */
  specifications?: ProductSpecifications;
  /** Whether product is featured */
  isFeatured?: boolean;
  /** Creation timestamp */
  _createdAt: string;
  /** Last update timestamp */
  _updatedAt: string;
}
