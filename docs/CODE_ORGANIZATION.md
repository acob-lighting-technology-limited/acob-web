# Code Organization Guide

## 📁 Directory Structure

### `/app`

Next.js 13+ app directory containing pages and API routes.

### `/components`

Reusable React components organized by functionality:

- **`/ui`** - Base UI components (buttons, cards, inputs, etc.)
- **`/sections`** - Page sections and layouts
- **`/layout`** - Layout components (header, footer, etc.)
- **`/features`** - Feature-specific components (chat bot, etc.)
- **`/animations`** - Animation components
- **`/loader`** - Loading and spinner components
- **`/providers`** - Context providers
- **`/business`** - Business logic components
- **`/analytics`** - Analytics and tracking components
- **`/performance`** - Performance monitoring components
- **`/seo`** - SEO-related components
- **`/blog`** - Blog-specific components
- **`/updates`** - Update/news components

### `/lib`

Utility functions, types, and data:

- **`/data`** - Static data and constants
- **`/types.ts`** - TypeScript type definitions
- **`/utils.ts`** - Utility functions
- **`/constants.ts`** - Application constants

### `/sanity`

Sanity CMS configuration and schemas.

### `/public`

Static assets (images, icons, etc.).

## 📝 Import Organization

### Import Order

1. **React and Next.js imports**
2. **Third-party library imports**
3. **UI component imports**
4. **Local component imports**
5. **Data imports**

### Example

```typescript
'use client';

// React and Next.js imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Third-party library imports
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// UI component imports
import { Button, Container, Card } from '@/components/ui';

// Local component imports
import { MaskText } from '../animations/MaskText';

// Data imports
import { heroSlides } from '@/lib/data';
```

## 🎯 Best Practices

### Component Naming

- Use PascalCase for component names
- Use descriptive names that indicate purpose
- Suffix with component type when needed (e.g., `Button`, `Card`)

### File Naming

- Use kebab-case for file names
- Use descriptive names that match component names
- Group related components in directories

### Import Conventions

- Use index files for cleaner imports
- Import from `@/components/ui` for UI components
- Import from `@/lib/data` for data
- Use relative imports for local components

### Code Organization

- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use TypeScript for type safety
- Follow consistent formatting with Prettier

## 🔧 Index Files

### `/components/ui/index.ts`

Exports all UI components for cleaner imports:

```typescript
import { Button, Card, Container } from '@/components/ui';
```

### `/lib/data/index.ts`

Exports all data for cleaner imports:

```typescript
import { heroSlides, testimonials } from '@/lib/data';
```

## 📋 Component Guidelines

### UI Components

- Should be reusable and configurable
- Accept props for customization
- Use consistent styling patterns
- Include proper TypeScript types

### Section Components

- Represent page sections
- Can be complex but should be focused
- Use composition with smaller components
- Handle their own data fetching when needed

### Feature Components

- Implement specific features
- Can be complex and stateful
- May integrate with external services
- Should be self-contained

## 🚀 Performance Considerations

- Use dynamic imports for large components
- Implement proper loading states
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper error boundaries
