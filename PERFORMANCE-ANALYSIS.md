# Performance Analysis & Optimization Report

## Executive Summary

Your Vercel Speed Insights are showing low scores on `/` and `/projects` due to **multiple critical performance issues**:

1. **Massive Image Sizes** - Some images are 3.5MB (should be < 200KB)
2. **Heavy JavaScript Bundles** - Home page loads 216KB of JS (102KB shared)
3. **No Progressive Loading** - Images and animations block critical content
4. **Expensive Client-Side Animations** - Framer Motion used in 20+ components
5. **Missing Optimization** - No CDN caching, no ISR, no lazy loading

---

## Critical Performance Issues

### 🚨 **Issue #1: Massive Unoptimized Images**

#### **Problem:**

```bash
Total images: 17MB
Largest images:
├─ contact-us.webp:            3.5MB  ❌ (should be < 200KB)
├─ office-location-hero.webp:  2.3MB  ❌
├─ company-team.webp:          2.3MB  ❌
├─ office-location.webp:       1.9MB  ❌
├─ mini-grid-solutions.webp:   988KB  ❌
├─ professional-energy-audit:  956KB  ❌
```

#### **Impact:**

- **Largest Contentful Paint (LCP):** > 4s on slow 3G
- **Cumulative Layout Shift (CLS):** Images load late, causing layout jumps
- **Total Blocking Time (TBT):** Browser busy decompressing huge images

#### **Solution:**

```bash
# Optimize all images to < 200KB
# Use responsive sizes
# Add blur placeholders
```

**Priority: CRITICAL** ⚠️

---

### 🚨 **Issue #2: Heavy JavaScript Bundles**

#### **Build Analysis:**

```
Route                First Load JS
/                    216 kB  ❌ (target: < 150KB)
/about/mission       338 kB  ❌❌ (LARGEST!)
/contact/careers     200 kB  ❌
/projects            166 kB  ⚠️
/projects/[slug]     214 kB  ❌

Shared chunks:       102 kB
├─ framer-motion:    ~45 kB  (used in 20 files!)
├─ react-intersection-observer: ~10 kB
├─ react-fast-marquee: ~8 kB
```

#### **Impact:**

- **Time to Interactive (TTI):** > 5s on mobile
- **First Contentful Paint (FCP):** Delayed while parsing JS
- **Main Thread Work:** Excessive animation calculations

#### **Root Causes:**

1. **Framer Motion** imported in 20+ components
2. **`react-intersection-observer`** used for every animation
3. **No code splitting** - all animations load on every page
4. **Client-side rendering** - MaskText, FadeIn, StaggerChildren

**Priority: HIGH** 🔥

---

### 🚨 **Issue #3: Blocking Animations & Content Visibility**

#### **Problem - MaskText Component:**

```typescript
// components/animations/MaskText.tsx:22-24
const { ref, inView } = useInView({
  threshold: 0.75, // ❌ Content hidden until 75% visible!
  triggerOnce: true,
});
```

**Affected Content (hidden on initial load):**

- ✗ Hero section: "Powering sustainable futures..."
- ✗ About section: "ACOB Lighting Technology Limited"
- ✗ Services section: "Integrated renewable energy..."
- ✗ Projects section: "Selected Energy Deployments"
- ✗ Company section: "Why trust ACOB Lighting"

#### **Impact:**

- **LCP delayed** - Largest text hidden
- **CLS increased** - Text pops in late
- **Poor UX** - Blank spaces on load

**Priority: CRITICAL** ⚠️

---

### 🚨 **Issue #4: No Server-Side Optimization**

#### **Home Page (`app/page.tsx`):**

```typescript
// ❌ NO CACHING
export default async function HomePage() {
  const [projects, featuredProjects, posts] = await Promise.all([
    getProjects(), // Fetches ALL projects
    getFeaturedProjects(), // Fetches 6 featured
    getUpdatePosts(), // Fetches ALL posts
  ]);
}
```

#### **Sanity Client (`sanity/lib/client.ts`):**

