# Google Sitelinks Improvement Plan

## Current Status: GOOD ⭐⭐⭐⭐ (4/5)

Your website has **solid foundations** for Google sitelinks:

- ✅ Organization schema
- ✅ Comprehensive sitemap with proper priorities
- ✅ Clean robots.txt
- ✅ Good URL structure
- ✅ Clear navigation hierarchy

However, there are **key enhancements** that will improve sitelink generation.

---

## Priority Fixes

### 1. Add Breadcrumb Schema (HIGH PRIORITY)

**Impact**: Google heavily relies on breadcrumb structured data for sitelinks

**Implementation**:

```typescript
// components/ui/breadcrumb.tsx - Add this function
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://acoblighting.com${item.href}` : undefined,
    })),
  };
}
```

Then add to each page's metadata:

```typescript
// Example: app/projects/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return {
    // ... existing metadata
    other: {
      'application/ld+json': JSON.stringify(
        generateBreadcrumbSchema(breadcrumbItems)
      ),
    },
  };
}
```

### 2. Fix Duplicate Organization Schema (MEDIUM PRIORITY)

**Issue**: Organization schema appears in both `app/page.tsx` and `components/seo/structured-data.tsx`

**Fix**:

1. Remove schema from `app/page.tsx` metadata
2. Import and use `StructuredData` component in `app/layout.tsx`:

```typescript
// app/layout.tsx
import { StructuredData } from '@/components/seo/structured-data';

export default async function RootLayout({ children }) {
  return (
    <html>
      <head>
        <StructuredData />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

3. Update `StructuredData` component address (currently shows wrong address):

```typescript
// components/seo/structured-data.tsx
address: {
  '@type': 'PostalAddress',
  streetAddress: 'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Service Scheme, Setraco Gate Gwarinpa',
  addressLocality: 'Abuja',
  addressRegion: 'FCT', // Not Lagos!
  postalCode: '900001',
  addressCountry: 'NG',
},
```

### 3. Add FAQPage Schema (MEDIUM PRIORITY)

**Impact**: Helps Google understand your FAQ structure

```typescript
// app/faq/page.tsx - Add to metadata
export const metadata: Metadata = {
  // ... existing
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
  },
};
```

### 4. Fix/Remove SearchAction Schema (LOW PRIORITY)

**Issue**: References `/search` route that doesn't exist

**Option A**: Implement search page
**Option B**: Remove from schema until search is built

```typescript
// components/seo/structured-data.tsx
// Option B: Comment out potentialAction until search exists
// potentialAction: {
//   '@type': 'SearchAction',
//   ...
// },
```

### 5. Add Article Schema for Updates (LOW PRIORITY)

**Impact**: Better sitelinks for blog/news pages

```typescript
// app/updates/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return {
    // ... existing
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: post.featuredImage,
        datePublished: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'ACOB Lighting Technology Limited',
          logo: {
            '@type': 'ImageObject',
            url: 'https://acoblighting.com/images/acob-logo-dark.webp',
          },
        },
      }),
    },
  };
}
```

---

## Quick Wins

### A. Improve Footer Quick Links

Currently your footer duplicates main navigation. Add a distinct "Quick Links" section:

```typescript
// lib/data/footer-data.ts
export const quickLinks = [
  { name: 'Get a Quote', href: '/contact/quote' },
  { name: 'Support', href: '/contact/support' },
  { name: 'Careers', href: '/contact/careers' },
  { name: 'Case Studies', href: '/updates/case-studies' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Product Catalog', href: '/products' },
];
```

### B. Add Prominent "Popular Pages" Section

On your 404 page or site footer, list most important pages to help Google understand hierarchy.

---

## Testing & Validation

After implementing fixes:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Search Console**:
   - Check "Enhancements" > "Breadcrumbs"
   - Check "Enhancements" > "FAQ"
   - Monitor sitelinks under "Performance"

---

## Timeline

- **Week 1**: Breadcrumb schema (high impact)
- **Week 2**: Fix duplicate schemas, add FAQ schema
- **Week 3**: Article schema for updates, improve footer
- **Week 4**: Monitor Search Console, adjust based on data

---

## Expected Outcome

With these improvements:

- ✅ Google will have **clearer signals** about site structure
- ✅ **Richer sitelinks** (likely 8-12 links vs current 6-8)
- ✅ **FAQ rich results** in search
- ✅ **Better article visibility** for updates/news

**Current competitors (Daystar, Rensource, etc.) don't have this level of schema implementation** - this is a competitive advantage.
