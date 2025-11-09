# Component Standards Guide

This document establishes consistent patterns for React components in the ACOB project.

## Table of Contents

- [Component Structure](#component-structure)
- [Export Patterns](#export-patterns)
- [Client vs Server Components](#client-vs-server-components)
- [TypeScript Standards](#typescript-standards)
- [Props Interface Naming](#props-interface-naming)
- [File Organization](#file-organization)
- [Performance Optimization](#performance-optimization)
- [Examples](#examples)

---

## Component Structure

### Standard Component Template

````typescript
'use client'; // Only if client-side features required

// React imports
import { useState, useEffect } from 'react';

// Third-party library imports (sorted alphabetically)
import { motion } from 'framer-motion';

// UI component imports
import { Button, Card } from '@/components/ui';

// Local component imports
import { LocalComponent } from './local-component';

// Type imports
import type { ComponentProps } from '@/lib/types';

// Utility imports
import { cn } from '@/lib/utils';

// Data imports
import { staticData } from '@/lib/data';

/**
 * Brief description of what this component does
 *
 * @param {ComponentProps} props - Component props
 * @returns {JSX.Element} Rendered component
 *
 * @example
 * ```tsx
 * <MyComponent title="Hello" />
 * ```
 */
export function MyComponent({ title, children }: ComponentProps) {
  // Component logic here

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
````

### Import Order (Mandatory)

1. **React imports** - React and hooks
2. **Third-party imports** - External libraries (sorted alphabetically)
3. **UI components** - From `@/components/ui`
4. **Local components** - Relative imports
5. **Type imports** - TypeScript types and interfaces
6. **Utility functions** - From `@/lib/utils`
7. **Data/constants** - From `@/lib/data`

---

## Export Patterns

### Named Exports (Preferred)

**Use for:** All components

```typescript
// ✅ Correct - Named export
export function MyComponent() {
  return <div>Content</div>;
}

// Usage
import { MyComponent } from './my-component';
```

**Why:** Better for:

- Tree-shaking
- Refactoring
- Auto-import in IDEs
- Clear component names

### Default Exports (Avoid)

**Only use for:** Next.js page components

```typescript
// ⚠️ Only for pages
export default function HomePage() {
  return <div>Home</div>;
}
```

---

## Client vs Server Components

### Server Components (Default)

**Use when:**

- Fetching data server-side
- No user interactivity needed
- No browser APIs required
- No React hooks needed

```typescript
// ✅ Server component (no 'use client' directive)
export async function ProjectsSection() {
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

### Client Components

**Use when:**

- Using React hooks (`useState`, `useEffect`, etc.)
- Handling user events (`onClick`, `onChange`, etc.)
- Using browser APIs (`window`, `localStorage`, etc.)
- Using animation libraries (Framer Motion, etc.)

```typescript
'use client'; // ✅ Required for client-side features

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### 'use client' Directive Placement

**Rules:**

1. Must be at the **very first line** of the file
2. Before any imports
3. Before any comments (except legal/licensing comments)

```typescript
// ✅ Correct
'use client';

import { useState } from 'react';

// ❌ Wrong - directive not first
import { useState } from 'react';

('use client');
```

---

## TypeScript Standards

### Props Interface Naming

**Pattern:** `ComponentNameProps`

```typescript
// ✅ Correct
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  projects: Project[];
}

export function HeroSection({ title, subtitle, projects }: HeroSectionProps) {
  // ...
}
```

### Optional Props

Use `?` for optional properties:

```typescript
interface ButtonProps {
  label: string; // Required
  variant?: 'primary' | 'secondary'; // Optional
  disabled?: boolean; // Optional
  onClick?: () => void; // Optional
}
```

### Children Prop

```typescript
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;  // For any valid React content
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('container', className)}>{children}</div>;
}
```

### Type vs Interface

**Use Interface for:** Component props, object shapes

```typescript
interface UserProps {
  name: string;
  email: string;
}
```

**Use Type for:** Unions, primitives, utilities

```typescript
type Status = 'idle' | 'loading' | 'success' | 'error';
type ID = string | number;
```

---

## File Organization

### Directory Structure

```
components/
├── ui/              # Reusable UI primitives (Button, Card, etc.)
├── layout/          # Layout components (Header, Footer, etc.)
├── sections/        # Page sections (HeroSection, AboutSection, etc.)
├── features/        # Feature-specific components (ChatBot, etc.)
└── [feature-name]/  # Feature with multiple sub-components
    ├── index.tsx
    ├── component-a.tsx
    └── component-b.tsx
```

### File Naming

**Pattern:** `kebab-case.tsx`

```
✅ hero-section.tsx
✅ project-card.tsx
✅ chat-bot.tsx

❌ HeroSection.tsx
❌ projectCard.tsx
❌ ChatBot.tsx
```

### Component Naming

**Pattern:** `PascalCase`

```typescript
✅ export function HeroSection() {}
✅ export function ProjectCard() {}
✅ export function ChatBot() {}

❌ export function heroSection() {}
❌ export function projectcard() {}
```

---

## Performance Optimization

### When to Use React.memo()

**Use for:**

- Components that re-render frequently with same props
- Components with expensive render logic
- Large lists items

```typescript
import { memo } from 'react';

interface ProjectCardProps {
  project: Project;
}

// ✅ Memoize expensive components
export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      {/* Expensive rendering logic */}
    </Card>
  );
});
```

**Don't use for:**

- Simple components (adds overhead)
- Components that always receive new props
- Components that rarely re-render

### When to Use useCallback()

**Use for:**

- Functions passed to memoized child components
- Functions in dependency arrays of hooks

```typescript
import { useState, useCallback } from 'react';

export function ParentComponent() {
  const [items, setItems] = useState<Item[]>([]);

  // ✅ Memoize callback passed to child
  const handleDelete = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div>
      {items.map(item => (
        <MemoizedChild key={item.id} onDelete={handleDelete} />
      ))}
    </div>
  );
}
```

### When to Use useMemo()

**Use for:**

- Expensive computations
- Creating stable object/array references

```typescript
import { useMemo } from 'react';

export function DataTable({ data }: { data: Item[] }) {
  // ✅ Memoize expensive filtering
  const filteredData = useMemo(() => {
    return data.filter(item => item.isActive).sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return <Table data={filteredData} />;
}
```

---

## Examples

### Server Component Example

```typescript
// app/projects/page.tsx
import { ProjectCard } from '@/components/features/project-card';
import { getProjects } from '@/sanity/lib/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - ACOB Lighting',
  description: 'Browse our completed solar energy projects',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Projects</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
```

### Client Component Example

```typescript
// components/features/search-filter.tsx
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input, Button } from '@/components/ui';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

/**
 * Search filter component with real-time filtering
 *
 * @param {SearchFilterProps} props - Component props
 * @returns {JSX.Element} Search input with filter button
 */
export function SearchFilter({ onSearch, placeholder = 'Search...' }: SearchFilterProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
```

### Memoized Component Example

```typescript
// components/features/project-card.tsx
import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

/**
 * Displays a single project card with image, title, and description
 * Memoized to prevent unnecessary re-renders in large project lists
 */
export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        {project.projectImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={project.projectImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle>{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{project.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/projects/${project.slug.current}`}
          className="text-primary hover:underline"
        >
          View Details →
        </Link>
      </CardFooter>
    </Card>
  );
});
```

---

## Best Practices Summary

### ✅ Do

- Use named exports for components
- Place 'use client' directive at the very first line
- Use Server Components by default
- Name props interfaces as `ComponentNameProps`
- Add JSDoc comments for complex components
- Memoize expensive components in large lists
- Use semantic HTML elements
- Follow import order consistently

### ❌ Don't

- Use default exports (except for Next.js pages)
- Add 'use client' unless necessary
- Mix Server and Client component logic
- Use generic names like `Props` or `IProps`
- Over-optimize with memo/useMemo/useCallback
- Skip type annotations
- Nest components inside other components
- Create giant components (split into smaller ones)

---

## Component Size Guidelines

- **Small components:** < 150 lines
- **Medium components:** 150-400 lines
- **Large components:** 400-600 lines (consider refactoring)
- **Too large:** > 600 lines (must refactor)

If a component exceeds 400 lines, consider:

1. Extracting sub-components
2. Moving logic to custom hooks
3. Splitting into a feature directory with multiple files

---

## Related Documentation

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
