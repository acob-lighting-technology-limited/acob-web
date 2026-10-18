/**
 * Loader choreography, in seconds.
 *
 * Deliberately free of 'use client' and of any framer-motion import: the
 * server-rendered intro panel reads these numbers to emit CSS delays, while
 * the client wordmark component reads the same ones for its motion props.
 * One source of truth, two renderers.
 */

/** Marks the session so the intro runs once, not on every reload. */
export const INTRO_SESSION_KEY = 'acob-intro-shown';
/** id the provider looks for when it's time to lift the curtain. */
export const INTRO_PANEL_ID = 'acob-intro';

export const BRAND = 'ACOB';
export const LIGHTING = 'LIGHTING';

/**
 * Gap between ACOB and LIGHTING, in em — a real space glyph collapses to zero
 * width because it's the sole content of an inline-block box (leading and
 * trailing whitespace inside that box gets trimmed), so the gap is a sized
 * spacer instead.
 */
export const WORD_GAP_EM = 0.32;

/**
 * Optical correction for the "@". Its bowl is drawn extending below the
 * baseline in most sans faces, while the lining digits beside it sit exactly
 * on it — so baseline-aligned, the "@" reads as sagging. Nudge it back up.
 */
export const AT_RISE_EM = 0.09;

type TimelineInput = {
  /** When the lone "A" lands. */
  aStart: number;
  /** When "C" starts; O and B follow on the stagger. */
  brandStart: number;
  brandStagger: number;
  /** How long one letter takes to swing out. */
  letterDuration: number;
  /** Gap after the last brand letter before LIGHTING begins. */
  lightingLead: number;
  lightingStagger: number;
  /** Gap after LIGHTING lands before TECHNOLOGY drops. */
  techLead: number;
  techDuration: number;
  /**
   * Beat after TECHNOLOGY lands before "@10" swings out. It waits for a
   * settled word — starting mid-slide made it ride down into place instead of
   * emerging from a stationary neighbour like every other letter.
   */
  anniversaryBeat: number;
  /** Beat to rest on the finished mark before the curtain takes it. */
  restBeat: number;
};

function buildTimeline(i: TimelineInput) {
  const lightingStart =
    i.brandStart + i.brandStagger * (BRAND.length - 1) + i.lightingLead;
  const techStart =
    lightingStart + i.lightingStagger * (LIGHTING.length - 1) + i.techLead;
  const anniversaryStart = techStart + i.techDuration + i.anniversaryBeat;

  return {
    ...i,
    lightingStart,
    techStart,
    anniversaryStart,
    /** One full pass. */
    duration: techStart + i.techDuration + i.restBeat,
    /** One full pass that also reveals "@10". */
    durationAnniversary: anniversaryStart + i.letterDuration + i.restBeat,
  };
}

export type LoaderTempo = 'tight' | 'full';

export const LOADER_TIMELINES: Record<
  LoaderTempo,
  ReturnType<typeof buildTimeline>
> = {
  /**
   * Ships to the site. Same choreography, paced between the original and the
   * earlier half-speed cut: about 3.7s with "@10" (4.7s with the curtain).
   * The half-speed version read as rushed; the original made every first
   * visit wait six seconds.
   */
  tight: buildTimeline({
    aStart: 0.12,
    brandStart: 0.5,
    brandStagger: 0.23,
    letterDuration: 0.5,
    lightingLead: 0.3,
    lightingStagger: 0.075,
    techLead: 0.25,
    techDuration: 0.58,
    anniversaryBeat: 0.09,
    restBeat: 0.28,
  }),

  /** The original, slower pacing — kept for comparison in /try. */
  full: buildTimeline({
    aStart: 0.15,
    brandStart: 0.7,
    brandStagger: 0.32,
    letterDuration: 0.62,
    lightingLead: 0.372,
    lightingStagger: 0.105,
    techLead: 0.35,
    techDuration: 0.75,
    anniversaryBeat: 0.12,
    restBeat: 0.4,
  }),
};

/** How long one pass runs, for callers that need to schedule around it. */
export function loaderDuration(
  tempo: LoaderTempo,
  withAnniversary: boolean,
): number {
  const t = LOADER_TIMELINES[tempo];
  return withAnniversary ? t.durationAnniversary : t.duration;
}

/** How long the curtain takes to clear the frame. */
export const EXIT_DURATION = 1.0;
