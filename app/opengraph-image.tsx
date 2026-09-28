import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0e10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* One static glow, matching the hero. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 180,
            width: 900,
            height: 620,
            background:
              "radial-gradient(ellipse at center, rgba(255,138,101,0.16) 0%, rgba(94,234,212,0.07) 40%, transparent 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 99,
              background: "#5eead4",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 24,
              color: "#5eead4",
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {SITE.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2.4,
              color: "#f4f1ea",
              maxWidth: 940,
              display: "flex",
            }}
          >
            I build software that moves money and saves people work.
          </div>
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.4,
              color: "#9aa6aa",
              maxWidth: 860,
              display: "flex",
            }}
          >
            Full-stack products and smart contracts — Bitcoin Layer-2s, AI agents, and the
            software institutions actually use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 20,
            borderTop: "1px solid rgba(244,241,234,0.16)",
            paddingTop: 26,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 600, color: "#f4f1ea", display: "flex" }}>
            {SITE.name}
          </div>
          <div style={{ fontSize: 24, color: "#9aa6aa", display: "flex" }}>{SITE.location}</div>
          <div style={{ display: "flex", flex: 1 }} />
          <div style={{ fontSize: 24, color: "#9aa6aa", display: "flex" }}>
            4 case studies · 15 builds · live demos
          </div>
        </div>
      </div>
    ),
    size
  );
}
