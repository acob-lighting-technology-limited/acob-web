# ACOB Website - Code Review & Restructuring Recommendations

**Date:** December 16, 2025  
**Reviewer:** AI Code Analysis  
**Project:** ACOB Lighting Technology Limited Website

---

## Executive Summary

This document provides a comprehensive review of the ACOB website codebase with recommendations for improving code organization, maintainability, and professional understanding. The project is well-structured overall but has several areas that could benefit from restructuring and documentation improvements.

**Overall Assessment:** ⭐⭐⭐⭐ (4/5)

- Strong foundation with Next.js 15 and TypeScript
- Good use of modern React patterns
- Some areas need better organization and documentation

---

## 🎯 Critical Issues (High Priority)

### 1. **Missing Architecture Documentation**

**Issue:** No architecture documentation exists to help new developers understand the system.

**Impact:** New team members will struggle to understand the codebase structure.

**Recommendation:**

- Create `ARCHITECTURE.md` documenting:
  - System architecture diagram
  - Data flow (Sanity CMS → Next.js → Client)
  - Component hierarchy
  - State management approach
  - API routes structure

**Example Structure:**

```markdown
# Architecture Overview

## Tech Stack

- Frontend: Next.js 15 (App Router)
- CMS: Sanity Studio
- Styling: Tailwind CSS
- Deployment: Vercel

## Data Flow

[Sanity CMS] → [Next.js Server] → [React Components] → [Browser]
```

---

### 2. **Inconsistent File Naming Conventions**

**Issue:** Mix of naming patterns across the project:

- `hero-section.tsx` (kebab-case)
- `HeroSection` (PascalCase component)
- `utils.ts` vs `image-optimization.ts`

**Current State:**

```
components/
  ├── sections/hero-section.tsx    ← kebab-case
  ├── ui/lightbox.tsx               ← kebab-case
  ├── job-application-form.tsx      ← kebab-case
lib/
  ├── utils.ts                      ← single word
  ├── utils/image-optimization.ts   ← kebab-case
```

**Recommendation:**
Standardize on **kebab-case** for all files:

- ✅ `hero-section.tsx`
- ✅ `image-optimization.ts`
- ✅ `api-error-handler.ts`

---

### 3. **Sanity Client File is Too Large**

**Issue:** `sanity/lib/client.ts` is 857 lines with 22 functions.

**Impact:** Difficult to maintain, test, and understand.

**Current Structure:**

```typescript
// sanity/lib/client.ts (857 lines!)
export function getUpdatePosts() { ... }
export function getUpdatePostsPaginated() { ... }
export function getUpdatePost() { ... }
export function getProjects() { ... }
export function getProjectsPaginated() { ... }
export function getProject() { ... }
export function getProducts() { ... }
// ... 15 more functions
```

**Recommended Restructure:**

```
sanity/
  ├── lib/
  │   ├── client.ts                 ← Base client config only
  │   ├── queries/
  │   │   ├── index.ts              ← Re-export all queries
  │   │   ├── projects.ts           ← Project-related queries
  │   │   ├── updates.ts            ← Update/blog queries
  │   │   ├── products.ts           ← Product queries
  │   │   └── jobs.ts               ← Job posting queries
  │   └── utils/
  │       ├── image-builder.ts      ← Image URL builder
  │       └── pagination.ts         ← Pagination helpers
```

**Example Split:**

```typescript
// sanity/lib/queries/projects.ts
import { client } from '../client';

export async function getProjects() { ... }
export async function getProjectsPaginated({ page, limit, search, state }) { ... }
export async function getProject(slug: string) { ... }
export async function getFeaturedProjects() { ... }
export async function getRelatedProjects(category, currentSlug, limit) { ... }
export async function getUniqueProjectStates() { ... }
```

---

## ⚠️ Important Issues (Medium Priority)

### 4. **Type Definitions Need Better Organization**

**Issue:** All types in single `lib/types.ts` file (323 lines).

**Current:**