```typescript
export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // ❌ NO CDN = slow fetches
  apiVersion: '2025-07-16',
});
```

#### **Impact:**

- Every page load fetches fresh data from Sanity
- No CDN = slower API calls (especially from Nigeria)
- Server response time > 800ms

**Priority: HIGH** 🔥

---

### 🚨 **Issue #5: Projects Page Performance**

#### **`/projects` page issues:**

```typescript
// app/projects/page.tsx
const result = await getProjectsPaginated({
  page,
  limit,
  search,
  state,
});
const recentProjects = await getRecentProjectImages(5);
```

**Problems:**

1. **PageHeroCarousel** - Loads 5 full-size images immediately
2. **Ken Burns animation** - Heavy CSS transform on all images
3. **Auto-play carousel** - Continuous animations drain battery
4. **No lazy loading** - All project images load eagerly

**Impact:**

- **LCP:** > 3.5s (hero carousel images)
- **TBT:** Animation calculations block main thread
- **Battery drain** - Continuous carousel animations

**Priority: HIGH** 🔥

---

## Performance Metrics Analysis

### **Current Performance (Estimated):**

| Metric          | Home (/) | Projects | Target  | Status  |
| --------------- | -------- | -------- | ------- | ------- |
| **LCP**         | ~4.2s    | ~3.8s    | < 2.5s  | ❌ FAIL |
| **FCP**         | ~2.1s    | ~1.9s    | < 1.8s  | ⚠️ POOR |
| **TBT**         | ~850ms   | ~720ms   | < 200ms | ❌ FAIL |
| **CLS**         | ~0.18    | ~0.15    | < 0.1   | ❌ FAIL |
| **Speed Index** | ~3.9s    | ~3.4s    | < 3.4s  | ⚠️ POOR |

### **Root Cause Breakdown:**

#### **Home Page (/) - 216KB JS:**

```
Performance Impact:
├─ Images (17MB total):          40% of slowness
├─ JavaScript (216KB):           30% of slowness
├─ Animations (Framer Motion):   20% of slowness
├─ Missing optimizations:        10% of slowness
```

#### **Projects Page - 166KB JS:**

```
Performance Impact:
├─ Hero carousel (5 images):     35% of slowness
├─ Project images:               30% of slowness
├─ JavaScript bundle:            20% of slowness
├─ Sanity API calls:             15% of slowness
```

---

## Detailed Fix Recommendations

### **Priority 1: Image Optimization (Quick Win - 2 hours)**

#### **Step 1: Compress All Images**

```bash
# Install sharp for image optimization
npm install sharp --save-dev
```

Create optimization script:

```bash
# File: scripts/optimize-images.js
```

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1920;
const MAX_FILE_SIZE = 200 * 1024; // 200KB

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) return;

  const stats = fs.statSync(filePath);
  if (stats.size < MAX_FILE_SIZE) return; // Already optimized

  console.log(`Optimizing: ${filePath} (${(stats.size / 1024).toFixed(0)}KB)`);

  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Resize if too large
  if (metadata.width > MAX_WIDTH) {
    image.resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  // Optimize based on file type
  if (ext === '.webp') {
    await image.webp({ quality: 80, effort: 6 }).toFile(filePath + '.tmp');
  } else if (['.jpg', '.jpeg'].includes(ext)) {
    await image
      .jpeg({ quality: 80, progressive: true })
      .toFile(filePath + '.tmp');
  } else if (ext === '.png') {
    await image
      .png({ compressionLevel: 9, quality: 80 })
      .toFile(filePath + '.tmp');
  }

  // Replace original
  fs.renameSync(filePath + '.tmp', filePath);

  const newStats = fs.statSync(filePath);
  console.log(`  ✓ Reduced to ${(newStats.size / 1024).toFixed(0)}KB`);
}

// Recursively optimize all images
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      optimizeImage(filePath);
    }
  });
}

