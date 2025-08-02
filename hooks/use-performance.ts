'use client';

import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  interactionTime?: number;
}

interface PerformanceOptions {
  trackMemory?: boolean;
  trackInteractions?: boolean;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

export function usePerformance(options: PerformanceOptions = {}) {
  const { trackMemory = false, trackInteractions = false, onMetrics } = options;
  const startTime = useRef<number>(performance.now());
  const renderStartTime = useRef<number>(0);
  const interactionStartTime = useRef<number>(0);
  const metricsRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  });

  // Track render performance
  const trackRender = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    metricsRef.current.renderTime = renderTime;

    if (onMetrics) {
      onMetrics(metricsRef.current);
    }
  }, [onMetrics]);

  // Track interaction performance
  const trackInteraction = useCallback(() => {
    if (trackInteractions) {
      interactionStartTime.current = performance.now();
    }
  }, [trackInteractions]);

  const endInteraction = useCallback(() => {
    if (trackInteractions) {
      const interactionTime = performance.now() - interactionStartTime.current;
      metricsRef.current.interactionTime = interactionTime;

      if (onMetrics) {
        onMetrics(metricsRef.current);
      }
    }
  }, [trackInteractions, onMetrics]);

  // Track memory usage
  const trackMemoryUsage = useCallback(() => {
    if (trackMemory && 'memory' in performance) {
      const memory = (performance as any).memory;
      metricsRef.current.memoryUsage = memory.usedJSHeapSize;
    }
  }, [trackMemory]);

  // Initialize performance tracking
  useEffect(() => {
    trackRender();

    // Track load time
    const loadTime = performance.now() - startTime.current;
    metricsRef.current.loadTime = loadTime;

    // Track memory if enabled
    if (trackMemory) {
      trackMemoryUsage();
    }

    // Report initial metrics
    if (onMetrics) {
      onMetrics(metricsRef.current);
    }

    // Cleanup
    return () => {
      endRender();
    };
  }, [trackMemory, trackMemoryUsage, onMetrics, trackRender, endRender]);

  return {
    trackRender,
    endRender,
    trackInteraction,
    endInteraction,
    trackMemoryUsage,
    getMetrics: () => metricsRef.current,
  };
}

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  const startTime = useRef<number>(performance.now());
  const renderCount = useRef<number>(0);

  useEffect(() => {
    const renderTime = performance.now() - startTime.current;
    renderCount.current += 1;

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[${componentName}] Render #${renderCount.current}: ${renderTime.toFixed(2)}ms`
      );
    }

    // Report to analytics in production
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      (window as any).gtag
    ) {
      (window as any).gtag('event', 'component_render', {
        component_name: componentName,
        render_time: renderTime,
        render_count: renderCount.current,
      });
    }

    startTime.current = performance.now();
  });
}

// Hook for measuring API call performance
export function useApiPerformance() {
  const apiTimes = useRef<Map<string, number[]>>(new Map());

  const trackApiCall = useCallback((endpoint: string, duration: number) => {
    if (!apiTimes.current.has(endpoint)) {
      apiTimes.current.set(endpoint, []);
    }

    const times = apiTimes.current.get(endpoint)!;
    times.push(duration);

    // Keep only last 10 measurements
    if (times.length > 10) {
      times.shift();
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${endpoint}: ${duration.toFixed(2)}ms`);
    }

    // Report to analytics in production
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      (window as any).gtag
    ) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      (window as any).gtag('event', 'api_call', {
        endpoint,
        duration,
        average_duration: avgTime,
      });
    }
  }, []);

  const getApiStats = useCallback((endpoint: string) => {
    const times = apiTimes.current.get(endpoint) || [];
    if (times.length === 0) return null;

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    return { avg, min, max, count: times.length };
  }, []);

  return {
    trackApiCall,
    getApiStats,
  };
}
