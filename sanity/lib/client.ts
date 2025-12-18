/**
 * Sanity Client - Legacy Export (Deprecated)
 *
 * ⚠️ DEPRECATED: This file is maintained for backward compatibility only.
 *
 * Please update your imports to use the new modular structure:
 *
 * @example
 * ```typescript
 * // OLD (deprecated):
 * import { getProjects, getUpdatePosts } from '@/sanity/lib/client';
 *
 * // NEW (recommended):
 * import { getProjects, getUpdatePosts } from '@/sanity/lib/queries';
 * ```
 *
 * Benefits of the new structure:
 * - Better organization (queries grouped by domain)
 * - Smaller file sizes (easier to navigate)
 * - Comprehensive JSDoc documentation
 * - Type-safe with TypeScript
 * - Easier to test and maintain
 *
 * Migration guide: See RESTRUCTURING_PROGRESS.md
 */

// Re-export everything from the new queries module for backward compatibility
export * from './queries';

// Also export from config for utilities
export { urlFor, sanityConfig } from './config';
