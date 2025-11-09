import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges Tailwind CSS classes intelligently
 *
 * Uses clsx for conditional class joining and tailwind-merge to handle
 * conflicting Tailwind classes (keeps the last one).
 *
 * @param inputs - Class names, objects, or arrays to merge
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4' (px-4 overrides px-2)
 *
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', 'other-class')
 *
 * // With objects
 * cn('base', { 'active': isActive, 'disabled': isDisabled })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts plain text from Sanity Portable Text blocks for search indexing and previews
 *
 * Recursively processes Portable Text block arrays and extracts text content from all text nodes.
 * Ignores images, code blocks, and other non-text content.
 * Useful for generating search-friendly content and creating plain text excerpts.
 *
 * @param content - Array of Portable Text blocks from Sanity CMS
 * @returns Plain text string with spaces between blocks
 *
 * @example
 * ```typescript
 * const blocks = await sanityClient.fetch('*[_type == "post"][0].content');
 * const plainText = extractTextFromPortableText(blocks);
 * console.log(plainText); // "First paragraph Second paragraph"
 * ```
 */
export function extractTextFromPortableText(content: unknown[]): string {
  if (!Array.isArray(content)) {
    return '';
  }

  return (
    content as Array<{ _type?: string; children?: Array<{ text?: string }> }>
  )
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children.map(child => child.text || '').join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}

/**
 * Formats ISO date strings consistently across server and client components
 *
 * Converts ISO 8601 date strings to human-readable format.
 * Uses consistent locale (en-US) to avoid hydration mismatches.
 *
 * @param dateString - ISO 8601 date string (e.g., "2024-01-15T10:30:00Z")
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 *
 * @example
 * ```typescript
 * const formatted = formatDate("2024-01-15T10:30:00Z");
 * console.log(formatted); // "Jan 15, 2024"
 * ```
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
