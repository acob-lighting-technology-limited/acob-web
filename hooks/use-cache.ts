'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheOptions {
  ttl?: number; // Default TTL in milliseconds (5 minutes)
  maxSize?: number; // Maximum number of items in cache
}

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) {
  const { ttl = 5 * 60 * 1000, maxSize = 100 } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Map<string, CacheItem<T>>>(new Map());

  // Clean up expired cache items
  const cleanupCache = useCallback(() => {
    const now = Date.now();
    const cache = cacheRef.current;

    for (const [cacheKey, item] of cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        cache.delete(cacheKey);
      }
    }
  }, []);

  // Get data from cache
  const getFromCache = useCallback(
    (cacheKey: string): T | null => {
      cleanupCache();
      const item = cacheRef.current.get(cacheKey);
      if (item && Date.now() - item.timestamp < item.ttl) {
        return item.data;
      }
      return null;
    },
    [cleanupCache]
  );

  // Set data in cache
  const setInCache = useCallback(
    (cacheKey: string, data: T, customTtl?: number) => {
      cleanupCache();

      // Remove oldest items if cache is full
      if (cacheRef.current.size >= maxSize) {
        const oldestKey = cacheRef.current.keys().next().value;
        cacheRef.current.delete(oldestKey);
      }

      cacheRef.current.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl: customTtl || ttl,
      });
    },
    [cleanupCache, maxSize, ttl]
  );

  // Fetch data with caching
  const fetchData = useCallback(
    async (forceRefresh = false) => {
      const cacheKey = key;

      if (!forceRefresh) {
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
          setData(cachedData);
          return cachedData;
        }
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        setData(result);
        setInCache(cacheKey, result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [key, fetcher, getFromCache, setInCache]
  );

  // Invalidate cache for specific key
  const invalidateCache = useCallback(
    (cacheKey?: string) => {
      const keyToInvalidate = cacheKey || key;
      cacheRef.current.delete(keyToInvalidate);
    },
    [key]
  );

  // Clear all cache
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    invalidateCache,
    clearCache,
    refetch: () => fetchData(true),
  };
}

// Hook for caching API responses
export function useApiCache<T>(
  url: string,
  options: CacheOptions & {
    headers?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  } = {}
) {
  const { headers = {}, method = 'GET', body, ...cacheOptions } = options;

  const fetcher = useCallback(async (): Promise<T> => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }, [url, method, headers, body]);

  return useCache(url, fetcher, cacheOptions);
}
