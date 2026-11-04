// Consistent date formatting functions to prevent hydration mismatch

// Every visitor and every server render sees the same calendar day: dates are
// pinned to Nigeria's time zone rather than the runtime's (UTC on Vercel, the
// visitor's own zone in the browser), which also keeps hydration in step.
export const SITE_TIME_ZONE = 'Africa/Lagos';

const numericDate = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: SITE_TIME_ZONE,
});

const numericTime = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: SITE_TIME_ZONE,
});

const readableDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: SITE_TIME_ZONE,
});

/**
 * Format date in DD/MM/YYYY format (consistent across server and client)
 */
export function formatDate(dateString: string): string {
  return numericDate.format(new Date(dateString));
}

/**
 * Format date with time in DD/MM/YYYY HH:MM format
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return `${numericDate.format(date)} ${numericTime.format(date)}`;
}

/**
 * Format date as e.g. "5 Mar 2026" (consistent across server and client)
 */
export function formatReadableDate(dateString: string): string {
  return readableDate.format(new Date(dateString));
}

/**
 * Get relative time (e.g., "2 days ago", "1 week ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Today';
  }
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  }
  if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} months ago`;
  }
  return `${Math.floor(diffInDays / 365)} years ago`;
}

/**
 * Format current date for "Last updated" sections
 */
export function getCurrentDate(): string {
  return formatDate(new Date().toISOString());
}

/**
 * Check if an application deadline is still active (inclusive of the deadline date until 23:59:59 UTC)
 */
export function isDeadlineActive(deadlineDateString?: string | null): boolean {
  if (!deadlineDateString) {
    return true;
  }
  const deadline = new Date(`${deadlineDateString.slice(0, 10)}T23:59:59Z`);
  return !isNaN(deadline.getTime()) && deadline.getTime() >= Date.now();
}

/**
 * Check if an application deadline has passed
 */
export function isDeadlinePassed(deadlineDateString?: string | null): boolean {
  if (!deadlineDateString) {
    return false;
  }
  return !isDeadlineActive(deadlineDateString);
}
