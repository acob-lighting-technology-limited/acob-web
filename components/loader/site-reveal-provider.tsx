'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { EXIT_DURATION, INTRO_PANEL_ID } from './intro-timeline';

/**
 * Coordinates the intro loader with the page underneath it.
 *
 * The panel itself is server-rendered and animates in CSS (see intro-panel.tsx)
 * so it paints on the first byte. This provider only decides *when it leaves*:
 * at whichever comes later, the end of the build sequence or the page being
 * ready — with a hard ceiling either way.
 *
 * `revealed` flips a beat *before* the curtain has fully cleared, so the header
 * and hero are already moving as the panel rises — the two read as one motion
 * instead of two separate events.
 */

type SiteRevealValue = {
  /** True once the curtain is on its way up (or if the loader never ran). */
  revealed: boolean;
  /** Staggered delay in seconds for content entering behind the curtain. */
  revealDelay: (step?: number) => number;
};

const SiteRevealContext = createContext<SiteRevealValue>({
  revealed: true,
  revealDelay: () => 0,
});

/**
 * Content that has no provider above it (bare routes, Studio) must not sit
 * there invisible waiting for a reveal that never comes — hence the `true`
 * default above.
 */
export function useSiteReveal() {
  return useContext(SiteRevealContext);
}

/** Head start the content gets on the rising curtain. */
const REVEAL_LEAD = 0.35;
/** Spacing between staggered elements once the reveal fires. */
const REVEAL_STEP = 0.09;
/** Never hold the loader longer than this, whatever the network is doing. */
const MAX_LOADER_MS = 4000;

/**
 * The pre-paint script in intro-panel.tsx has already settled whether the
 * intro runs at all (repeat visit within the session, or reduced motion). Read
 * its verdict rather than re-deriving it — and read it during render, so a
 * skipped intro never leaves the page held hidden for a frame.
 */
function introSkipped(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  return document.documentElement.classList.contains('intro-skip');
}

export default function SiteRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(introSkipped);

  const finish = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('intro-leaving');

    /*
     * The page's own CSS entrance animations are frozen by data-loader-active
     * (set pre-paint, alongside the panel). They need to start *with* the
     * rising curtain, on the same beat the header and hero text move — not
     * once the panel is gone, which would leave the page a step behind its
     * own reveal.
     */
    const lead = window.setTimeout(() => {
      document.documentElement.removeAttribute('data-loader-active');
      setRevealed(true);
    }, REVEAL_LEAD * 1000);

    /*
     * Hidden, not removed: the panel is React-owned markup, and pulling it out
     * of the DOM by hand makes React throw when it later unmounts this subtree
     * (e.g. navigating from the site to /studio).
     */
    const done = window.setTimeout(() => {
      root.classList.add('intro-done');
      root.classList.remove('intro-active', 'intro-leaving');
      root.removeAttribute('data-loader-active');
      setRevealed(true);
    }, EXIT_DURATION * 1000);

    return () => {
      window.clearTimeout(lead);
      window.clearTimeout(done);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const panel = document.getElementById(INTRO_PANEL_ID);

    /* Skipped, or already played by an earlier mount of this provider. */
    if (!panel || introSkipped() || root.classList.contains('intro-done')) {
      root.classList.add('intro-done');
      root.classList.remove('intro-active');
      document.documentElement.removeAttribute('data-loader-active');
      setRevealed(true);
      return;
    }

    let cancelled = false;
    let cleanupExit: (() => void) | undefined;

    /*
     * The panel started animating when the document painted, which is well
     * before this effect runs — so the build's remaining time is measured from
     * that stamp, not from hydration.
     */
    const started = window.__acobIntroStart ?? Date.now();
    const buildMs = Number(panel.dataset.buildDuration ?? 0) * 1000;

    const lift = () => {
      if (cancelled) {
        return;
      }
      cancelled = true;
      cleanupExit = finish();
    };

    /* Case 1: the page is ready first — hold for the rest of the build. */
    /* Case 2: the build finishes first — the wordmark breathes until ready. */
    const liftWhenBuildDone = () => {
      const remaining = Math.max(0, started + buildMs - Date.now());
      window.setTimeout(lift, remaining);
    };

    /*
     * Readiness means "the page behind the curtain is worth looking at", not
     * "every byte has arrived". The `load` event is the wrong bar: it waits on
     * every image and embed on the route, so on a media-heavy page it fires
     * long after the view is painted and settled. What has to be true is that
     * React has hydrated (this effect is running) and the webfonts are in —
     * otherwise the reveal lands on fallback type and reflows a beat later.
     */
    const fonts =
      'fonts' in document ? document.fonts.ready : Promise.resolve(null);

    fonts
      .catch(() => null)
      .then(() => {
        /*
         * A frame past the font swap, so the reveal never catches a reflow --
         * but rAF never fires in a background tab, and a link opened in one is
         * an ordinary way to arrive here. Race it against a timer so a hidden
         * page still lifts on schedule instead of waiting out the ceiling.
         */
        let settled = false;
        const once = () => {
          if (settled) {
            return;
          }
          settled = true;
          liftWhenBuildDone();
        };
        requestAnimationFrame(() => requestAnimationFrame(once));
        window.setTimeout(once, 50);
      });

    /* Safety net: never hold the page past the ceiling, build or no build. */
    const cap = window.setTimeout(
      lift,
      Math.max(0, started + MAX_LOADER_MS - Date.now()),
    );

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
      cleanupExit?.();
    };
  }, [finish]);

  const value = useMemo<SiteRevealValue>(
    () => ({
      revealed,
      revealDelay: (step = 0) => (revealed ? step * REVEAL_STEP : 0),
    }),
    [revealed],
  );

  return (
    <SiteRevealContext.Provider value={value}>
      {children}
    </SiteRevealContext.Provider>
  );
}
