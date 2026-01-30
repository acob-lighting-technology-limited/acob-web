# Hardcoded Contact Information Audit

This document lists all occurrences of hardcoded contact information that could potentially be replaced with centralized constants from `lib/constants/app.constants.ts`.

## Summary

**Total occurrences found:**

- Email (`info@acoblighting.com`): 38 occurrences
- Phone (`+234 704 920 2634`): 27 occurrences

## Centralized Constants Available

From `lib/constants/app.constants.ts`:

```typescript
CONTACT_INFO = {
  phone: {
    primary: '+234 704 920 2634',
    secondary: '+234 803 290 2825',
  },
  email: {
    general: 'info@acoblighting.com',
    support: 'info@acoblighting.com',
    sales: 'sales@acoblighting.com',
    careers: 'careers@acoblighting.com',
  },
};
```

## Files with Hardcoded Email (info@acoblighting.com)

### ✅ Already Fixed

1. `components/resources/resources-section.tsx` - Line 127 ✅ FIXED

### 🔴 High Priority (User-Facing Components)

2. `app/not-found.tsx` - Lines 112, 116
3. `app/faq/page.tsx` - Lines 27, 30
4. `app/contact/support/page.tsx` - Lines 210, 213
5. `app/contact/locations/page.tsx` - Lines 191, 194, 270, 273
6. `app/contact/careers/[slug]/page.tsx` - Lines 174, 179
7. `app/contact/careers/page.tsx` - Lines 290, 293
8. `components/job-application-form.tsx` - Line 226
9. `components/ui/error-state.tsx` - Line 17
10. `components/products/contact-dialog.tsx` - Line 124

### 🟡 Medium Priority (Error Handling)

11. `app/error.tsx` - Line 80
12. `app/global-error.tsx` - Line 73
13. `app/offline/page.tsx` - Line 88
14. `components/error-boundary/global-error-boundary.tsx` - Line 177
15. `components/error-boundary/network-error-boundary.tsx` - Line 117

### 🟢 Low Priority (Data/Config Files - May be intentional)

16. `lib/data/fallback-data.ts` - Line 119
17. `lib/data/footer-data.ts` - Line 70
18. `lib/data/privacy-policy-data.ts` - Line 156
19. `lib/data/support-data.ts` - Line 16
20. `lib/data/terms-of-service-data.ts` - Line 146
21. `lib/data/acobot_system_prompt.ts` - Lines 109, 110, 111, 170, 242, 308
22. `lib/constants.ts` - Line 10 (Old constants file?)
23. `components/seo/structured-data.tsx` - Line 24
24. `lib/utils/chat-context-formatter.ts` - Line 209
25. `app/api/job-application/route.ts` - Line 100

## Files with Hardcoded Phone (+234 704 920 2634)

### 🔴 High Priority (User-Facing Components)

1. `app/faq/page.tsx` - Line 37
2. `app/contact/support/page.tsx` - Line 203
3. `app/contact/locations/page.tsx` - Lines 174, 253
4. `app/contact/careers/[slug]/page.tsx` - Line 202
5. `app/contact/careers/page.tsx` - Line 276
6. `components/layout/call-to-action.tsx` - Line 39
7. `components/features/chat-bot/chat-bot-container.tsx` - Line 277
8. `components/products/contact-dialog.tsx` - Lines 32, 125

### 🟡 Medium Priority (Error Handling)

9. `app/error.tsx` - Line 79
10. `app/global-error.tsx` - Line 72
11. `app/offline/page.tsx` - Line 87
12. `components/error-boundary/global-error-boundary.tsx` - Line 176
13. `components/error-boundary/network-error-boundary.tsx` - Line 116

### 🟢 Low Priority (Data/Config Files)

14. `lib/data/fallback-data.ts` - Line 118
15. `lib/data/footer-data.ts` - Line 69
16. `lib/data/privacy-policy-data.ts` - Line 157
17. `lib/data/support-data.ts` - Line 9
18. `lib/data/terms-of-service-data.ts` - Line 147
19. `lib/data/acobot_system_prompt.ts` - Lines 108, 170, 241, 308
20. `components/seo/structured-data.tsx` - Line 22

## Recommendations

### Immediate Actions (High Priority)

Focus on replacing hardcoded values in user-facing pages and components:

- Contact pages
- FAQ page
- Error states
- Product contact dialogs
- Job application forms

### Consider Keeping Hardcoded (Low Priority)

Some files may intentionally have hardcoded values:

- `lib/data/acobot_system_prompt.ts` - System prompt for AI chatbot (may need literal text)
- `lib/data/fallback-data.ts` - Fallback/default data
- SEO structured data - May need to be static for SEO purposes
- Old `lib/constants.ts` - Should probably be removed if deprecated

### Benefits of Centralization

1. **Single source of truth** - Update contact info in one place
2. **Consistency** - Ensures all pages show the same contact information
3. **Maintainability** - Easier to update when contact details change
4. **Type safety** - TypeScript ensures correct usage

### Implementation Pattern

```typescript
// Import the constant
import { CONTACT_INFO } from '@/lib/constants/app.constants';

// Use in JSX
<a href={`mailto:${CONTACT_INFO.email.support}`}>
  {CONTACT_INFO.email.support}
</a>

<a href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}>
  {CONTACT_INFO.phone.primary}
</a>
```
