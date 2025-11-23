'use client';

import { useEffect } from 'react';

/**
 * Global image protection provider
 * Adds context menu protection to all images on the page
 */
export function ImageProtectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Function to show custom context menu
    const showCustomContextMenu = (
      e: globalThis.MouseEvent,
      _img: globalThis.HTMLImageElement,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      // Remove any existing custom menu
      const existingMenu = document.getElementById('custom-image-context-menu');
      if (existingMenu) {
        existingMenu.remove();
      }

      // Create custom context menu
      const menu = document.createElement('div');
      menu.id = 'custom-image-context-menu';
      menu.className =
        'fixed z-[99999] min-w-[220px] rounded-lg border border-border bg-background p-2 shadow-lg backdrop-blur-sm';
      menu.style.left = `${Math.min(e.pageX, window.innerWidth - 240)}px`;
      menu.style.top = `${Math.min(e.pageY, window.innerHeight - 100)}px`;

      menu.innerHTML = `
        <div class="px-3 py-2 text-xs font-medium text-foreground border-b border-border mb-1">
          Image Protection
        </div>
        <div class="px-3 py-1.5 text-xs text-muted-foreground">
          Images are protected by copyright
        </div>
        <div class="px-3 py-1.5 text-xs text-muted-foreground">
          © ACOB Lighting Technology Limited
        </div>
      `;

      document.body.appendChild(menu);

      // Close menu when clicking elsewhere
      const closeMenu = (event: globalThis.MouseEvent) => {
        if (!menu.contains(event.target as Node)) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      };

      setTimeout(() => {
        document.addEventListener('click', closeMenu);
      }, 0);
    };

    // Add event listener to all images
    const handleContextMenu = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent;
      const target = mouseEvent.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        const img = (
          target.tagName === 'IMG' ? target : target.closest('img')
        ) as globalThis.HTMLImageElement;
        if (img && !img.hasAttribute('data-no-protection')) {
          showCustomContextMenu(mouseEvent, img);
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      const menu = document.getElementById('custom-image-context-menu');
      if (menu) {
        menu.remove();
      }
    };
  }, []);

  return <>{children}</>;
}