```typescript
// lib/types.ts (323 lines)
export interface Project { ... }
export interface UpdatePost { ... }
export interface Product { ... }
export interface Service { ... }
export interface ContactFormData { ... }
// ... many more
```

**Recommended:**

```
lib/
  ├── types/
  │   ├── index.ts              ← Re-export all types
  │   ├── sanity.types.ts       ← Sanity-specific types
  │   ├── project.types.ts      ← Project-related types
  │   ├── product.types.ts      ← Product types
  │   ├── form.types.ts         ← Form data types
  │   ├── api.types.ts          ← API response types
  │   └── component.types.ts    ← Component prop types
```

---

### 5. **Utility Functions Lack Documentation**

**Issue:** 20 utility files in `lib/utils/` with minimal documentation.

**Example of Current State:**

```typescript
// lib/utils/image-optimization.ts
export type ImageQuality = 'thumbnail' | 'card' | 'hero' | 'lightbox' | 'full';

export function getOptimizedImageUrl(url: string, quality: ImageQuality) {
  // No JSDoc comments
  // No parameter descriptions
  // No usage examples
}
```

**Recommended:**

````typescript
/**
 * Generates an optimized image URL with appropriate quality settings
 *
 * @param url - The original Sanity image URL
 * @param quality - The quality preset to use
 * @returns Optimized image URL with quality parameters
 *
 * @example
 * ```typescript
 * const thumbnailUrl = getOptimizedImageUrl(imageUrl, 'thumbnail');
 * const heroUrl = getOptimizedImageUrl(imageUrl, 'hero');
 * ```
 */
export function getOptimizedImageUrl(
  url: string,
  quality: ImageQuality,
): string {
  // Implementation
}
````

---

### 6. **Data Files Should Use Constants**

**Issue:** 26 data files in `lib/data/` with hardcoded values.

**Current:**

```typescript
// lib/data/services-data.ts
export const services = [
  {
    id: '1',
    title: 'Solar Mini-Grids',
    description: 'Comprehensive solar mini-grid solutions...',
    // ... hardcoded data
  },
];
```

**Recommendation:**
Create a constants file for reusable values:

```typescript
// lib/constants/business.constants.ts
export const COMPANY_INFO = {
  name: 'ACOB Lighting Technology Limited',
  tagline: 'Lighting Up Nigeria with Advanced Solar Solutions',
  foundedYear: 2016,
  ceo: 'Mr. Alexander Chinedu Obiechina',
} as const;

export const CONTACT_INFO = {
  phone: {
    primary: '+234 704 920 2634',
    secondary: '+234 803 290 2825',
  },
  email: 'info@acoblighting.com',
  address: 'Plot 2, Block 14 Extension...',
} as const;

export const STATISTICS = {
  projectsCompleted: 120,
  totalCapacity: '10MW+',
  communitiesServed: 100,
  yearsExperience: 10,
} as const;
```

---

### 7. **Component Organization Needs Improvement**

**Issue:** 129 files in `components/` directory with unclear grouping.

**Current Structure:**

```
components/
  ├── ui/              ← 49 files (too many)
  ├── sections/        ← 9 files
  ├── layout/          ← 4 files
  ├── animations/      ← 3 files
  ├── business/        ← 3 files
  ├── features/        ← 9 files
  ├── products/        ← 5 files
  ├── services/        ← 1 file
  └── ... many more
```

**Recommended Structure:**

```
components/
  ├── common/                    ← Shared across entire app
  │   ├── buttons/
  │   ├── cards/
  │   ├── forms/
  │   └── modals/
  ├── features/                  ← Feature-specific components
  │   ├── projects/
  │   │   ├── project-card.tsx
  │   │   ├── project-gallery.tsx
  │   │   └── project-filters.tsx
  │   ├── products/
  │   ├── updates/
  │   └── jobs/
  ├── layout/                    ← Layout components
  │   ├── header/
  │   ├── footer/
  │   └── navigation/
  ├── sections/                  ← Page sections
  │   ├── hero/
  │   ├── about/
  │   └── services/
  └── ui/                        ← Base UI components (shadcn)
      ├── button.tsx
      ├── dialog.tsx
      └── ...
```

