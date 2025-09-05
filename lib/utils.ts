import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extract plain text from Portable Text content
 * @param content - Portable Text content array
 * @returns Plain text string
 */
export function extractTextFromPortableText(content: unknown[]): string {
  if (!Array.isArray(content)) return '';
  
  return content
    .map((block: any) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}

/**
 * Format date consistently across server and client
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
