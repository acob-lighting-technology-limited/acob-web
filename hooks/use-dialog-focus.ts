import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), video[controls]';

function focusableIn(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    el => !el.hasAttribute('inert') && el.getClientRects().length > 0,
  );
}

/**
 * Modal focus behaviour for the hand-rolled overlays (mobile menu, lightbox,
 * chat panel) that don't go through Radix Dialog: moves focus in on open,
 * keeps Tab inside, closes on Escape, and hands focus back to whatever opened
 * it on close.
 */
export function useDialogFocus(
  containerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
) {
  // Read through a ref so a new onClose each render doesn't re-run the effect
  // (which would yank focus back to the first element mid-interaction).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const opener = document.activeElement as HTMLElement | null;

    // The panel may still be mounting/animating in; wait a frame for it.
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container || container.contains(document.activeElement)) {
        return;
      }
      // A [data-autofocus] field wins on desktop; on touch it would pop the
      // on-screen keyboard over the panel, so start at the first control.
      const preferred = window.matchMedia('(pointer: fine)').matches
        ? container.querySelector<HTMLElement>(
            '[data-autofocus]:not([disabled])',
          )
        : null;
      const [first] = focusableIn(container);
      (preferred ?? first ?? container).focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const items = focusableIn(container);
      if (items.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || !container.contains(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKeyDown);
      if (opener && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [isOpen, containerRef]);
}
