/**
 * Intent Detection for Chatbot Queries
 * Analyzes user messages to determine what type of information to fetch from Sanity
 */

export interface ChatIntent {
  type: 'projects' | 'updates' | 'products' | 'jobs' | 'general';
  filters?: {
    state?: string;
    category?: string;
    search?: string;
  };
  confidence: number;
}

// Nigerian states for location detection
const NIGERIAN_STATES = [
  'abia',
  'adamawa',
  'akwa ibom',
  'anambra',
  'bauchi',
  'bayelsa',
  'benue',
  'borno',
  'cross river',
  'delta',
  'ebonyi',
  'edo',
  'ekiti',
  'enugu',
  'gombe',
  'imo',
  'jigawa',
  'kaduna',
  'kano',
  'katsina',
  'kebbi',
  'kogi',
  'kwara',
  'lagos',
  'nasarawa',
  'niger',
  'ogun',
  'ondo',
  'osun',
  'oyo',
  'plateau',
  'rivers',
  'sokoto',
  'taraba',
  'yobe',
  'zamfara',
  'fct',
  'abuja',
];

// Project-related keywords
const PROJECT_KEYWORDS = [
  'project',
  'installation',
  'mini-grid',
  'mini grid',
  'minigrid',
  'solar installation',
  'completed project',
  'streetlight',
  'street light',
  'hybrid system',
  'solar farm',
  'power plant',
  'electrification',
  'deployment',
  'infrastructure',
];

// Update/News-related keywords
const UPDATE_KEYWORDS = [
  'update',
  'news',
  'latest',
  'recent',
  'announcement',
  'blog',
  'article',
  'post',
  'press release',
  'media',
  "what's new",
  'happening',
];

// Product-related keywords
const PRODUCT_KEYWORDS = [
  'product',
  'panel',
  'solar panel',
  'battery',
  'inverter',
  'equipment',
  'buy',
  'purchase',
  'price',
  'cost',
  'specification',
  'spec',
  'watt',
  'kw',
  'kwp',
];

// Job-related keywords
const JOB_KEYWORDS = [
  'job',
  'career',
  'hiring',
  'vacancy',
  'position',
  'employment',
  'work',
  'apply',
  'opportunity',
  'opening',
  'recruit',
];

/**
 * Detect user intent from message
 */
export function detectIntent(message: string): ChatIntent {
  const lowerMessage = message.toLowerCase();

  // Check for projects
  if (
    PROJECT_KEYWORDS.some(keyword => lowerMessage.includes(keyword)) ||
    /where (have you|did you|are you) (work|install|deploy)/i.test(message)
  ) {
    return {
      type: 'projects',
      filters: extractProjectFilters(lowerMessage),
      confidence: 0.9,
    };
  }

  // Check for updates/news
  if (UPDATE_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    return {
      type: 'updates',
      confidence: 0.85,
    };
  }

  // Check for products
  if (PRODUCT_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    return {
      type: 'products',
      filters: extractProductFilters(lowerMessage),
      confidence: 0.85,
    };
  }

  // Check for jobs/careers
  if (JOB_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    return {
      type: 'jobs',
      confidence: 0.9,
    };
  }

  // Default to general
  return {
    type: 'general',
    confidence: 0.5,
  };
}

/**
 * Extract project-specific filters from message
 */
function extractProjectFilters(message: string): {
  state?: string;
  category?: string;
  search?: string;
} {
  const filters: { state?: string; category?: string; search?: string } = {};

  // Extract state
  const detectedState = NIGERIAN_STATES.find(state => message.includes(state));
  if (detectedState) {
    // Capitalize first letter of each word
    filters.state = detectedState
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Extract category hints
  if (/mini-?grid/i.test(message)) {
    filters.category = 'Mini-Grid';
  } else if (/street\s?light/i.test(message)) {
    filters.category = 'Street Lighting';
  } else if (/hospital|health/i.test(message)) {
    filters.category = 'Healthcare';
  } else if (/commercial|business|bank/i.test(message)) {
    filters.category = 'Commercial & Industrial';
  } else if (/agric|farm/i.test(message)) {
    filters.category = 'Agriculture';
  }

  return filters;
}

/**
 * Extract product-specific filters from message
 */
function extractProductFilters(message: string): {
  category?: string;
  search?: string;
} {
  const filters: { category?: string; search?: string } = {};

  // Extract product category
  if (/panel/i.test(message)) {
    filters.category = 'Solar Panels';
  } else if (/battery|batteries/i.test(message)) {
    filters.category = 'Batteries';
  } else if (/inverter/i.test(message)) {
    filters.category = 'Inverters';
  }

  return filters;
}

/**
 * Check if message needs Sanity data
 */
export function shouldFetchSanityData(intent: ChatIntent): boolean {
  return intent.type !== 'general' && intent.confidence > 0.7;
}
