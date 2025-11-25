# OG Image Report - All Pages

This report shows what `getOgImageUrl()` returns for each page and whether the corresponding image exists in `/public/images/og/`.

## How `getOgImageUrl()` works:

- For local images: Extracts filename from path (e.g., `/images/about/mission-vision.webp` → `mission-vision`) and returns `https://www.acoblighting.com/images/og/{filename}.jpg`
- For Sanity images: Returns optimized Sanity CDN URL with params
- For empty/missing: Returns default `https://www.acoblighting.com/images/og-image.jpg`

---

## ✅ Pages WITH OG Images Available

| Page Route              | Input Image Path                            | Expected OG Image                                                 | Status                                           |
| ----------------------- | ------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| `/` (Home)              | Direct path (not using getOgImageUrl)       | `https://www.acoblighting.com/images/og-image.jpg`                | ✅ **EXISTS** (in `/public/images/og-image.jpg`) |
| `/about/mission`        | `/images/about/mission-vision.webp`         | `https://www.acoblighting.com/images/og/mission-vision.jpg`       | ✅ **EXISTS**                                    |
| `/about/our-story`      | `/images/about/our-story.webp`              | `https://www.acoblighting.com/images/og/our-story.jpg`            | ✅ **EXISTS**                                    |
| `/about/team`           | `/images/about/acob-team.webp`              | `https://www.acoblighting.com/images/og/acob-team.jpg`            | ✅ **EXISTS**                                    |
| `/about/certifications` | `/images/about/certifications.webp`         | `https://www.acoblighting.com/images/og/certifications.jpg`       | ✅ **EXISTS**                                    |
| `/contact/quote`        | `/images/contact/contact-us.webp`           | `https://www.acoblighting.com/images/og/contact-us.jpg`           | ✅ **EXISTS**                                    |
| `/contact/locations`    | `/images/contact/office-location-hero.webp` | `https://www.acoblighting.com/images/og/office-location-hero.jpg` | ✅ **EXISTS**                                    |
| `/contact/support`      | `/images/contact/support.webp`              | `https://www.acoblighting.com/images/og/support.jpg`              | ✅ **EXISTS**                                    |
| `/contact/careers`      | `/images/contact/careers.webp`              | `https://www.acoblighting.com/images/og/careers.jpg`              | ✅ **EXISTS**                                    |
| `/contact`              | `/images/contact/contact-us.webp`           | `https://www.acoblighting.com/images/og/contact-us.jpg`           | ✅ **EXISTS**                                    |
| `/updates/gallery`      | `/images/services/header.webp`              | `https://www.acoblighting.com/images/og/header.jpg`               | ❌ **MISSING**                                   |
| `/terms-of-service`     | `/images/contact/contact-us.webp`           | `https://www.acoblighting.com/images/og/contact-us.jpg`           | ✅ **EXISTS**                                    |
| `/privacy-policy`       | `/images/contact/contact-us.webp`           | `https://www.acoblighting.com/images/og/contact-us.jpg`           | ✅ **EXISTS**                                    |

---

## ❌ Pages MISSING OG Images

| Page Route                             | Input Image Path                           | Expected OG Image                                               | Status         |
| -------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- | -------------- |
| `/products`                            | `/images/services/solar-installation.webp` | `https://www.acoblighting.com/images/og/solar-installation.jpg` | ❌ **MISSING** |
| `/resources`                           | `/images/services/solar-installation.webp` | `https://www.acoblighting.com/images/og/solar-installation.jpg` | ❌ **MISSING** |
| `/faq`                                 | `/images/services/solar-installation.webp` | `https://www.acoblighting.com/images/og/solar-installation.jpg` | ❌ **MISSING** |
| `/updates/gallery`                     | `/images/services/header.webp`             | `https://www.acoblighting.com/images/og/header.jpg`             | ❌ **MISSING** |
| `/projects/category/[slug]` (fallback) | `/images/olooji-community.webp`            | `https://www.acoblighting.com/images/og/olooji-community.jpg`   | ❌ **MISSING** |
| `/updates/category/[slug]` (fallback)  | `/images/services/header.webp`             | `https://www.acoblighting.com/images/og/header.jpg`             | ❌ **MISSING** |

---

## 🔄 Dynamic Pages (Sanity Images - No Local OG Needed)

These pages use Sanity CDN images, so `getOgImageUrl()` returns optimized Sanity URLs directly:

