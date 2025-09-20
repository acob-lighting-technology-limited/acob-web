// File: app/loading.tsx (Simplest solution)
'use client';

import { useEffect } from 'react';
import SimpleSpinnerExit from '@/components/loader/simple-spinner-exit';

export default function Loading() {
  useEffect(() => {
    // Hide body scroll and layout elements
    document.body.style.overflow = 'hidden';

    // Hide layout elements
    const elementsToHide = [
      'header',
      'footer',
      '[data-chatbot]',
      // '[data-cookie-consent]',
      '[data-scroll-to-top]',
    ];

    const hiddenElements: Element[] = [];

    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        hiddenElements.push(el);
        (el as HTMLElement).style.display = 'none';
      });
    });

    // Remove main border
    const main = document.querySelector('main');
    if (main) {
      main.style.border = 'none';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      hiddenElements.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
      if (main) {
        main.style.border = '';
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-background">
      <SimpleSpinnerExit preview={true} />
    </div>
  );
}
