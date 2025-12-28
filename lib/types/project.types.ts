/**
 * Project Types
 *
 * Type definitions for project-related data structures.
 */

import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImage, SanitySlug } from './sanity.types';

// ============================================================================
// PROJECT IMPACT METRICS
// ============================================================================

/**
 * Impact metrics for a solar project
 */
export interface ProjectImpactMetrics {
  /** Kilowatt peak capacity */
  kwp?: number;
  /** Type of solar system (e.g., "Mini-Grid", "Off-Grid") */
  systemType?: string;
  /** Number of direct beneficiaries */
  beneficiaries?: number;
  /** Number of direct jobs created */
  jobsCreatedDirectly?: number;
  /** Number of indirect jobs created */
  jobsCreatedIndirectly?: number;
  /** Annual CO2 reduction in tonnes */
  annualCO2Reduction?: number;
  /** Annual energy output in kWh */
  annualEnergyOutput?: number;
}

// ============================================================================
// PROJECT CONTENT
// ============================================================================

/**
 * Project content structure (new format)
 */
export interface ProjectContent {
  /** Description type selector */
  description?:
    | 'description1'
    | 'description2'
    | 'description3'
    | 'description4'
    | 'description5'
    | 'description6'
    | 'description7'
    | 'custom';
  /** Preview text for description 1 */
  description1Preview?: string;
  /** Preview text for description 2 */
  description2Preview?: string;
  /** Preview text for description 3 */
  description3Preview?: string;
  /** Preview text for description 4 */
  description4Preview?: string;
  /** Preview text for description 5 */
  description5Preview?: string;
  /** Preview text for description 6 */
  description6Preview?: string;
  /** Preview text for description 7 */
  description7Preview?: string;
  /** Custom description using Portable Text */
  customDescription?: PortableTextBlock[];
  /** Project images */
  images?: Array<{
    _type?: string;
    asset: { url: string };
    alt?: string;
    title?: string;
  }>;
}

// ============================================================================
// PROJECT COMMENT
// ============================================================================

/**
 * Comment on a project
 */
export interface ProjectComment {
  /** Unique key for the comment */
  _key: string;
  /** Comment author name */
  author: string;
  /** Author email */
  email: string;
  /** Comment text content */
  commentContent: string;
  /** Comment creation date */
  createdAt: string;
  /** Whether comment is approved for display */
  isApproved: boolean;
}

// ============================================================================
// PROJECT
// ============================================================================

/**
 * Solar project
 */
export interface Project {
  /** Unique project ID */
  _id: string;
  /** Project title */
  title: string;
  /** Short excerpt/summary */
  excerpt?: string;
  /** Full description */
  description?: string;
  /** URL slug */
  slug: SanitySlug;
  /** Project category (e.g., "Mini-Grid", "Street Lighting") */
  category: string;
  /** Project completion/start date */
  projectDate?: string;
  /** Legacy content (Portable Text) - will be deprecated */
  content?: PortableTextBlock[];
  /** New structured content */
  projectContent?: ProjectContent;
  /** Project location (city/area) */
  location: string;
  /** Local Government Area */
  lga?: string;
  /** Nigerian state */
  state?: string;
  /** Main project image URL */
  projectImage: string;
  /** Sanity image references (for compatibility) */
  images?: SanityImage[];
  /** Gallery images extracted from content */
  galleryImages?: string[];
  /** Whether project is featured */
  isFeatured?: boolean;
  /** Featured ranking (lower = higher priority) */
  featuredRank?: number;
  /** Project impact metrics */
  impactMetrics?: ProjectImpactMetrics;
  /** Project comments */
  comments?: ProjectComment[];
  /** Creation timestamp */
  _createdAt: string;
  /** Last update timestamp */
  _updatedAt: string;
}
