import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#06060c',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Left accent gradient bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: 'linear-gradient(180deg, #ff5f1f 0%, #9b59f5 50%, #00d4ff 100%)',
            display: 'flex',
          }}
        />

        {/* Dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            position: 'absolute',
            top: 52,
            right: 80,
            width: 56,
            height: 56,
            background: '#0e0e1c',
            border: '1px solid rgba(255,95,31,0.45)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            fontWeight: 800,
            color: '#ff5f1f',
            fontFamily: 'serif',
          }}
        >
          A
        </div>

        {/* Portfolio label */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 13,
            color: '#ff5f1f',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: 40,
            display: 'flex',
          }}
        >
          PORTFOLIO — 2026
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#f0ede6',
            lineHeight: 1.05,
            marginBottom: 20,
            display: 'flex',
            fontFamily: 'sans-serif',
          }}
        >
          Akinola Adejoke Elizabeth
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 24,
            color: '#ff5f1f',
            marginBottom: 52,
            display: 'flex',
            fontFamily: 'sans-serif',
          }}
        >
          Full Stack Developer &amp; Multi-Chain Builder
        </div>

        {/* Tech tags */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Solidity', 'Cairo', 'Clarity', 'Stacks', 'EVM', 'Next.js', 'DeFi'].map((tag) => (
            <div
              key={tag}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: 4,
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#6b6b80',
                display: 'flex',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Twitter handle */}
        <div
          style={{
            position: 'absolute',
            bottom: 52,
            right: 80,
            fontFamily: 'monospace',
            fontSize: 13,
            color: '#6b6b80',
            display: 'flex',
          }}
        >
          @adejoke_btc
        </div>
      </div>
    ),
    { ...size }
  );
}
