import { useCallback, useMemo, useState, type FocusEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Pause state for auto-advancing content (hero slideshows, rotating banners).
 * Autoplay stops while the pointer is over it, while keyboard focus is inside
 * it, when the visitor presses the pause control, and from the start when they
 * prefer reduced motion — WCAG 2.2.2 needs that for anything that moves on its
 * own for more than five seconds.
 */
export function useAutoplayPause() {
  const prefersReducedMotion = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Until the visitor chooses, reduced motion decides.
  const stopped = userPaused ?? Boolean(prefersReducedMotion);
  const paused = stopped || hovered || focused;

  const toggle = useCallback(() => setUserPaused(!stopped), [stopped]);

  const handlers = useMemo(
    () => ({
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      },
    }),
    [],
  );

  return { paused, stopped, toggle, handlers };
}
