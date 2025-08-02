import NProgress from '@/lib/nprogress';

interface ApiWithProgressOptions {
  showProgress?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export async function apiWithProgress<T>(
  apiCall: () => Promise<T>,
  options: ApiWithProgressOptions = {}
): Promise<T> {
  const { showProgress = true, onStart, onComplete, onError } = options;

  try {
    if (showProgress) {
      NProgress.start();
    }

    if (onStart) {
      onStart();
    }

    const result = await apiCall();

    if (onComplete) {
      onComplete();
    }

    return result;
  } catch (error) {
    if (onError) {
      onError(error as Error);
    }
    throw error;
  } finally {
    if (showProgress) {
      NProgress.done();
    }
  }
}

// Convenience function for fetch with progress
export async function fetchWithProgress<T>(
  url: string,
  options: RequestInit = {},
  progressOptions: ApiWithProgressOptions = {}
): Promise<T> {
  return apiWithProgress(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, progressOptions);
}