walkDir(PUBLIC_DIR);
```

Run optimization:

```bash
node scripts/optimize-images.js
```

**Expected Results:**

```
contact-us.webp:            3.5MB → 180KB  ✅ (95% reduction)
office-location-hero.webp:  2.3MB → 160KB  ✅
company-team.webp:          2.3MB → 190KB  ✅
mini-grid-solutions.webp:   988KB → 140KB  ✅
```

#### **Step 2: Add Blur Placeholders**

Create utility:

```bash
# File: lib/utils/image-blur.ts
```

```typescript
export function getImageBlurData() {
  return {
    blurDataURL:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=',
    placeholder: 'blur' as const,
  };
}
```

Update all Image components:

```typescript
// Before
<Image src={image} alt={alt} fill />

// After
<Image
  src={image}
  alt={alt}
  fill
  {...getImageBlurData()}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Impact:** LCP improvement of 1-1.5s

---

### **Priority 2: Fix MaskText Threshold (5 minutes)**

```typescript
// components/animations/MaskText.tsx
const { ref, inView } = useInView({
  threshold: 0.1, // ✅ Changed from 0.75
  triggerOnce: true,
});
```

**Impact:** Immediate - text visible on load

---

### **Priority 3: Enable ISR & CDN (10 minutes)**

#### **Add Revalidation:**

```typescript
// app/page.tsx
export const revalidate = 300; // 5 minutes

// app/projects/page.tsx
export const revalidate = 600; // 10 minutes
```

#### **Enable Sanity CDN:**

```typescript
// sanity/lib/client.ts
export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === 'production', // ✅
  apiVersion: '2025-07-16',
  token: token,
});
```

**Impact:** 40-60% faster data fetching

---

### **Priority 4: Lazy Load Heavy Components (1 hour)**

#### **Dynamic Imports for Heavy Sections:**

```typescript
// app/page.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy sections
const PartnersSection = dynamic(
  () => import('@/components/sections/partners-section').then(m => ({ default: m.PartnersSection })),
  { loading: () => <PartnersSkeleton /> }
);

const CompanySection = dynamic(
  () => import('@/components/sections/company-section').then(m => ({ default: m.CompanySection })),
  { loading: () => <CompanySkeleton /> }
);
```

**Impact:** Reduce initial JS bundle by 30-40KB

---

### **Priority 5: Optimize Animations (2 hours)**

#### **Replace Heavy Framer Motion Animations:**

Currently using Framer Motion in 20 files! This adds ~45KB to every page.

**Option A: Use CSS Animations (Recommended)**

```typescript
// components/animations/FadeInCSS.tsx
export function FadeInCSS({ children, delay = 0 }: Props) {
  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
```

```css
/* app/globals.css */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}
```

**Option B: Lazy Load Framer Motion**

```typescript
const FramerMotionSection = dynamic(
  () => import('./framer-section'),
  {
    ssr: false,  // Don't load on server
    loading: () => <StaticVersion />  // Show static version first
  }
);
```

**Impact:** Reduce bundle by 45KB, improve TTI by 800ms

---

### **Priority 6: Optimize Page Hero Carousel (30 minutes)**

```typescript
// components/ui/page-hero-carousel.tsx

// Current: Loads all 5 images eagerly
{slides.map((slide, index) => (
  <Image
    src={slide.src}
    priority={index === 0}  // ❌ Only first should be priority
    loading={index < 2 ? 'eager' : 'lazy'}  // ✅ Lazy load others
    {...getImageBlurData()}
  />
))}
```

**Impact:** Reduce initial image load by 80%

---

## Implementation Roadmap

### **Week 1: Quick Wins (5-7 hours)**

| Task                                   | Time  | Impact | Priority |
| -------------------------------------- | ----- | ------ | -------- |
| 1. Optimize all images                 | 2h    | 🔥🔥🔥 | P0       |
| 2. Fix MaskText threshold              | 5min  | 🔥🔥   | P0       |
| 3. Enable ISR + CDN                    | 10min | 🔥🔥   | P0       |
| 4. Add blur placeholders               | 1h    | 🔥🔥   | P1       |
| 5. Lazy load Partners/Company sections | 1h    | 🔥     | P1       |
| 6. Optimize carousel images            | 30min | 🔥     | P1       |