---

## 📝 Documentation Issues

### 8. **Missing Component Documentation**

**Issue:** Components lack prop documentation and usage examples.

**Current:**

```typescript
// components/ui/lightbox.tsx
interface LightboxProps {
  media: Array<{ src: string; alt: string; type?: MediaType }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({
  media,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  // 700 lines of code with no documentation
}
```

**Recommended:**

````typescript
/**
 * Lightbox Component
 *
 * A full-screen image and video viewer with zoom, pan, and navigation features.
 * Supports both images and videos with touch gestures on mobile devices.
 *
 * @component
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const [currentIndex, setCurrentIndex] = useState(0);
 *
 * <Lightbox
 *   media={[
 *     { src: '/image1.jpg', alt: 'Image 1', type: 'image' },
 *     { src: '/video.mp4', alt: 'Video', type: 'video' }
 *   ]}
 *   initialIndex={currentIndex}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
interface LightboxProps {
  /** Array of media items to display */
  media: Array<{
    /** Image or video URL */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Media type - auto-detected if not provided */
    type?: MediaType;
  }>;
  /** Index of the media item to show initially */
  initialIndex: number;
  /** Controls visibility of the lightbox */
  isOpen: boolean;
  /** Callback fired when lightbox is closed */
  onClose: () => void;
}
````

---

### 9. **API Routes Need Documentation**

**Issue:** API routes in `app/api/` lack documentation.

**Recommendation:**
Add OpenAPI/Swagger documentation or at least inline comments:

````typescript
/**
 * POST /api/contact
 *
 * Handles contact form submissions and sends email notifications.
 *
 * @route POST /api/contact
 * @body {ContactFormData} - Contact form data
 * @returns {ApiResponse} - Success or error response
 *
 * @example Request Body
 * ```json
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "phone": "+234 123 456 7890",
 *   "message": "I'm interested in solar solutions"
 * }
 * ```
 *
 * @example Success Response
 * ```json
 * {
 *   "success": true,
 *   "message": "Message sent successfully"
 * }
 * ```
 */
export async function POST(request: Request) {
  // Implementation
}
````

---

## 🔧 Code Quality Issues

### 10. **Inconsistent Error Handling**

**Issue:** Mix of error handling patterns across the codebase.

**Current State:**

```typescript
// Some places use try-catch
try {
  const data = await fetchData();
} catch (error) {
  console.error(error);
}

// Others return error objects
const { data, error } = await fetchData();
if (error) return { error };

// Some throw errors
if (!data) throw new Error('No data');
```

**Recommendation:**
Standardize on a consistent error handling pattern:

```typescript
// lib/utils/error-handler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown): ApiResponse {
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  return {
    success: false,
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
  };
}
```

---

### 11. **Magic Numbers and Strings**

**Issue:** Hardcoded values throughout the codebase.

**Examples:**

```typescript
// Hardcoded pagination
const limit = 12;

// Hardcoded revalidation
export const revalidate = 300;

// Hardcoded z-index
className = 'z-[9999]';

// Hardcoded timeouts
setTimeout(() => setSlideDirection(null), 500);
```

**Recommendation:**
Create constants:

```typescript
// lib/constants/app.constants.ts
export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

export const REVALIDATION = {
  STATIC_PAGES: 3600, // 1 hour
  DYNAMIC_PAGES: 300, // 5 minutes
  FREQUENTLY_UPDATED: 60, // 1 minute
} as const;

export const Z_INDEX = {
  MODAL: 9999,
  HEADER: 1000,
  DROPDOWN: 100,
} as const;

export const ANIMATION = {
  SLIDE_DURATION: 500,
  FADE_DURATION: 300,
} as const;
```

---

### 12. **Missing Input Validation**

**Issue:** Forms and API routes lack comprehensive validation.

