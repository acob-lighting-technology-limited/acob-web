import { useTheme } from "next-themes";
import { useEffect } from "react";

export function useFavicon() {
  const { resolvedTheme } = useTheme();

  const updateFavicon = (theme: string) => {
    const faviconPath = theme === "dark" 
      ? "/favicon-dark.ico" 
      : "/favicon-light.ico";
    
    let faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      faviconLink.type = "image/x-icon";
      document.head.appendChild(faviconLink);
    }

    faviconLink.href = faviconPath;
  };

  useEffect(() => {
    if (resolvedTheme) {
      updateFavicon(resolvedTheme);
    }
  }, [resolvedTheme]);

  return { updateFavicon };
}