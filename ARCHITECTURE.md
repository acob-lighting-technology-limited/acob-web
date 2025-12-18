# ACOB Website - System Architecture

**Version:** 1.0  
**Last Updated:** December 16, 2025  
**Project:** ACOB Lighting Technology Limited Website

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Data Flow](#data-flow)
5. [Directory Structure](#directory-structure)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Architecture](#api-architecture)
9. [Content Management](#content-management)
10. [Deployment Architecture](#deployment-architecture)
11. [Performance Strategy](#performance-strategy)
12. [Security Architecture](#security-architecture)

---

## Overview

The ACOB website is a modern, server-rendered web application built with Next.js 15 (App Router) and integrated with Sanity CMS for content management. The application serves as the primary digital presence for ACOB Lighting Technology Limited, showcasing solar energy projects, products, and company information.

### Key Characteristics

- **Server-Side Rendering (SSR)**: Pages are rendered on the server for optimal SEO and performance
- **Static Generation (SSG)**: Static pages are pre-rendered at build time where possible
- **Incremental Static Regeneration (ISR)**: Content updates automatically without full rebuilds
- **Headless CMS**: Content managed through Sanity Studio
- **Type-Safe**: Full TypeScript implementation
- **Responsive**: Mobile-first design approach

---

## Technology Stack

### Frontend

| Technology        | Version | Purpose                         |
| ----------------- | ------- | ------------------------------- |
| **Next.js**       | 15.5.7  | React framework with App Router |
| **React**         | 19.1.1  | UI library                      |
| **TypeScript**    | 5.x     | Type safety                     |
| **Tailwind CSS**  | 3.4.17  | Styling framework               |
| **Framer Motion** | 12.23.6 | Animations                      |
| **Radix UI**      | Latest  | Accessible UI primitives        |
| **Lucide React**  | 0.525.0 | Icon library                    |

### Backend & CMS

| Technology             | Version | Purpose          |
| ---------------------- | ------- | ---------------- |
| **Sanity CMS**         | 4.2.0   | Headless CMS     |
| **Sanity Client**      | 7.7.0   | Data fetching    |
| **Next.js API Routes** | 15.5.7  | Server endpoints |
| **Resend**             | 4.7.0   | Email service    |

### AI & Chat

| Technology        | Version | Purpose         |
| ----------------- | ------- | --------------- |
| **Vercel AI SDK** | 4.3.19  | AI integration  |
| **Groq**          | 1.2.9   | LLM provider    |
| **OpenAI**        | 1.3.23  | Alternative LLM |

### Development Tools

| Technology     | Version | Purpose                |
| -------------- | ------- | ---------------------- |
| **ESLint**     | 9.32.0  | Code linting           |
| **Prettier**   | 3.6.2   | Code formatting        |
| **Husky**      | 9.1.7   | Git hooks              |
| **Commitlint** | 19.8.1  | Commit message linting |
| **Jest**       | Latest  | Testing framework      |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Desktop    │  │    Tablet    │  │       Mobile         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL EDGE NETWORK                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              CDN (Static Assets & Images)                │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS APPLICATION                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   App Router (RSC)                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │  Pages   │  │ Layouts  │  │   API    │            │   │
│  │  │  (SSR)   │  │  (RSC)   │  │  Routes  │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘            │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React Server Components                    │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │ Sections │  │Components│  │   UI     │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘            │   │
│  └─────────────────────────────────────────────────────────┘   │
└───────────────┬───────────────────────┬─────────────────────────┘
                │                       │
                │                       │
                ▼                       ▼
┌───────────────────────────┐  ┌────────────────────────────┐
│      SANITY CMS           │  │   EXTERNAL SERVICES        │
│  ┌─────────────────────┐  │  │  ┌──────────────────────┐  │
│  │  Content Lake       │  │  │  │  Resend (Email)      │  │
│  │  - Projects         │  │  │  │  Groq/OpenAI (AI)    │  │
│  │  - Updates          │  │  │  │  Vercel Analytics    │  │
│  │  - Products         │  │  │  └──────────────────────┘  │
│  │  - Jobs             │  │  └────────────────────────────┘
│  └─────────────────────┘  │
│  ┌─────────────────────┐  │
│  │  Sanity Studio      │  │
│  │  (CMS Interface)    │  │
│  └─────────────────────┘  │
└───────────────────────────┘
```

---

## Data Flow

### 1. Page Request Flow (SSR/SSG)

```
User Request
    │
    ▼
Next.js Server
    │
    ├─→ Check Cache (ISR)
    │   └─→ Return Cached (if valid)
    │
    ├─→ Fetch from Sanity
    │   │
    │   ├─→ Execute GROQ Query
    │   ├─→ Transform Data
    │   └─→ Return JSON
    │
    ├─→ Render React Components
    │   │
    │   ├─→ Server Components (RSC)
    │   └─→ Client Components (Hydration)
    │
    └─→ Return HTML + JSON
        │
        ▼
    Browser Renders
        │
        ├─→ Display Content
        ├─→ Hydrate Interactive Components
        └─→ Load Client-side Features
```

### 2. Content Update Flow

```
Content Editor
    │
    ▼
Sanity Studio
    │
    ├─→ Edit Content
    ├─→ Upload Images
    └─→ Publish Changes
        │
        ▼
Sanity Content Lake
    │
    ├─→ Store Content
    ├─→ Process Images (CDN)
    └─→ Trigger Webhook (optional)
        │
        ▼
Next.js Application
    │
    ├─→ ISR Revalidation (automatic)
    │   └─→ Rebuild affected pages
    │
    └─→ On-Demand Revalidation (manual)
        └─→ Immediate update
```

### 3. API Request Flow

```
Client Request
    │
    ▼
API Route (/app/api/*)
    │
    ├─→ Validate Input
    ├─→ Rate Limiting Check
    ├─→ Process Request
    │   │
    │   ├─→ Contact Form → Resend Email
    │   ├─→ Chat → Groq/OpenAI API
    │   └─→ Data Query → Sanity Client
    │
    ├─→ Format Response
    └─→ Return JSON
        │
        ▼
    Client Receives Data
```

---

## Directory Structure

```
ACOB-Website/
│
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── about/                # About pages
│   │   ├── projects/             # Projects pages
│   │   │   ├── page.tsx          # Projects list
│   │   │   └── [slug]/           # Dynamic project page
│   │   │       └── page.tsx
│   │   ├── services/             # Services pages
│   │   ├── products/             # Products pages
│   │   ├── updates/              # Blog/updates pages
│   │   ├── contact/              # Contact page
│   │   └── ...                   # Other routes
│   │
│   ├── api/                      # API Routes
│   │   ├── contact/              # Contact form endpoint
│   │   ├── chat/                 # AI chat endpoint
│   │   ├── revalidate/           # On-demand revalidation
│   │   └── ...                   # Other endpoints
│   │
│   ├── studio/                   # Sanity Studio
│   │   └── [[...index]]/         # Catch-all route
│   │
│   ├── globals.css               # Global styles
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   └── loading.tsx               # Loading state
│
├── components/                   # React Components
│   ├── ui/                       # Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── lightbox.tsx
│   │   └── ...
│   │
│   ├── sections/                 # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── services-section.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── header/
│   │   ├── footer/
│   │   └── navigation/
│   │
│   ├── features/                 # Feature-specific components
│   │   ├── projects/
│   │   ├── products/
│   │   └── updates/
│   │
│   └── providers/                # Context providers
│       ├── theme-provider.tsx
│       └── ...
│
├── lib/                          # Utilities & Helpers
│   ├── types.ts                  # TypeScript types
│   ├── utils.ts                  # Utility functions
│   ├── constants.ts              # App constants
│   │
│   ├── utils/                    # Utility modules
│   │   ├── image-optimization.ts
│   │   ├── date.ts
│   │   ├── navigation.ts
│   │   └── ...
│   │
│   └── data/                     # Static data
│       ├── services-data.ts
│       ├── testimonials-data.ts
│       └── ...
│
├── sanity/                       # Sanity CMS Configuration
│   ├── lib/
│   │   ├── client.ts             # Sanity client setup
│   │   └── queries.ts            # GROQ queries
│   │
│   ├── schemaTypes/              # Content schemas
│   │   ├── project.ts
│   │   ├── updatePost.ts
│   │   ├── product.ts
│   │   └── ...
│   │
│   └── structure.ts              # Studio structure
│
├── public/                       # Static assets
│   ├── images/                   # Images
│   ├── icons/                    # Icons & favicons
│   └── ...
│
├── styles/                       # Additional styles
│   └── globals.css
│
├── hooks/                        # Custom React hooks
│   ├── use-scroll.ts
│   ├── use-media-query.ts
│   └── ...
│
├── .github/                      # GitHub configuration
├── .husky/                       # Git hooks
├── scripts/                      # Build/utility scripts
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── sanity.config.ts              # Sanity configuration
├── package.json                  # Dependencies
└── README.md                     # Documentation
```

---

## Component Architecture

### Component Hierarchy

```
App
├── RootLayout
│   ├── ThemeProvider
│   ├── Header
│   │   ├── Navigation
│   │   │   ├── DesktopNav
│   │   │   └── MobileNav
│   │   └── Logo
│   │
│   ├── Page Content (varies by route)
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── ServicesSection
│   │   ├── ProjectsSection
│   │   │   └── ProjectCard[]
│   │   ├── UpdatesSection
│   │   │   └── UpdateCard[]
│   │   └── ...
│   │
│   └── Footer
│       ├── FooterLinks
│       ├── SocialLinks
│       └── Copyright
│
└── Providers
    ├── ThemeProvider
    └── AnalyticsProvider
```

### Component Types

#### 1. Server Components (Default)

- **Location**: Most components in `app/` and `components/sections/`
- **Purpose**: Fetch data, render on server
- **Examples**: `HeroSection`, `ProjectsSection`, `AboutSection`

```typescript
// Server Component Example
export default async function ProjectsSection() {
  const projects = await getProjects(); // Server-side data fetching

  return (
    <section>
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </section>
  );
}
```

#### 2. Client Components

- **Location**: Interactive components in `components/ui/`
- **Purpose**: Handle user interactions, state
- **Examples**: `Lightbox`, `ChatBot`, `ContactForm`

```typescript
'use client';

// Client Component Example
export function Lightbox({ media, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Interactive UI */}
    </Dialog>
  );
}
```

#### 3. Shared Components

- **Location**: `components/ui/` (shadcn components)
- **Purpose**: Reusable UI primitives
- **Examples**: `Button`, `Dialog`, `Card`

---

## State Management

### State Management Strategy

The application uses a **minimal state management** approach:

1. **Server State**: Managed by Next.js and Sanity
2. **URL State**: Search params, filters
3. **Local State**: React `useState` for component-specific state
4. **Global State**: React Context for theme, user preferences

### State Flow

```
┌─────────────────────────────────────────────────┐
│           SERVER STATE (Sanity CMS)             │
│  - Projects, Updates, Products, Jobs            │
│  - Fetched via GROQ queries                     │
│  - Cached with ISR                              │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│         REACT SERVER COMPONENTS                 │
│  - Receive data as props                        │
│  - No client-side state                         │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│         CLIENT COMPONENTS                       │
│  - Local state (useState)                       │
│  - Form state (react-hook-form)                 │
│  - UI state (modals, dropdowns)                 │
└─────────────────────────────────────────────────┘
```

### Context Providers

```typescript
// Theme Provider
<ThemeProvider>
  {/* App content */}
</ThemeProvider>

// Usage in components
const { theme, setTheme } = useTheme();
```

---

## API Architecture

### API Routes Structure

```
app/api/
├── contact/
│   └── route.ts              # POST /api/contact
├── chat/
│   └── route.ts              # POST /api/chat
├── revalidate/
│   └── route.ts              # POST /api/revalidate
├── subscribe/
│   └── route.ts              # POST /api/subscribe
└── job-application/
    └── route.ts              # POST /api/job-application
```

### API Request/Response Pattern

```typescript
// Standard API Route Pattern
export async function POST(request: Request) {
  try {
    // 1. Parse and validate input
    const body = await request.json();

    // 2. Rate limiting check
    const rateLimitResult = await checkRateLimit(request);
    if (!rateLimitResult.success) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 3. Process request
    const result = await processRequest(body);

    // 4. Return response
    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    // 5. Error handling
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## Content Management

### Sanity CMS Architecture

```
Sanity Studio
    │
    ├── Content Types (Schemas)
    │   ├── Project
    │   │   ├── title, slug, category
    │   │   ├── description, content
    │   │   ├── images, location
    │   │   └── impactMetrics
    │   │
    │   ├── UpdatePost
    │   │   ├── title, slug, excerpt
    │   │   ├── content (Portable Text)
    │   │   ├── author, category
    │   │   └── featuredImage
    │   │
    │   ├── Product
    │   │   ├── title, sku, category
    │   │   ├── description, specifications
    │   │   └── images, availability
    │   │
    │   └── JobPosting
    │       ├── title, department
    │       ├── description, requirements
    │       └── location, type
    │
    └── Studio Configuration
        ├── Structure (sidebar organization)
        ├── Plugins (orderable lists, etc.)
        └── Workflows (draft/publish)
```

### Data Fetching Pattern

```typescript
// 1. Define GROQ query
const query = `*[_type == "project"] {
  _id,
  title,
  slug,
  category,
  "projectImage": projectImage.asset->url,
  location,
  _createdAt
}`;

// 2. Fetch with Sanity client
const projects = await client.fetch(query);

// 3. Transform data (if needed)
const transformedProjects = projects.map(transformProject);

// 4. Return to component
return transformedProjects;
```

---

## Deployment Architecture

### Vercel Deployment

```
GitHub Repository
    │
    │ (git push)
    ▼
Vercel Build Process
    │
    ├─→ Install Dependencies
    ├─→ Type Check (TypeScript)
    ├─→ Lint (ESLint)
    ├─→ Build Next.js App
    │   ├─→ Generate Static Pages
    │   ├─→ Optimize Images
    │   └─→ Bundle JavaScript
    │
    └─→ Deploy to Edge Network
        │
        ├─→ Static Assets → CDN
        ├─→ Server Functions → Serverless
        └─→ Edge Functions → Edge Runtime
```

### Environment-Specific Configuration

| Environment     | Branch           | URL                          | Purpose     |
| --------------- | ---------------- | ---------------------------- | ----------- |
| **Production**  | `main`           | acoblighting.com             | Live site   |
| **Preview**     | Feature branches | vercel-preview-\*.vercel.app | Testing     |
| **Development** | Local            | localhost:3000               | Development |

---

## Performance Strategy

### 1. Image Optimization

```typescript
// Next.js Image Component
<Image
  src={imageUrl}
  alt={alt}
  width={800}
  height={600}
  quality={85}
  loading="lazy"
  placeholder="blur"
/>
```

### 2. Code Splitting

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  { loading: () => <Skeleton />, ssr: true }
);
```

### 3. Caching Strategy

| Content Type  | Strategy | Revalidation     |
| ------------- | -------- | ---------------- |
| Static Pages  | SSG      | Build time       |
| Dynamic Pages | ISR      | 5 minutes (300s) |
| API Routes    | No cache | Real-time        |
| Images        | CDN      | 1 year           |

### 4. Performance Metrics

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1

---

## Security Architecture

### 1. Environment Variables

```env
# Public (exposed to browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx

# Private (server-only)
SANITY_API_TOKEN=xxx
RESEND_API_KEY=xxx
GROQ_API_KEY=xxx
```

### 2. API Security

- **Rate Limiting**: Prevent abuse
- **Input Validation**: Sanitize all inputs
- **CORS**: Restrict origins
- **HTTPS Only**: Enforce secure connections

### 3. Content Security

- **Image Protection**: Watermarks, context menu disabled
- **Copyright**: ACOB Lighting Technology Limited
- **Access Control**: Sanity Studio authentication

---

## Key Design Decisions

### 1. Why Next.js App Router?

- **Server Components**: Reduce client-side JavaScript
- **Streaming**: Progressive rendering
- **Built-in Optimization**: Images, fonts, scripts
- **SEO**: Server-side rendering by default

### 2. Why Sanity CMS?

- **Structured Content**: GROQ queries
- **Real-time Collaboration**: Multiple editors
- **Image CDN**: Automatic optimization
- **Portable Text**: Rich content editing

### 3. Why TypeScript?

- **Type Safety**: Catch errors at compile time
- **Better DX**: IntelliSense, autocomplete
- **Maintainability**: Self-documenting code
- **Refactoring**: Safer code changes

---

## Development Workflow

```
1. Create Feature Branch
   git checkout -b feature/new-feature

2. Develop Locally
   npm run dev

3. Test Changes
   npm run lint
   npm run type-check
   npm test

4. Commit with Conventional Commits
   git commit -m "feat: add new feature"

5. Push to GitHub
   git push origin feature/new-feature

6. Create Pull Request
   - Automated checks run
   - Code review
   - Preview deployment

7. Merge to Main
   - Automatic production deployment
   - Vercel builds and deploys
```

---

## Monitoring & Analytics

### 1. Vercel Analytics

- Page views
- User demographics
- Performance metrics

### 2. Web Vitals

- Core Web Vitals tracking
- Performance monitoring
- User experience metrics

### 3. Error Tracking

- Error boundaries
- Console error logging
- Production error monitoring

---

## Future Considerations

### Planned Improvements

1. **Testing**: Comprehensive test coverage
2. **Storybook**: Component documentation
3. **Internationalization**: Multi-language support
4. **PWA**: Progressive Web App features
5. **Analytics**: Enhanced tracking

### Scalability

- **Horizontal Scaling**: Vercel handles automatically
- **Database**: Sanity scales with usage
- **CDN**: Global edge network
- **Caching**: Redis for advanced caching (future)

---

## Getting Started

### For New Developers

1. **Read This Document**: Understand the architecture
2. **Review README.md**: Setup instructions
3. **Explore Codebase**: Start with `app/page.tsx`
4. **Run Locally**: `npm run dev`
5. **Make Changes**: Follow coding standards
6. **Ask Questions**: Team is here to help

### Key Files to Understand

1. `app/layout.tsx` - Root layout
2. `app/page.tsx` - Home page
3. `sanity/lib/client.ts` - Data fetching
4. `lib/types.ts` - Type definitions
5. `components/sections/` - Page sections

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

**Questions?** Contact the development team or refer to the CODE_REVIEW.md for detailed recommendations.

---

_Last Updated: December 16, 2025_  
_ACOB Lighting Technology Limited - Proprietary and Confidential_
