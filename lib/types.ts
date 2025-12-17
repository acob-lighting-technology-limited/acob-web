/**
 * Type Definitions - Legacy Export (Deprecated)
 *
 * ⚠️ DEPRECATED: This file is maintained for backward compatibility only.
 *
 * Please update your imports to use the new modular structure:
 *
 * @example
 * ```typescript
 * // OLD (deprecated):
 * import type { Project, UpdatePost } from '@/lib/types';
 *
 * // NEW (recommended):
 * import type { Project, UpdatePost } from '@/lib/types';
 * // OR for specific domains:
 * import type { Project } from '@/lib/types/project.types';
 * import type { UpdatePost } from '@/lib/types/update.types';
 * ```
 *
 * Benefits of the new structure:
 * - Better organization (types grouped by domain)
 * - Smaller file sizes (easier to navigate)
 * - Comprehensive JSDoc documentation
 * - Type-safe with TypeScript
 * - Easier to find specific types
 *
 * Migration guide: See RESTRUCTURING_PROGRESS.md
 */

// Re-export everything from the new types modules for backward compatibility
export * from './types';

// Also export Portable Text types for convenience
export type { PortableTextBlock } from '@portabletext/types';
