/**
 * Centralized spacing constants for consistent UI
 * These replace hardcoded values like "p-4 sm:p-6 xl:p-8"
 */

export const SPACING = {
  // Card padding patterns
  card: {
    sm: 'p-3',
    default: 'p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-4 sm:p-6 xl:p-8',
  },

  // Section spacing
  section: {
    xs: 'mb-8',
    sm: 'mb-10',
    default: 'mb-12',
    md: 'mb-16',
    lg: 'mb-20',
  },

  // Gap patterns for grids
  grid: {
    xs: 'gap-3',
    sm: 'gap-4',
    default: 'gap-6',
    md: 'gap-8',
    lg: 'gap-10',
  },

  // Container padding
  container: {
    default: 'px-4 py-8',
    md: 'px-6 py-10',
    lg: 'px-8 py-12',
  },
} as const;

// Helper function to get spacing value
export function getSpacing(
  type: keyof typeof SPACING,
  variant: string = 'default',
): string {
  const spacingGroup = SPACING[type];
  return (
    (spacingGroup as Record<string, string>)[variant] ||
    (spacingGroup as Record<string, string>).default
  );
}
