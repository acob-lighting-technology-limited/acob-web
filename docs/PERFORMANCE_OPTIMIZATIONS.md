# Performance Optimizations Guide

## 🚀 **Overview**

This document outlines the performance optimizations implemented in the ACOB Lighting Technology Limited project to ensure fast loading times, smooth user interactions, and optimal resource usage.

## 📊 **Performance Metrics**

### **Target Metrics:**

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Time to Interactive (TTI)**: < 3.8s

## 🔧 **Component Optimizations**

### **React.memo Implementation**

Components are wrapped with `React.memo` to prevent unnecessary re-renders:

```typescript
const HeroSection = React.memo(function HeroSection() {
  // Component logic
});

export { HeroSection };
```

### **useMemo and useCallback Usage**

Expensive calculations and functions are memoized:

```typescript
// Memoize expensive calculations
const currentSlideData = useMemo(
  () => heroSlides[currentSlide],
  [currentSlide]
);

// Memoize callback functions
const nextSlide = useCallback(() => {
  changeSlide((currentSlide + 1) % heroSlides.length);
}, [currentSlide, changeSlide]);
```

### **Optimized Components:**

- ✅ `HeroSection` - Memoized with useMemo for slide data
- ✅ `ServicesSection` - React.memo wrapper
- ✅ `OptimizedImage` - Enhanced with error handling and loading states

## 📦 **Bundle Optimization**

### **Code Splitting**

Heavy components are lazy-loaded using dynamic imports:

```typescript
// Lazy load heavy components
export const LazyChatBot = dynamic(() => import('./features/chat-bot'), {
  loading: () => <div className="loading-placeholder" />,
  ssr: false,
});
```

### **Lazy-Loaded Components:**

- ✅ `ChatBot` - Loaded only when needed
- ✅ `BackupStrategy` - Admin-only component
- ✅ `CookieConsent` - Non-critical component
- ✅ `ProjectsSection` - Heavy data component
- ✅ `NewsSection` - Dynamic content component

### **Package Optimization**

Next.js configuration optimizes package imports:

```typescript
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}
```

## 🖼️ **Image Optimization**

### **Enhanced OptimizedImage Component**

- **Loading states** with skeleton placeholders
- **Error handling** with fallback UI
- **Performance monitoring** with loading metrics
- **Responsive sizing** with proper `sizes` attribute
- **Format optimization** (WebP, AVIF)

### **Next.js Image Configuration**

```typescript
images: {
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

## 💾 **Caching Strategies**

### **Custom Cache Hook**

Implemented `useCache` hook for client-side caching:

```typescript
const { data, loading, error, refetch } = useCache(
  'projects',
  () => fetchProjects(),
  { ttl: 5 * 60 * 1000, maxSize: 100 }
);
```

### **Cache Features:**

- **TTL (Time To Live)** - Configurable cache expiration
- **Max Size** - Prevents memory leaks
- **Automatic cleanup** - Removes expired items
- **Force refresh** - Bypass cache when needed
- **Error handling** - Graceful fallbacks

### **API Caching**

```typescript
const { data, loading } = useApiCache('/api/projects', {
  ttl: 10 * 60 * 1000, // 10 minutes
  headers: { Authorization: `Bearer ${token}` },
});
```

## 📈 **Performance Monitoring**

### **Performance Hooks**

- **`usePerformance`** - Track component performance
- **`useRenderPerformance`** - Monitor render times
- **`useApiPerformance`** - Track API call performance

### **Metrics Tracking**

```typescript
const { trackRender, endRender } = usePerformance({
  trackMemory: true,
  onMetrics: metrics => {
    // Send to analytics
    gtag('event', 'performance', metrics);
  },
});
```

### **Development Monitoring**

- Console logging in development mode
- Performance warnings for slow components
- API call timing analysis

## ⚡ **Build Optimizations**

### **Next.js Configuration**

```typescript
{
  swcMinify: true, // Faster minification
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}
```

### **Bundle Analysis**

- Tree shaking for unused code
- Dynamic imports for code splitting
- Optimized package imports
- SVG optimization with SVGR

## 🎯 **Best Practices**

### **Component Guidelines**

1. **Use React.memo** for components that receive stable props
2. **Memoize expensive calculations** with useMemo
3. **Memoize callback functions** with useCallback
4. **Lazy load heavy components** with dynamic imports
5. **Implement proper loading states**

### **Image Guidelines**

1. **Use OptimizedImage component** for all images
2. **Provide proper alt text** for accessibility
3. **Use appropriate sizes** for responsive design
4. **Optimize formats** (WebP, AVIF)
5. **Implement lazy loading** for below-fold images

### **Caching Guidelines**

1. **Set appropriate TTL** based on data volatility
2. **Implement cache invalidation** strategies
3. **Monitor cache hit rates** and performance
4. **Use force refresh** for critical updates
5. **Handle cache misses** gracefully

### **Performance Monitoring**

1. **Track Core Web Vitals** in production
2. **Monitor component render times** in development
3. **Analyze API call performance**
4. **Set up performance budgets**
5. **Implement performance alerts**

## 🔍 **Performance Testing**

### **Lighthouse Audits**

Run regular Lighthouse audits to monitor:

- Performance score
- Accessibility score
- Best practices score
- SEO score

### **Web Vitals Monitoring**

Track real user metrics:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

### **Bundle Analysis**

Use `@next/bundle-analyzer` to:

- Identify large dependencies
- Optimize bundle sizes
- Remove unused code
- Analyze code splitting effectiveness

## 🚨 **Performance Alerts**

### **Thresholds**

- **LCP > 2.5s** - Critical performance issue
- **FID > 100ms** - Interaction responsiveness issue
- **CLS > 0.1** - Layout stability issue
- **Bundle size > 500KB** - Bundle optimization needed

### **Monitoring Setup**

1. **Google Analytics 4** - Real user metrics
2. **Web Vitals** - Core performance metrics
3. **Custom performance hooks** - Component-level monitoring
4. **Error tracking** - Performance-related errors

## 📚 **Resources**

### **Tools**

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [React DevTools Profiler](https://react.dev/learn/profiler)

### **Documentation**

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Performance](https://web.dev/performance/)

### **Monitoring**

- [Google Analytics](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