**Current:**

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  // No validation before processing
  await sendEmail(body);
}
```

**Recommendation:**
Add validation using Zod or similar:

```typescript
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ContactFormSchema.parse(body);
    await sendEmail(validatedData);
    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400 },
      );
    }
    throw error;
  }
}
```

---

## 🎨 Best Practices Recommendations

### 13. **Add Storybook for Component Documentation**

**Recommendation:**
Set up Storybook to document and test components in isolation.

```bash
npx storybook@latest init
```

**Example Story:**

```typescript
// components/ui/lightbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox } from './lightbox';

const meta: Meta<typeof Lightbox> = {
  title: 'UI/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

export const Default: Story = {
  args: {
    media: [
      { src: '/images/project1.jpg', alt: 'Project 1', type: 'image' },
      { src: '/images/project2.jpg', alt: 'Project 2', type: 'image' },
    ],
    initialIndex: 0,
    isOpen: true,
    onClose: () => console.log('Closed'),
  },
};
```

---

### 14. **Implement Testing Strategy**

**Current State:** Jest is configured but no tests exist.

**Recommendation:**
Add tests for critical functionality:

```typescript
// components/ui/lightbox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from './lightbox';

describe('Lightbox', () => {
  const mockMedia = [
    { src: '/test.jpg', alt: 'Test Image', type: 'image' as const },
  ];

  it('renders when open', () => {
    render(
      <Lightbox
        media={mockMedia}
        initialIndex={0}
        isOpen={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(
      <Lightbox
        media={mockMedia}
        initialIndex={0}
        isOpen={true}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
```

---

### 15. **Add Code Comments for Complex Logic**

**Issue:** Complex logic in lightbox and other components lacks explanation.

**Example - Current:**

```typescript
const distanceRatio = distance / pinchStartDistance.current;
const newZoom = Math.max(1, Math.min(pinchStartZoom.current * scale, 5));
```

**Recommended:**

```typescript
// Calculate the ratio of current pinch distance to initial distance
// This gives us a scale factor (e.g., 2.0 means fingers are twice as far apart)
const distanceRatio = distance / pinchStartDistance.current;

// Apply the scale to the initial zoom level and clamp between 1x and 5x
// - Min 1x: Prevents zooming out beyond original size
// - Max 5x: Prevents excessive zoom that degrades image quality
const newZoom = Math.max(
  1, // Minimum zoom (original size)
  Math.min(pinchStartZoom.current * scale, 5), // Maximum zoom (5x)
);
```

---

## 📊 Performance Recommendations

### 16. **Implement Code Splitting**

**Current:** Some dynamic imports, but could be improved.

**Recommendation:**

```typescript
// Instead of importing everything
import { HeroSection } from '@/components/sections/hero-section';

// Use dynamic imports for heavy components
const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then(mod => mod.HeroSection),
  {
    loading: () => <HeroSkeleton />,
    ssr: true
  }
);
```

---

### 17. **Add Performance Monitoring**

**Recommendation:**
Create a performance monitoring utility:

```typescript
// lib/utils/performance.ts
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start}ms`);
}

export function logWebVitals(metric: WebVitalsMetric) {
  // Send to analytics
  if (process.env.NODE_ENV === 'production') {
    // Send to your analytics service
  }
}
```

---

## 🔐 Security Recommendations

### 18. **Environment Variable Validation**

**Current:** Environment variables used without validation.

**Recommendation:**

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  GROQ_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

---

### 19. **Add Rate Limiting Documentation**

**Current:** Rate limiting exists but not documented.

**Recommendation:**
Document rate limiting strategy in README:

```markdown
## API Rate Limiting

All API endpoints are rate-limited to prevent abuse:

- Contact form: 5 requests per hour per IP
- Chat API: 20 messages per hour per session
- Search API: 100 requests per hour per IP

Rate limit headers:

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)
```

---

## 📋 Action Plan

### Immediate Actions (Week 1)

1. ✅ Create `ARCHITECTURE.md` documentation
2. ✅ Create `CONTRIBUTING.md` with coding standards
3. ✅ Add JSDoc comments to all utility functions
4. ✅ Create constants files for magic numbers/strings

### Short-term (Month 1)

1. 📁 Restructure `sanity/lib/client.ts` into separate query files
2. 📁 Reorganize `lib/types.ts` into domain-specific type files
3. 📁 Reorganize components directory by feature
4. 📝 Add component documentation with examples

### Medium-term (Month 2-3)

1. 🧪 Set up Storybook for component documentation
2. 🧪 Add unit tests for critical components
3. 🧪 Add integration tests for API routes
4. 📊 Implement performance monitoring

### Long-term (Month 4+)

1. 🔄 Implement comprehensive error handling strategy
2. 🔄 Add input validation across all forms and APIs
3. 🔄 Create automated documentation generation
4. 🔄 Set up CI/CD pipeline with automated testing

---

## 📚 Recommended Documentation Structure

```
ACOB-Website/
├── README.md                    ← Project overview (exists ✅)
├── ARCHITECTURE.md              ← System architecture (create)
├── CONTRIBUTING.md              ← Contribution guidelines (create)
├── CODE_REVIEW.md              ← This document ✅
├── docs/
│   ├── api/
│   │   ├── README.md           ← API documentation
│   │   ├── contact.md          ← Contact API
│   │   ├── chat.md             ← Chat API
│   │   └── projects.md         ← Projects API
│   ├── components/
│   │   ├── README.md           ← Component guide
│   │   ├── ui-components.md    ← UI components
│   │   └── sections.md         ← Page sections
│   ├── deployment/
│   │   ├── README.md           ← Deployment guide
│   │   ├── vercel.md           ← Vercel deployment
│   │   └── sanity.md           ← Sanity deployment
│   └── development/
│       ├── setup.md            ← Development setup
│       ├── testing.md          ← Testing guide
│       └── troubleshooting.md  ← Common issues
└── .storybook/                 ← Storybook config (create)
```

---

## ✅ What's Already Good

The project has several strengths:

1. ✅ **Modern Tech Stack** - Next.js 15, TypeScript, Tailwind CSS
2. ✅ **Good README** - Comprehensive project documentation
3. ✅ **Type Safety** - Strong TypeScript usage
4. ✅ **Code Quality Tools** - ESLint, Prettier, Husky configured
5. ✅ **Conventional Commits** - Commit message standards in place
6. ✅ **Performance** - Dynamic imports and image optimization
7. ✅ **SEO** - Proper metadata and sitemap generation
8. ✅ **Accessibility** - Semantic HTML and ARIA labels

---

## 🎓 Learning Resources for Team

Recommended resources for understanding the codebase:

1. **Next.js App Router**: https://nextjs.org/docs/app
2. **Sanity CMS**: https://www.sanity.io/docs
3. **TypeScript Best Practices**: https://typescript-eslint.io/
4. **React Patterns**: https://patterns.dev/
5. **Testing Library**: https://testing-library.com/

---

## 📞 Questions for Discussion

1. **Team Size**: How many developers will work on this? (Affects complexity of structure)
2. **Testing Priority**: What's the priority for testing? (Unit, Integration, E2E)
3. **Documentation**: Prefer inline comments or separate docs?
4. **Deployment**: Any CI/CD pipeline requirements?
5. **Monitoring**: What analytics/monitoring tools are preferred?

---

## Conclusion

The ACOB website is a solid project with good foundations. The main areas for improvement are:

1. **Better organization** of large files (Sanity client, types)
2. **More documentation** for components and APIs
3. **Consistent patterns** for error handling and validation
4. **Testing infrastructure** to ensure reliability

Implementing these recommendations will make the codebase more maintainable and easier for new developers to understand.

---

**Next Steps:**

1. Review this document with the team
2. Prioritize recommendations based on business needs
3. Create tickets/issues for each action item
4. Assign owners and timelines
5. Start with quick wins (documentation, constants)

---

_Generated: December 16, 2025_
_For: ACOB Lighting Technology Limited_
