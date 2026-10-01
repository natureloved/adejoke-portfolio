/**
 * Inline SVG sprite.
 *
 * The design system draws its icons with `stroke: currentColor` and refers to
 * them as `<use href="#i-name">`, so every icon inherits text colour and
 * responds to font-size without a second asset request. Inlining avoids a
 * sprite fetch that would otherwise delay first paint.
 *
 * Every path is drawn on a 24x24 grid, which is what VIEWBOX publishes. The
 * consuming `<svg>` carries it too, because that is what stops the browser
 * from scaling a 24-unit path into whatever pixel box the element happens to
 * have. Without it the same arrow is drawn at a different size and stroke
 * weight in a 17px button, a 34px circle and the 23px toolkit strip, and at
 * the small end the arrowhead starts clipping. `<use>` inherits the
 * viewBox from the referencing element, so putting it on the `<svg>` in
 * components/ui.tsx fixes every icon at once.
 */
const VIEWBOX = "0 0 24 24";
const PATHS: Record<string, string> = {
  "i-sparkle":
    "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z",
  "i-plus": "M12 5v14M5 12h14",
  "i-check": "M4 12.5l5 5L20 6.5",
  "i-chevron": "M6 9l6 6 6-6",
  "i-arrow-right": "M4 12h16M14 6l6 6-6 6",
  "i-arrow-up-right": "M7 17L17 7M8 7h9v9",
  "i-arrow-down": "M12 4v16M6 14l6 6 6-6",
  "i-grid": "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  "i-wallet":
    "M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0 0V6.5A1.5 1.5 0 0 1 4.5 5H16M17 12.5h.01",
  "i-chart": "M4 19V5M4 19h16M8 15l3.5-4 3 2.5L20 8",
  "i-settings":
    "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.56-1.1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10a1.7 1.7 0 0 0 1-1.56V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V10a1.7 1.7 0 0 0 1.56 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z",
  "i-code": "M9 18l-6-6 6-6M15 6l6 6-6 6",
  "i-cube": "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z M4 7.5l8 4.5 8-4.5M12 12v9",
  "i-window":
    "M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11ZM3 9.5h18",
  "i-layers": "M12 3l9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5",
  "i-message":
    "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V17h-.5A1.5 1.5 0 0 1 4 15.5v-9Z",
  "i-pin": "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  "i-globe":
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  "i-leaf": "M4 20C3 12 8 5 20 4c1 12-5 16-12 15M4 20c3-5 7-8 11-9",
  "i-bag": "M6 8h12l-1 12H7L6 8ZM9 8V6a3 3 0 0 1 6 0v2",
  "i-copy": "M9 9h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2ZM5 15V5a2 2 0 0 1 2-2h8",
  "i-mail": "M4 6h16v12H4zM4 7l8 6 8-6",
  "i-github":
    "M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.8c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.6.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z",
  "i-linkedin":
    "M4.5 4.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3 9.5h3V21H3zM9 9.5h2.9v1.6h.1a3.2 3.2 0 0 1 2.8-1.6c3 0 3.6 2 3.6 4.6V21h-3v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9Z",
  "i-x": "M4 4l16 16M20 4L4 20",
  "i-download": "M12 4v11M7.5 11l4.5 4.5 4.5-4.5M4.5 20h15",
  "i-menu": "M4 7h16M4 12h16M4 17h16",
  "i-file": "M6 3h8l4 4v14H6V3ZM14 3v4h4",
};

export default function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      viewBox={VIEWBOX}
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {Object.entries(PATHS).map(([id, d]) => (
          <path key={id} id={id} d={d} />
        ))}
      </defs>
    </svg>
  );
}
