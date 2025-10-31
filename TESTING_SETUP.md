# Testing Setup Instructions

This project now has a basic testing infrastructure configured using Jest and React Testing Library.

## Installation

To install the required testing dependencies, run:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## Configuration Files

The following configuration files have been created:

- `jest.config.js` - Jest configuration for Next.js
- `jest.setup.js` - Test environment setup and mocks
- `__tests__/example.test.tsx` - Example test file

## Running Tests

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Then run:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Example Component Test

```typescript
// components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Example API Route Test

```typescript
// app/api/chat/route.test.ts
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('/api/chat', () => {
  it('returns 400 for invalid request', async () => {
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: 'invalid' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

## Test Coverage Goals

Aim for the following test coverage:

- **Critical Paths**: 100% (API routes, form submissions, chat functionality)
- **Components**: 80%+ (UI components, sections)
- **Utilities**: 90%+ (Helper functions, utilities)
- **Overall**: 70%+ code coverage

## Priority Areas for Testing

1. **API Routes** (Critical)
   - `/api/chat` - AI chatbot functionality
   - `/api/send-email` - Email sending
   - `/api/projects` - Project data fetching

2. **Forms** (Critical)
   - Quote request form
   - Contact forms
   - Email validation

3. **Components** (High Priority)
   - ChatBot component
   - Header navigation
   - Form inputs

4. **Utilities** (High Priority)
   - Rate limiting
   - Error handling
   - Environment validation

## E2E Testing

For end-to-end testing, consider installing Playwright:

```bash
npm install --save-dev @playwright/test
```

Create `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

## CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
```

## Next Steps

1. Install the testing dependencies
2. Add test scripts to package.json
3. Write tests for critical API routes
4. Add component tests for key UI elements
5. Set up CI/CD pipeline
6. Aim for 70%+ code coverage

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Next.js Apps](https://nextjs.org/docs/testing)
- [Playwright Docs](https://playwright.dev/docs/intro)
