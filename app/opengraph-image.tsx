import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#16210f";
const MUTED = "#69765a";
const GREEN = "#2c4531";
const LIME = "#dff3a4";

/** Matches the light editorial palette of the live page. */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fbfcf5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          position: "relative",
          border: "1px solid #e6ead9",
        }}
      >
        {/* Faint grid, echoing the art board in the hero. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#e9ecdd 1px, transparent 1px), linear-gradient(90deg, #e9ecdd 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -170,
            right: -110,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "radial-gradient(circle, #dff3a4 0%, rgba(223,243,164,0) 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: GREEN,
              color: LIME,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: 27, color: GREEN, display: "flex" }}>
            {SITE.name}
            <span style={{ color: "#7a9c3d" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 1 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 500,
              lineHeight: 1.06,
              letterSpacing: -2.6,
              color: INK,
              maxWidth: 950,
              display: "flex",
            }}
          >
            I build software that moves money and saves people work.
          </div>
          <div
            style={{
              fontSize: 25,
              lineHeight: 1.5,
              color: MUTED,
              maxWidth: 860,
              display: "flex",
            }}
          >
            Bitcoin Layer-2 lending, voice payments, AI agents that act on-chain, and the
            software institutions actually use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            borderTop: "1px solid #dfe4d2",
            paddingTop: 24,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: GREEN,
              border: "1px solid #d5dcc6",
              background: "#ffffff",
              borderRadius: 999,
              padding: "8px 18px",
              display: "flex",
            }}
          >
            Open to work
          </div>
          <div style={{ fontSize: 22, color: MUTED, display: "flex" }}>{SITE.location}</div>
          <div style={{ display: "flex", flex: 1 }} />
          <div style={{ fontSize: 22, color: MUTED, display: "flex" }}>
            12 live demos · 19 open source
          </div>
        </div>
      </div>
    ),
    size
  );
}