| Page Route                      | Image Source                               | OG Image Returned                                                         |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------- |
| `/projects`                     | First project's `projectImage` (Sanity)    | Sanity CDN URL with optimization params                                   |
| `/projects/[slug]`              | Project's `projectImage` (Sanity)          | Sanity CDN URL with optimization params                                   |
| `/projects/category/[slug]`     | Category project's `projectImage` (Sanity) | Sanity CDN URL with optimization params                                   |
| `/services`                     | First service's `image` (local or Sanity)  | Depends on service data                                                   |
| `/services/[slug]`              | Service's `image` (local or Sanity)        | Depends on service data                                                   |
| `/updates`                      | First post's `featuredImage` (Sanity)      | Sanity CDN URL with optimization params                                   |
| `/updates/[slug]`               | Post's `featuredImage` (Sanity)            | Sanity CDN URL with optimization params                                   |
| `/updates/category/[slug]`      | Category post's `featuredImage` (Sanity)   | Sanity CDN URL with optimization params                                   |
| `/about`                        | First about section's `image` (local)      | `https://www.acoblighting.com/images/og/our-story.jpg` (if first section) |
| `/contact/careers/[slug]`       | `/images/contact/careers.webp`             | `https://www.acoblighting.com/images/og/careers.jpg` ✅                   |
| `/contact/careers/[slug]/apply` | `/images/contact/careers.webp`             | `https://www.acoblighting.com/images/og/careers.jpg` ✅                   |

---

## 📋 Service Pages OG Images

Based on `servicesData`, each service uses its own image:

| Service Slug                           | Image Path                                                   | Expected OG Image                                                                 | Status         |
| -------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------- |
| `mini-grid-solutions`                  | `/images/services/mini-grid-solutions.webp`                  | `https://www.acoblighting.com/images/og/mini-grid-solutions.jpg`                  | ✅ **EXISTS**  |
| `captive-power-solutions`              | `/images/services/captive-power-solutions.webp`              | `https://www.acoblighting.com/images/og/captive-power-solutions.jpg`              | ✅ **EXISTS**  |
| `professional-energy-audit`            | `/images/services/professional-energy-audit.webp`            | `https://www.acoblighting.com/images/og/professional-energy-audit.jpg`            | ✅ **EXISTS**  |
| `engineering-procurement-construction` | `/images/services/engineering-procurement-construction.webp` | `https://www.acoblighting.com/images/og/engineering-procurement-construction.jpg` | ✅ **EXISTS**  |
| `streetlighting-infrastructure`        | `/images/services/streetlighting-infrastructure.webp`        | `https://www.acoblighting.com/images/og/streetlighting-infrastructure.jpg`        | ❌ **MISSING** |
| `operations-and-maintenance`           | `/images/services/operations-and-maintenance.webp`           | `https://www.acoblighting.com/images/og/operations-and-maintenance.jpg`           | ✅ **EXISTS**  |

---

## 📝 Summary

### Missing OG Images (Need to be created):

1. `solar-installation.jpg` - Used by: `/products`, `/resources`, `/faq`
2. `header.jpg` - Used by: `/updates/gallery`, `/updates/category/[slug]` (fallback)
3. `olooji-community.jpg` - Used by: `/projects/category/[slug]` (fallback)
4. `streetlighting-infrastructure.jpg` - Used by: `/services/streetlighting-infrastructure`

### Available OG Images:

- ✅ `/public/images/og-image.jpg` - Default OG image (used by home page `/`)
- ✅ `/public/images/og/acob-team.jpg`
- ✅ `/public/images/og/captive-power-solutions.jpg`
- ✅ `/public/images/og/careers.jpg`
- ✅ `/public/images/og/certifications.jpg`
- ✅ `/public/images/og/contact-us.jpg`
- ✅ `/public/images/og/engineering-procurement-construction.jpg`
- ✅ `/public/images/og/mini-grid-solutions.jpg`
- ✅ `/public/images/og/mission-vision.jpg`
- ✅ `/public/images/og/office-location-hero.jpg`
- ✅ `/public/images/og/operations-maintenance.jpg`
- ✅ `/public/images/og/our-story.jpg`
- ✅ `/public/images/og/professional-energy-audit.jpg`
- ✅ `/public/images/og/support.jpg`

---

## 🎯 Action Items

1. **Create missing OG images:**
   - Convert `/images/services/solar-installation.webp` → `/public/images/og/solar-installation.jpg`
   - Convert `/images/services/header.webp` → `/public/images/og/header.jpg`
   - Convert `/images/olooji-community.webp` → `/public/images/og/olooji-community.jpg`
   - Convert `/images/services/streetlighting-infrastructure.webp` → `/public/images/og/streetlighting-infrastructure.jpg`

2. **Note:** Dynamic pages using Sanity images don't need local OG images as they use Sanity CDN URLs directly.
