# Loading & Performance Improvements

## Critical Issues Analysis

### 1. **Missing Loading States**

Your website suffers from several UX issues where content appears to "pop in" or remains invisible during initial load:

#### Issues:

- **Header/Navbar**: Doesn't render until client-side hydration completes
- **Hero Section "Powering sustainable..."**: Hidden due to MaskText animation threshold
- **Metrics (counters)**: No fallback during data fetch
- **Hero carousel images**: No blur placeholders or progressive loading
- **Sanity data**: No loading skeletons while fetching projects/updates

---

## Recommended Solutions

### **Priority 1: Fix MaskText Threshold (Quick Win)**

**File:** `components/animations/MaskText.tsx`

**Current (Line 22-24):**

```typescript
const { ref, inView } = useInView({
  threshold: 0.75, // ❌ Content hidden until 75% visible
  triggerOnce: true,
});
```

**Fix:**

```typescript
const { ref, inView } = useInView({
  threshold: 0.1, // ✅ Show content when only 10% visible
  triggerOnce: true,
});
```

**Impact:** Immediate - text visible on page load instead of blank space.

---

### **Priority 2: Add ISR with Caching**

**File:** `app/page.tsx`

**Current:**

```typescript
export default async function HomePage() {
  const [projects, featuredProjects, posts] = await Promise.all([
    getProjects(),
    getFeaturedProjects(),
    getUpdatePosts(),
  ]);
  // ...
}
```

**Fix - Add revalidation:**

```typescript
// Add this export
export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  // ... existing code
}
```

**File:** `sanity/lib/client.ts` (Line 33-39)

**Current:**

```typescript
export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // ❌ No CDN = slower
  apiVersion: '2025-07-16',
  token: token,
});
```

**Fix:**

```typescript
export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === 'production', // ✅ Use CDN in production
  apiVersion: '2025-07-16',
  token: token,
});
```

**Impact:**

- Data cached for 5 minutes
- CDN delivers content faster
- Reduces Sanity API calls

---

### **Priority 3: Add Loading Skeletons**

Create skeleton components for each section:

**Step 1: Create Hero Skeleton**

```bash
# File: components/skeletons/hero-skeleton.tsx
```

