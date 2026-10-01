"use client";

import { useEffect, useState } from "react";
import { Icon } from "./ui";

/** Distance from the bottom of the viewport, matching `.back-to-top` in CSS. */
const RESTING_OFFSET = 22;

/**
 * A floating "back to top" button.
 *
 * The footer already has a text link, but a link at the very bottom of the
 * page only helps once the reader has already reached it. This one follows
 * the scroll, so the long way back up is one tap from anywhere.
 *
 * It appears only after the reader has left the hero: at the top of the
 * page the button would point at content already on screen, and on a phone
 * it would cover the start of the hero.
 *
 * The click uses scrollIntoView rather than an anchor. `#top` would move
 * focus along with the scroll, and putting the reader's cursor back at the
 * top of a page they were reading disrupts them. The browser's own smooth
 * scroll applies, and the global reduced-motion block turns it into an
 * instant jump.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);
  const [lift, setLift] = useState(0);

  useEffect(() => {
    // Past roughly two viewport heights, so it appears on a long page but
    // not the moment the reader nudges the wheel.
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * The footer has its own "Back to the top" text link in the bottom-right,
   * and the button would land on top of it: two controls for the same action
   * stacked on each other.
   *
   * The lift is computed, not guessed. A fixed offset does not survive
   * because that link renders at a different place depending on the
   * viewport: at 1440px it sits beside the copyright, at 1024px it wraps
   * beneath it, and the two arrangements put its top edge a different
   * distance up the screen. So the button's resting bottom is compared
   * against the link's top edge and it rises by the overlap.
   *
   * The comparison deliberately reads where the button WOULD be at its
   * resting offset rather than where it currently is. Measuring the live
   * position would make it chase its own tail: lift once, the next scroll
   * reads the moved position, and the value drifts. Comparing against the
   * resting position is stable, so one pass either lifts it clear or
   * reports no overlap.
   */
  useEffect(() => {
    const link = document.querySelector<HTMLElement>(".footer-bottom a");
    if (!link) return;

    const measure = () => {
      const linkTop = link.getBoundingClientRect().top;
      const restingBottom = window.innerHeight - RESTING_OFFSET;
      const overlap = restingBottom - linkTop + 8;
      setLift(overlap > 0 ? overlap : 0);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Back to top"
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      data-shown={shown ? "true" : "false"}
      style={lift > 0 ? { bottom: `${RESTING_OFFSET + lift}px` } : undefined}
      onClick={() => {
        const hero = document.querySelector<HTMLElement>("#top");
        if (hero) hero.scrollIntoView({ block: "start" });
        else window.scrollTo({ top: 0 });
      }}
    >
      <Icon name="i-arrow-up" />
    </button>
  );
}
