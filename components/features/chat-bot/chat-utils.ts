import DOMPurify from 'isomorphic-dompurify';

/**
 * Formats message content with markdown-like syntax and sanitizes HTML
 *
 * @param content - Raw message content
 * @returns Sanitized HTML string
 */
export function formatMessage(content: string): string {
  if (!content) {
    return content;
  }

  let formatted = content.replace(/\/>/g, '');

  formatted = formatted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  formatted = formatted.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );

  formatted = formatted.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<a href="mailto:$1" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );

  formatted = formatted.replace(
    /(\d{4}\s?\d{3}\s?\d{4})/g,
    '<a href="tel:$1" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );

  formatted = formatted.replace(/\n/g, '<br />');
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['a', 'br', 'strong', 'em'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}

/**
 * Gets current time in 12-hour format
 *
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function getCurrentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Gets user-friendly page name from route
 *
 * @param route - Page route path
 * @returns Human-readable page name
 */
export function getPageName(route: string): string {
  const pageNames: Record<string, string> = {
    '/': 'Home',
    '/contact/quote': 'Get Quote Page',
    '/services': 'Services Page',
    '/projects': 'Projects Page',
    '/contact/support': 'Support Page',
    '/contact/locations': 'Office Locations',
    '/contact/careers': 'Careers Page',
    '/about': 'About Us Page',
    '/updates/gallery': 'Gallery Page',
    '/updates/case-studies': 'Case Studies Page',
  };

  return (
    pageNames[route] || route.split('/').pop()?.replace(/-/g, ' ') || route
  );
}
