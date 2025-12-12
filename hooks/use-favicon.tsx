import { useEffect } from 'react';
import { isChristmasPeriod } from '@/lib/utils/christmas-period';

export function useFavicon() {
  const updateFavicon = (isDark: boolean) => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    const isChristmas = isChristmasPeriod();
    const faviconPath = isChristmas
      ? isDark
        ? '/favicon-dark-christmas.ico'
        : '/favicon-light-christmas.ico'
      : isDark
        ? '/favicon-dark.ico'
        : '/favicon-light.ico';

    // Find or create favicon link
    let faviconLink = document.querySelector(
      "link[rel='icon']",
    ) as HTMLLinkElement;

    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.type = 'image/x-icon';
      document.head.appendChild(faviconLink);
    }

    // Update favicon if it's different
    if (faviconLink.href !== `${window.location.origin}${faviconPath}`) {
      faviconLink.href = faviconPath;
    }
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Check system preference using media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Initial check - set immediately
    updateFavicon(mediaQuery.matches);

    // Listen for system theme changes
    const handleChange = () => {
      updateFavicon(mediaQuery.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return { updateFavicon };
}
