interface SafeFetchOptions<T = unknown> extends RequestInit {
  fallbackData?: T;
  timeout?: number;
  retries?: number;
}

interface SafeFetchResponse<T> {
  data: T | null;
  error: string | null;
  isOffline: boolean;
}

/**
 * Safe fetch utility that handles network errors gracefully
 */
export async function safeFetch<T>(
  url: string,
  options: SafeFetchOptions<T> = {}
): Promise<SafeFetchResponse<T>> {
  const {
    fallbackData = null,
    timeout = 10000,
    retries = 1,
    ...fetchOptions
  } = options;

  // Check if we're offline
  if (!navigator.onLine) {
    return {
      data: fallbackData as T | null,
      error: 'No internet connection',
      isOffline: true,
    };
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        error: null,
        isOffline: false,
      };
    } catch (error) {
      const isLastAttempt = attempt === retries;
      const isNetworkError =
        error instanceof TypeError ||
        error instanceof DOMException ||
        (error as Error).message.includes('fetch failed') ||
        (error as Error).message.includes('NetworkError') ||
        (error as Error).message.includes('Failed to fetch') ||
        (error as Error).message.includes('ERR_NETWORK') ||
        (error as Error).message.includes('aborted');

      if (isNetworkError && isLastAttempt) {
        return {
          data: fallbackData as T | null,
          error: 'Network error - please check your connection',
          isOffline: true,
        };
      }

      if (isLastAttempt) {
        return {
          data: fallbackData as T | null,
          error: (error as Error).message,
          isOffline: false,
        };
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries) {
        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  return {
    data: fallbackData as T | null,
    error: 'Unknown error occurred',
    isOffline: false,
  };
}

/**
 * Safe fetch with automatic error handling and fallback
 */
export async function safeFetchWithFallback<T>(
  url: string,
  fallbackData: T,
  options: Omit<SafeFetchOptions, 'fallbackData'> = {}
): Promise<T> {
  const result = await safeFetch<T>(url, { ...options, fallbackData });
  return result.data || fallbackData;
}

/**
 * Hook for safe fetch with state management
 */
export function useSafeFetch<T>() {
  const fetchData = async (
    url: string,
    options: SafeFetchOptions<T> = {}
  ): Promise<SafeFetchResponse<T>> => {
    return safeFetch<T>(url, options);
  };

  return { fetchData };
}
