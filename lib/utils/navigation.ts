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
  announcements: '/updates/announcements',
  'case studies': '/updates/case-studies',
  'press releases': '/updates/press-releases',
  events: '/updates/events',
  celebrations: '/updates/celebrations',
  gallery: '/updates/gallery',
  media: '/updates/gallery',
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
    input.includes('case study') ||
    input.includes('case studies') ||
    input.includes('case-studies')
  ) {
    return '/updates/case-studies';
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
// Only extracts when there's an EXPLICIT navigation suggestion with the page name right after
export function extractNavigationIntent(response: string): string | null {
  // Extract the page name that comes right after navigation phrases
  // Pattern: "you can visit our [PAGE NAME] page"
  const patterns = [
    /you can visit (?:our |the )?([a-z\s-]+?) page/i,
    /check out (?:our |the )?([a-z\s-]+?) page/i,
    /visit (?:our |the )?([a-z\s-]+?) page/i,
    /navigate to (?:our |the )?([a-z\s-]+?) page/i,
    /go to (?:our |the )?([a-z\s-]+?) page/i,
  ];

  for (const pattern of patterns) {
    const match = response.match(pattern);
    if (match && match[1]) {
      const pageName = match[1].toLowerCase().trim();

      // Map page names to routes
      if (pageName.includes('about')) {
        return '/about';
      }
      if (pageName.includes('service')) {
        return '/services';
      }
      if (pageName.includes('project')) {
        return '/projects';
      }
      if (pageName.includes('contact')) {
        return '/contact';
      }
      if (pageName.includes('quote')) {
        return '/contact/quote';
      }
      if (pageName.includes('support')) {
        return '/contact/support';
      }
      if (pageName.includes('location') || pageName.includes('office')) {
        return '/contact/locations';
      }
      if (pageName.includes('career') || pageName.includes('job')) {
        return '/contact/careers';
      }
      if (pageName.includes('gallery') || pageName.includes('photo')) {
        return '/updates/gallery';
      }
      if (pageName.includes('case stud')) {
        return '/updates/case-studies';
      }
      if (pageName.includes('press')) {
        return '/updates/press';
      }
      if (pageName.includes('update')) {
        return '/updates';
      }
      if (pageName.includes('home')) {
        return '/';
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
