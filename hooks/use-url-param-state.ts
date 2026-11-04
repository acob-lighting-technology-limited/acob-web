import { useCallback, useEffect, useState } from 'react';

/**
 * A string state mirrored to one query parameter (e.g. ?category=…), so a
 * filtered view can be shared, bookmarked and survives a reload. Uses the
 * History API directly rather than useSearchParams, which would force every
 * page using it into a Suspense boundary for static rendering.
 */
export function useUrlParamState(key: string, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  // Read the initial value after mount so server and client render the same
  // markup first.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(key);
    if (fromUrl) {
      setValue(fromUrl);
    }
  }, [key]);

  const update = useCallback(
    (next: string) => {
      setValue(next);
      const url = new URL(window.location.href);
      if (next === defaultValue) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, next);
      }
      window.history.replaceState(window.history.state, '', url);
    },
    [key, defaultValue],
  );

  return [value, update] as const;
}