```typescript
export function HeroSkeleton() {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-muted">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-pulse" />

      {/* Content skeleton */}
      <div className="relative z-20 h-full flex items-end pb-6 lg:pb-6">
        <div className="px-4 sm:px-8 pb-6 sm:pb-2">
          <div className="space-y-4 md:space-y-5 max-w-xl">
            {/* Badge skeleton */}
            <div className="h-6 w-48 bg-primary/20 rounded-full animate-pulse" />

            {/* Title skeleton */}
            <div className="space-y-3">
              <div className="h-12 bg-muted-foreground/20 rounded animate-pulse w-full" />
              <div className="h-12 bg-muted-foreground/20 rounded animate-pulse w-3/4" />
            </div>

            {/* Description skeleton */}
            <div className="h-4 bg-muted-foreground/10 rounded animate-pulse w-full" />
            <div className="h-4 bg-muted-foreground/10 rounded animate-pulse w-5/6" />

            {/* Metrics skeleton */}
            <div className="grid gap-2 sm:gap-2.5 grid-cols-3 max-w-xl">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-white/10 rounded animate-pulse" />
              ))}
            </div>

            {/* Buttons skeleton */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-primary/50 rounded-lg animate-pulse" />
              <div className="h-12 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Projects Skeleton**

```bash
# File: components/skeletons/projects-skeleton.tsx
```

```typescript
export function ProjectsSkeleton() {
  return (
    <section className="border-b border-border bg-background py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container px-4">
        {/* Header skeleton */}
        <div className="mb-16 space-y-4">
          <div className="h-12 w-96 bg-muted animate-pulse rounded" />
          <div className="h-6 w-full max-w-2xl bg-muted/50 animate-pulse rounded" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-border">
              {/* Image skeleton */}
              <div className="aspect-[16/9] bg-muted animate-pulse" />

              {/* Content skeleton */}
              <div className="p-4 sm:p-6 space-y-3">
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted/70 animate-pulse rounded w-5/6" />
                <div className="h-4 bg-muted/70 animate-pulse rounded w-4/6" />
                <div className="h-10 bg-primary/20 animate-pulse rounded mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Use Suspense in Home Page**

```bash
# File: app/page.tsx
```

```typescript
import { Suspense } from 'react';
import { HeroSkeleton } from '@/components/skeletons/hero-skeleton';
import { ProjectsSkeleton } from '@/components/skeletons/projects-skeleton';

export const revalidate = 300; // 5 minutes

async function HeroData() {
  const featuredProjects = await getFeaturedProjects();
  return <HeroSection projects={featuredProjects} />;
}

async function ProjectsData() {
  const projects = await getProjects();
  return <ProjectsSection projects={projects} />;
}

export default async function HomePage() {
  return (
    <main role="main">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroData />
      </Suspense>

      <AboutSection />
      <ServicesSection />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsData />
      </Suspense>

      <CompanySection />
      <UpdatesSection />
      <PartnersSection />
    </main>
  );
}
```

---

### **Priority 4: Fix Header Hydration**

**File:** `components/layout/header.tsx`

**Current (Line 397-404):**

```typescript
const [mounted, setMounted] = useState(false);
const { resolvedTheme } = useTheme();

const logoSrc =
  mounted && resolvedTheme === 'dark'
    ? '/images/acob-logo-dark.webp'
    : '/images/acob-logo-light.webp';

useEffect(() => {
  setMounted(true);
}, []);
```

**Fix - Server-render with fallback:**

```typescript
const { resolvedTheme, theme } = useTheme();
const [mounted, setMounted] = useState(false);

// Use system preference or default to light
const logoSrc = !mounted
  ? '/images/acob-logo-light.webp' // Default/SSR
  : resolvedTheme === 'dark'
    ? '/images/acob-logo-dark.webp'
    : '/images/acob-logo-light.webp';

useEffect(() => {
  setMounted(true);
}, []);
```

**Or better - CSS-based solution:**

```typescript
// Single logo with CSS filter for dark mode
<Image
  src="/images/acob-logo-light.webp"
  alt="ACOB Lighting Logo"
  className="dark:invert" // Invert colors in dark mode
  // ... other props
/>
```

---

### **Priority 5: Image Optimization**

**File:** `components/sections/hero-section.tsx` (Line 141-149)

**Current:**

```typescript
<Image
  src={slide.image}
  alt={slide.title}
  fill
  className="object-cover"
  priority={index === 0}
  quality={95}
  sizes="100vw"
/>
```

**Fix - Add blur placeholder:**

```typescript
<Image
  src={slide.image}
  alt={slide.title}
  fill
  className="object-cover"
  priority={index === 0}
  quality={95}
  sizes="100vw"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4="
  // Or use shimmer placeholder utility
/>
```

**Create blur placeholder utility:**

```bash
# File: lib/utils/image-placeholders.ts
```

```typescript
export function getBlurDataURL(width = 10, height = 10) {
  const shimmer = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#1a1a1a" offset="20%" />
          <stop stop-color="#2a2a2a" offset="50%" />
          <stop stop-color="#1a1a1a" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#1a1a1a" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer)}`;
}
```

---

## Implementation Priority

### **Quick Wins (< 30 minutes):**

1. ✅ Fix MaskText threshold (0.75 → 0.1)
2. ✅ Enable Sanity CDN in production
3. ✅ Add revalidation to home page

### **Medium Effort (1-2 hours):**

4. ⚡ Create loading skeletons
5. ⚡ Implement Suspense boundaries
6. ⚡ Fix header hydration

### **Polish (2-3 hours):**

7. 🎨 Add blur placeholders to all images
8. 🎨 Create shimmer loading effect
9. 🎨 Optimize font loading

---

## Expected Impact

### **Before:**

- ❌ Navbar invisible on initial load
- ❌ "Powering sustainable..." text hidden
- ❌ Blank spaces while data loads
- ❌ Images pop in abruptly
- ❌ Slow Sanity fetches (no CDN)

### **After:**

- ✅ Navbar visible immediately with SSR
- ✅ Hero text visible on load (animates from 10% viewport)
- ✅ Professional skeleton screens during loading
- ✅ Smooth image fade-ins with blur placeholders
- ✅ Faster loads with CDN + caching (5min revalidation)

---

## Testing Checklist

After implementing fixes:

1. **Slow 3G Test:**

   ```bash
   # Chrome DevTools → Network → Slow 3G
   # Check: Do skeletons appear?
   # Check: Is navbar visible?
   # Check: Is hero text visible?
   ```

2. **Hard Refresh Test:**

   ```bash
   # Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   # Check: No flash of unstyled content
   # Check: Logo doesn't flicker
   ```

3. **Lighthouse Audit:**
   ```bash
   # Check CLS (Cumulative Layout Shift) < 0.1
   # Check LCP (Largest Contentful Paint) < 2.5s
   ```

---

## Additional Recommendations

### **1. Preload Critical Images**

Add to `app/layout.tsx`:

```typescript
<head>
  <link
    rel="preload"
    as="image"
    href="/images/acob-logo-light.webp"
    type="image/webp"
  />
</head>
```

### **2. Add Font Display Swap**

Already implemented in `globals.css:7-9` ✅

### **3. Consider React Server Components**

Your app already uses RSC ✅ - just need to add Suspense boundaries

### **4. Monitor Performance**

You have Vercel Analytics ✅ - monitor:

- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

## Questions?

If you need help implementing any of these fixes, let me know which priority level you'd like to start with!
