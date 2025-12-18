/**
 * Sanity CMS Types
 *
 * Type definitions for Sanity CMS data structures.
 * These types represent the raw data from Sanity.
 */

// ============================================================================
// BASE SANITY TYPES
// ============================================================================

/**
 * Sanity image reference
 */
export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

/**
 * Sanity image with URL
 */
export interface SanityImageUrl {
  asset: {
    url: string;
  };
  width?: number;
  height?: number;
}

/**
 * Sanity slug type
 */
export interface SanitySlug {
  current: string;
  _type?: 'slug';
}

/**
 * Base Sanity document
 */
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev?: string;
}
