/**
 * Type Definitions - Central Export
 *
 * This file re-exports all type definitions from domain-specific modules.
 * Import types from this file for convenience.
 *
 * @example
 * ```typescript
 * // Instead of:
 * import type { Project } from '@/lib/types/project.types';
 * import type { UpdatePost } from '@/lib/types/update.types';
 *
 * // Use:
 * import type { Project, UpdatePost } from '@/lib/types';
 * ```
 */

// ============================================================================
// SANITY TYPES
// ============================================================================

export type {
  SanityImage,
  SanityImageUrl,
  SanitySlug,
  SanityDocument,
} from './sanity.types';

// ============================================================================
// PROJECT TYPES
// ============================================================================

export type {
  ProjectImpactMetrics,
  ProjectContent,
  ProjectComment,
  Project,
} from './project.types';

// ============================================================================
// UPDATE/BLOG TYPES
// ============================================================================

export type { UpdatePost, BlogPost } from './update.types';

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export type {
  PanelSpecifications,
  BatterySpecifications,
  InverterSpecifications,
  ProductSpecifications,
  ProductCategory,
  ProductAvailability,
  ProductImage,
  Product,
} from './product.types';

// ============================================================================
// FORM TYPES
// ============================================================================

export type {
  ContactFormData,
  Comment,
  CommentFormData,
  NewsletterSubscriptionData,
  JobApplicationData,
  QuoteRequestData,
} from './form.types';

// ============================================================================
// API TYPES
// ============================================================================

export type {
  ApiResponse,
  PaginationInfo,
  PaginatedResponse,
  PaginatedUpdatesResponse,
  SanityApiResponse,
  ChatMessage,
  ChatResponse,
  AppError,
  AnalyticsEvent,
  WebVitalsMetric,
} from './api.types';

// ============================================================================
// COMPONENT TYPES
// ============================================================================

export type {
  HeroSlide,
  Service,
  Testimonial,
  Partner,
  TeamMember,
  Optional,
  RequiredFields,
} from './component.types';
