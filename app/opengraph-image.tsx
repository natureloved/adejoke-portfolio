import { headers } from "next/headers";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link-preview card.
 *
 * Two things matter here that are easy to get wrong:
 *
 * 1. Satori cannot read woff2, which is what next/font serves the site, so the
 *    real brand faces are pulled from the woff2 sources in public/fonts. Using
 *    system fonts instead renders a card that does not look like the site.
 * 2. The card has to read at roughly 400px wide in a chat client, so the
 *    headline is short and the proof numbers are large. A card that only works
 *    at full size does not work at all where it is actually seen.
 */

const INK = "#16210f";
const MUTED = "#5f6a51";
const GREEN = "#2c4531";
const LIME = "#dff3a4";
const PAPER = "#fbfcf5";
const LINE = "#dfe4d2";

const PROOF = [
  { value: "12", label: "live demos" },
  { value: "19", label: "open source" },
  { value: "109", label: "tests shipped" },
];

/**
 * Fonts have to be fetched over HTTP because webpack resolves `public/` paths
 * statically at build time and cannot see them from an edge route. The origin
 * is the canonical site when it is configured, otherwise the host of the
 * current request so local dev and preview deployments load the local files
 * instead of reaching for production.
 */
function fontUrl(origin: string, file: string) {
  return `${origin}/fonts/${file}`;
}

export default async function OGImage() {
  // Next.js calls this with no arguments, so the request headers have to come
  // from headers() rather than a request argument.
  const h = headers();
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (h.get("x-forwarded-proto") ?? "https") +
      "://" +
      (h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000");

  const [serif, serifItalic, sans, sansMedium, mono] = await Promise.all(
    [
      "instrument-serif.ttf",
      "instrument-serif-italic.ttf",
      "dm-sans-regular.ttf",
      "dm-sans-medium.ttf",
      "dm-mono-regular.ttf",
    ].map((f) => fetch(fontUrl(origin, f)).then((r) => r.arrayBuffer()))
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          position: "relative",
          fontFamily: "DM Sans",
        }}
      >
        {/* Faint grid, matching the art board in the page hero. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(#e9ecdd 1px, transparent 1px), linear-gradient(90deg, #e9ecdd 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.6,
            display: "flex",
          }}
        />
        {/* Lime glow in the corner, echoing the contact panel. */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "radial-gradient(circle, #dff3a4 0%, rgba(223,243,164,0) 70%)",
            display: "flex",
          }}
        />

        {/* Top row: identity and availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "52px 64px 0",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: GREEN,
                color: LIME,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                transform: "rotate(-5deg)",
              }}
            >
              ✦
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 32, fontWeight: 500, color: INK, letterSpacing: -0.8 }}>
                {SITE.name}
              </div>
              <div
                style={{
                  fontSize: 19,
                  color: MUTED,
                  fontFamily: "DM Mono",
                  letterSpacing: 0.4,
                  marginTop: 2,
                }}
              >
                Full-stack &amp; blockchain developer
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 22px",
              border: "1px solid #d5dcc6",
              background: "#ffffff",
              borderRadius: 999,
              fontSize: 20,
              color: GREEN,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#7fa33f",
                display: "flex",
              }}
            />
            Open to work
          </div>
        </div>

        {/* Headline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 64px",
            zIndex: 1,
          }}
        >
          {/* Two pinned lines rather than one wrapping paragraph. Wrapping is
              left to chance, and a card that reflows when the webfont lands
              will drop a word onto a third line and crowd the proof row.
              Each line is a single row; the accent phrase is a nested span so
              it can be serif italic without breaking the flex line. */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: -3,
              color: INK,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div style={{ display: "flex" }}>I build software that</div>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: GREEN,
                  letterSpacing: -1.5,
                }}
              >
                moves money
              </span>
              <span> and saves people work.</span>
            </div>
          </div>

          <div
            style={{
              fontSize: 27,
              lineHeight: 1.45,
              color: MUTED,
              maxWidth: 900,
              marginTop: 22,
              display: "flex",
            }}
          >
            Bitcoin Layer-2 lending, on-chain agents, and the software institutions rely on.
            Most of it ships live and open source.
          </div>
        </div>

        {/* Bottom row: proof numbers, the part that survives being shrunk */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 64px",
            paddingTop: 30,
            paddingBottom: 46,
            borderTop: `1px solid ${LINE}`,
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: 52 }}>
            {PROOF.map((p) => (
              <div key={p.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 44, fontWeight: 500, color: GREEN, letterSpacing: -1.6 }}>
                  {p.value}
                </div>
                <div style={{ fontSize: 22, color: MUTED }}>{p.label}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 24,
              color: MUTED,
              fontFamily: "DM Mono",
              display: "flex",
            }}
          >
            {SITE.availability}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "DM Sans", data: sans, style: "normal", weight: 400 },
        { name: "DM Sans", data: sansMedium, style: "normal", weight: 500 },
        { name: "DM Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
