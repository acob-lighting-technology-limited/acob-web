import { useRouter } from 'next/navigation';

// Route mapping for easy navigation
export const ROUTE_MAP = {
  // Main pages
  home: '/',
  about: '/about',
  services: '/services',
  projects: '/projects',
  contact: '/contact',
  updates: '/updates',

  // About section
  'our story': '/about/our-story',
  mission: '/about/mission',
  vision: '/about/mission',
  team: '/about/team',
  certifications: '/about/certifications',

  // Services
  'mini grid': '/services/mini-grid-solutions',
  'mini-grid': '/services/mini-grid-solutions',
  'captive power': '/services/captive-power-solutions',
  'energy audit': '/services/professional-energy-audit',
  epc: '/services/engineering-procurement-construction',
  'engineering procurement': '/services/engineering-procurement-construction',
  streetlighting: '/services/streetlighting-infrastructure-project-development',
  'street lighting':
    '/services/streetlighting-infrastructure-project-development',

  // Contact section
  quote: '/contact/quote',
  'get quote': '/contact/quote',
  'request quote': '/contact/quote',
  locations: '/contact/locations',
  'office locations': '/contact/locations',
  support: '/contact/support',
  careers: '/contact/careers',
  jobs: '/contact/careers',

  // Updates section
  latest: '/updates/latest',
  'case studies': '/updates/case-studies',
  press: '/updates/press',
  gallery: '/updates/gallery',
  media: '/updates/media',
  pictures: '/updates/gallery',
  'picture side': '/updates/gallery',
} as const;

export type RouteKey = keyof typeof ROUTE_MAP;

// Function to find the best matching route based on user input
export function findMatchingRoute(userInput: string): string | null {
  const input = userInput.toLowerCase().trim();

  // Direct matches
  if (ROUTE_MAP[input as RouteKey]) {
    return ROUTE_MAP[input as RouteKey];
  }

  // Partial matches
  for (const [key, route] of Object.entries(ROUTE_MAP)) {
    if (input.includes(key) || key.includes(input)) {
      return route;
    }
  }

  // Common phrases
  if (
    input.includes('quote') ||
    input.includes('pricing') ||
    input.includes('cost')
  ) {
    return '/contact/quote';
  }

  if (input.includes('service') || input.includes('solution')) {
    return '/services';
  }

  if (
    input.includes('project') ||
    input.includes('work') ||
    input.includes('portfolio')
  ) {
    return '/projects';
  }

  if (
    input.includes('gallery') ||
    input.includes('picture') ||
    input.includes('media') ||
    input.includes('photo')
  ) {
    return '/updates/gallery';
  }

  if (
    input.includes('contact') ||
    input.includes('reach') ||
    input.includes('get in touch')
  ) {
    return '/contact';
  }

  if (
    input.includes('about') ||
    input.includes('company') ||
    input.includes('story')
  ) {
    return '/about';
  }

  if (
    input.includes('job') ||
    input.includes('career') ||
    input.includes('employment')
  ) {
    return '/contact/careers';
  }

  if (
    input.includes('support') ||
    input.includes('help') ||
    input.includes('assistance')
  ) {
    return '/contact/support';
  }

  if (
    input.includes('location') ||
    input.includes('office') ||
    input.includes('address')
  ) {
    return '/contact/locations';
  }

  return null;
}

// Function to extract navigation intent from AI response
export function extractNavigationIntent(response: string): string | null {
  const lowerResponse = response.toLowerCase();

  // Look for navigation patterns in the response
  if (
    lowerResponse.includes('navigate') ||
    lowerResponse.includes('visit') ||
    lowerResponse.includes('go to')
  ) {
    // Check for specific page mentions first
    if (
      lowerResponse.includes('quote') ||
      lowerResponse.includes('get quote')
    ) {
      return '/contact/quote';
    }
    if (lowerResponse.includes('service')) {
      return '/services';
    }
    if (lowerResponse.includes('project')) {
      return '/projects';
    }
    if (
      lowerResponse.includes('gallery') ||
      lowerResponse.includes('picture') ||
      lowerResponse.includes('media')
    ) {
      return '/updates/gallery';
    }
    if (lowerResponse.includes('support')) {
      return '/contact/support';
    }
    if (
      lowerResponse.includes('location') ||
      lowerResponse.includes('office')
    ) {
      return '/contact/locations';
    }
    if (lowerResponse.includes('career') || lowerResponse.includes('job')) {
      return '/contact/careers';
    }
    if (lowerResponse.includes('about')) {
      return '/about';
    }
    if (lowerResponse.includes('home')) {
      return '/';
    }

    // Fallback: Extract route from response
    for (const [key, route] of Object.entries(ROUTE_MAP)) {
      if (lowerResponse.includes(route) || lowerResponse.includes(key)) {
        return route;
      }
    }
  }

  return null;
}

// Hook for navigation (to be used in components)
export function useNavigation() {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const navigateToMatchingRoute = (userInput: string) => {
    const route = findMatchingRoute(userInput);
    if (route) {
      router.push(route);
      return true;
    }
    return false;
  };

  return {
    navigateTo,
    navigateToMatchingRoute,
    findMatchingRoute,
  };
}
