/**
 * Animation constants for consistent transitions throughout the application
 */

export const ANIMATION = {
  // Duration constants
  duration: {
    fast: 'duration-200',
    normal: 'duration-300',
    slow: 'duration-500',
    slower: 'duration-700',
  },

  // Transition types
  transition: {
    all: 'transition-all',
    colors: 'transition-colors',
    transform: 'transition-transform',
    opacity: 'transition-opacity',
    shadow: 'transition-shadow',
  },

  // Common combinations
  card: {
    hover: 'transition-all duration-500 hover:-translate-y-1 hover:shadow-lg',
    colors: 'transition-colors duration-500',
  },

  button: {
    default: 'transition-colors duration-200',
  },

  link: {
    default: 'transition-colors duration-500',
  },

  image: {
    scale: 'transition-transform duration-500 group-hover:scale-105',
  },

  arrow: {
    translateX: 'transition-transform duration-500 group-hover:translate-x-1',
    translateXNeg:
      'transition-transform duration-500 group-hover:-translate-x-1',
  },
} as const;

// Easing functions
export const EASING = {
  default: 'ease-in-out',
  in: 'ease-in',
  out: 'ease-out',
  linear: 'linear',
} as const;
