/* eslint-disable */
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock environment variables for testing
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test';
process.env.SANITY_API_TOKEN = 'test-token';
process.env.RESEND_API_KEY = 'test-resend-key';
process.env.GROQ_API_KEY = 'test-groq-key';