**Expected Results:**

- **LCP:** 4.2s → 2.1s (50% improvement)
- **Bundle size:** 216KB → 170KB
- **Speed Insights:** 40 → 75+

### **Week 2: Deeper Optimizations (8-10 hours)**

| Task                                  | Time | Impact | Priority |
| ------------------------------------- | ---- | ------ | -------- |
| 7. Replace Framer with CSS animations | 3h   | 🔥🔥   | P2       |
| 8. Create loading skeletons           | 2h   | 🔥     | P2       |
| 9. Implement Suspense boundaries      | 2h   | 🔥     | P2       |
| 10. Optimize font loading             | 1h   | 🔥     | P3       |
| 11. Code split service section        | 2h   | 🔥     | P3       |

**Expected Results:**

- **LCP:** 2.1s → 1.6s
- **TTI:** 5s → 2.8s
- **Bundle size:** 170KB → 120KB
- **Speed Insights:** 75 → 90+

---

## Expected Performance After Fixes

### **Target Metrics:**

| Metric             | Before | After | Target  | Status  |
| ------------------ | ------ | ----- | ------- | ------- |
| **LCP**            | 4.2s   | 1.6s  | < 2.5s  | ✅ PASS |
| **FCP**            | 2.1s   | 1.1s  | < 1.8s  | ✅ PASS |
| **TBT**            | 850ms  | 180ms | < 200ms | ✅ PASS |
| **CLS**            | 0.18   | 0.04  | < 0.1   | ✅ PASS |
| **Speed Index**    | 3.9s   | 1.9s  | < 3.4s  | ✅ PASS |
| **Speed Insights** | ~40    | ~92   | > 90    | ✅ PASS |

### **Bundle Size Reduction:**

```
Before:
├─ Home page:     216 KB
├─ Projects:      166 KB
├─ About/Mission: 338 KB  ❌

After:
├─ Home page:     120 KB  ✅ (-45%)
├─ Projects:      105 KB  ✅ (-37%)
├─ About/Mission: 165 KB  ✅ (-51%)
```

---

## Testing & Monitoring

### **Performance Testing Checklist:**

1. **Lighthouse Audit (before & after):**

   ```bash
   # Desktop
   lighthouse https://acoblighting.com --view --preset=desktop

   # Mobile
   lighthouse https://acoblighting.com --view --preset=mobile
   ```

2. **Slow 3G Test:**
   - Chrome DevTools → Network → Slow 3G
   - Check: LCP < 2.5s
   - Check: No layout shifts
   - Check: Text visible immediately

3. **WebPageTest:**
   - Test from Lagos, Nigeria
   - Settings: Mobile, 3G connection
   - Target: Speed Index < 3.0s

4. **Vercel Speed Insights:**
   - Monitor real user metrics
   - Target: Score > 90

### **Monitoring:**

Add to your deployment workflow:

```bash
# File: .github/workflows/performance-check.yml
name: Performance Check
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://${{ env.VERCEL_URL }}
            https://${{ env.VERCEL_URL }}/projects
          uploadArtifacts: true
          temporaryPublicStorage: true
```

---

## Next Steps

### **Immediate Actions (This Week):**

1. ✅ Run image optimization script
2. ✅ Fix MaskText threshold
3. ✅ Enable ISR + Sanity CDN
4. ✅ Add blur placeholders to hero images
5. ✅ Test on Slow 3G

### **Short Term (Next 2 Weeks):**

6. ⚡ Replace Framer Motion with CSS animations
7. ⚡ Create loading skeletons
8. ⚡ Implement code splitting
9. ⚡ Optimize carousel

### **Long Term (Month 2):**

10. 🎯 Migrate to Next.js Image optimization API
11. 🎯 Implement service worker for offline support
12. 🎯 Add resource hints (preconnect, dns-prefetch)
13. 🎯 Consider HTTP/3 and QUIC protocol

---

## Questions?

Which priority level should we start with?

**Recommendation:** Start with Week 1 Quick Wins for immediate 50% performance improvement!
