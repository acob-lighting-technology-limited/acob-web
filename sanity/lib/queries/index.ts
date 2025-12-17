/**
 * Sanity Queries - Central Export
 *
 * This file re-exports all Sanity query functions from domain-specific modules.
 * Import queries from this file to maintain backward compatibility and clean imports.
 *
 * @example
 * ```typescript
 * // Instead of:
 * import { getProjects } from '@/sanity/lib/queries/projects';
 * import { getUpdatePosts } from '@/sanity/lib/queries/updates';
 *
 * // Use:
 * import { getProjects, getUpdatePosts } from '@/sanity/lib/queries';
 * ```
 */

// ============================================================================
// RE-EXPORT CLIENT AND UTILITIES
// ============================================================================

export { client, clientForBrowser, urlFor, sanityConfig } from '../config';

// ============================================================================
// PROJECT QUERIES
// ============================================================================

export {
  getProjects,
  getProjectsPaginated,
  getProject,
  getFeaturedProjects,
  getProjectsByCategory,
  getRelatedProjects,
  getUniqueProjectStates,
  getRecentProjectImages,
  getProjectsForGallery,
} from './projects';

// ============================================================================
// UPDATE/BLOG POST QUERIES
// ============================================================================

export {
  getUpdatePosts,
  getUpdatePostsPaginated,
  getUpdatePost,
  getRelatedUpdatePosts,
} from './updates';

// ============================================================================
// PRODUCT QUERIES
// ============================================================================

export { getProducts, getFeaturedProductCount } from './products';

// ============================================================================
// JOB POSTING QUERIES
// ============================================================================

export { getJobPostings, getJobPosting, getActiveJobCount } from './jobs';

// ============================================================================
// COMMENT QUERIES
// ============================================================================

export { getApprovedCommentsForPost } from './comments';
