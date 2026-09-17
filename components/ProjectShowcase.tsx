"use client";

import { useState } from "react";
import { FEATURED_PROJECTS, FeaturedProject } from "@/data/portfolio";

/* ── Interactive Preview for 01 / STAXIQ ─────────────────── */
function StaxiqPreview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="preview-container staxiq-atmosphere">
      <div className="preview-chrome">
        <div className="chrome-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="chrome-title">STAXIQ // BITCOIN L2 DEFI AGGREGATOR</div>
        <div className="chrome-status">
          <span className="live-pill" />
          <span>STACKS MAINNET</span>
        </div>
      </div>

      <div className="preview-body">
        {/* Metric Bar */}
        <div className="market-stat-bar">
          <div className="stat-box">
            <span className="stat-label">TOTAL L2 TVL</span>
            <span className="stat-val stat-green">$312.4M</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">24H VOLUME</span>
            <span className="stat-val">$48.9M</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">AI SIGNAL</span>
            <span className="stat-val stat-signal">OPTIMIZE YIELD</span>
          </div>
        </div>

        {/* Dynamic Card Grid - Reorganizes on hover */}
        <div className={`protocol-grid ${isHovered ? "is-reorganized" : ""}`}>
          <div className="protocol-card main-card">
            <div className="proto-head">
              <span className="proto-name">ALEX Protocol</span>
              <span className="proto-badge">AMM / DEX</span>
            </div>
            <div className="proto-metrics">
              <div className="proto-row">
                <span>Liquidity STX/sUSDC</span>
                <span className="val-bright">$142.8M</span>
              </div>
              <div className="proto-row">
                <span>Annualized Yield</span>
                <span className="val-accent">14.2% APY</span>
              </div>
            </div>
            <div className="proto-bar">
              <div className="bar-fill" style={{ width: isHovered ? "88%" : "72%" }} />
            </div>
          </div>

          <div className="protocol-card sub-card">
            <div className="proto-head">
              <span className="proto-name">Velar DEX</span>
              <span className="proto-badge">Orderbook</span>
            </div>
            <div className="proto-metrics">
              <div className="proto-row">
                <span>24H STX Swaps</span>
                <span className="val-bright">2.4M STX</span>
              </div>
              <div className="proto-row">
                <span>Spread</span>
                <span className="val-accent">0.08%</span>
              </div>
            </div>
          </div>

          <div className="protocol-card sub-card">
            <div className="proto-head">
              <span className="proto-name">Bitflow Protocol</span>
              <span className="proto-badge">Stable Pool</span>
            </div>
            <div className="proto-metrics">
              <div className="proto-row">
                <span>TVL Reserve</span>
                <span className="val-bright">$71.2M</span>
              </div>
              <div className="proto-row">
                <span>Yield Route</span>
                <span className="val-accent">+9.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-action-hint">
          <span>{isHovered ? "⚡ Market depth reorganised dynamically" : "Hover to trigger portfolio rebalance simulation"}</span>
        </div>
      </div>

      <style jsx>{`
        .staxiq-atmosphere {
          background: #090e0b;
          border-color: rgba(0, 240, 118, 0.25);
        }
        .stat-green { color: #00f076; font-weight: 600; }
        .stat-signal { color: #5eead4; font-family: var(--font-mono); font-size: 0.72rem; }
        .market-stat-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: rgba(0, 240, 118, 0.04);
          border: 1px solid rgba(0, 240, 118, 0.12);
        }
        .stat-box { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-label { font-family: var(--font-mono); font-size: 0.58rem; color: var(--muted); }
        .stat-val { font-size: 0.95rem; font-weight: 600; }
        .protocol-grid {
          display: grid;
          gap: 0.75rem;
          transition: transform 0.4s ease;
        }
        .protocol-card {
          padding: 0.85rem 1rem;
          background: rgba(14, 21, 17, 0.85);
          border: 1px solid rgba(0, 240, 118, 0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .protocol-grid.is-reorganized .main-card {
          border-color: #00f076;
          box-shadow: 0 4px 20px rgba(0, 240, 118, 0.15);
          transform: translateY(-2px);
        }
        .proto-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
        }
        .proto-name { font-size: 0.84rem; font-weight: 600; color: var(--white); }
        .proto-badge {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          padding: 0.15rem 0.45rem;
          background: rgba(0, 240, 118, 0.1);
          color: #00f076;
        }
        .proto-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--muted);
          margin-bottom: 0.3rem;
        }
        .val-bright { color: var(--white); font-weight: 500; }
        .val-accent { color: #00f076; font-weight: 600; }
        .proto-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          margin-top: 0.6rem;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f076, #5eead4);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

/* ── Interactive Preview for 02 / VOZ ─────────────────────── */
function VozPreview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="preview-container voz-atmosphere">
      <div className="preview-chrome">
        <div className="chrome-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="chrome-title">VOZ // VOICE REMITTANCE ENGINE</div>
        <div className="chrome-status">
          <span className="live-pill blue" />
          <span>SOLANA + LI.FI</span>
        </div>
      </div>

      <div className="preview-body">
        {/* Voice Input Box */}
        <div className="voice-prompt-box">
          <div className="voice-mic-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </div>
          <div className="prompt-text-group">
            <span className="prompt-sub">Voice Transcript Input</span>
            <span className="prompt-quote">&ldquo;Send $50 USDC to Sarah in Nairobi&rdquo;</span>
          </div>
          {/* Animated Waveform */}
          <div className="voice-wave">
            {[18, 36, 24, 48, 28, 54, 38, 22, 44, 30].map((h, i) => (
              <span
                key={i}
                className="wave-bar"
                style={{
                  height: isHovered ? `${h}px` : `${Math.max(8, h * 0.4)}px`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Claude Semantic Parser */}
        <div className="semantic-card">
          <div className="semantic-head">
            <span className="tag-ai">CLAUDE 3.5 PARSER</span>
            <span className="parse-status">{isHovered ? "Intent Verified ✓" : "Listening..."}</span>
          </div>
          <div className="parsed-intent">
            <div>
              <span className="intent-label">Amount:</span> <strong>$50.00 USDC</strong>
            </div>
            <div>
              <span className="intent-label">Recipient:</span> <strong>Sarah (sarah.sol)</strong>
            </div>
          </div>
        </div>

        {/* Cross-chain Route Animation */}
        <div className="route-flow">
          <div className="route-node">
            <span className="node-icon">ETH</span>
            <span className="node-desc">Sender USDC</span>
          </div>
          <div className="route-bridge">
            <span className={`bridge-packet ${isHovered ? "is-traveling" : ""}`} />
            <span className="bridge-line" />
            <span className="bridge-label">LI.FI ROUTE</span>
          </div>
          <div className="route-node solana-node">
            <span className="node-icon sol">SOL</span>
            <span className="node-desc">Recipient Wallet</span>
          </div>
        </div>

        <div className="preview-action-hint">
          <span>{isHovered ? "⚡ Finalized on Solana in 0.8s with zero slippage" : "Hover to simulate voice remittance intent"}</span>
        </div>
      </div>

      <style jsx>{`
        .voz-atmosphere {
          background: #090c14;
          border-color: rgba(96, 165, 250, 0.25);
        }
        .voice-prompt-box {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 0.85rem 1rem;
          background: rgba(96, 165, 250, 0.06);
          border: 1px solid rgba(96, 165, 250, 0.18);
          margin-bottom: 0.85rem;
        }
        .prompt-text-group {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .prompt-sub {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
          text-transform: uppercase;
        }
        .prompt-quote {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--white);
          margin-top: 0.15rem;
        }
        .voice-wave {
          display: flex;
          align-items: center;
          gap: 2.5px;
          height: 32px;
        }
        .wave-bar {
          width: 3px;
          background: #60a5fa;
          border-radius: 2px;
          transition: height 0.3s ease;
        }
        .semantic-card {
          padding: 0.75rem 0.9rem;
          background: rgba(14, 18, 28, 0.7);
          border: 1px solid rgba(96, 165, 250, 0.15);
          margin-bottom: 0.85rem;
        }
        .semantic-head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.45rem;
        }
        .tag-ai {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          color: #c084fc;
          letter-spacing: 0.06em;
        }
        .parse-status {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: #60a5fa;
        }
        .parsed-intent {
          display: flex;
          gap: 1.5rem;
          font-size: 0.76rem;
          color: var(--muted);
        }
        .parsed-intent strong {
          color: var(--white);
        }
        .route-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          background: rgba(12, 16, 26, 0.8);
          border: 1px solid rgba(96, 165, 250, 0.12);
        }
        .route-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
        .node-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--white);
        }
        .node-icon.sol {
          background: rgba(96, 165, 250, 0.2);
          color: #60a5fa;
        }
        .node-desc {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
        }
        .route-bridge {
          position: relative;
          flex: 1;
          margin: 0 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .bridge-line {
          width: 100%;
          height: 2px;
          background: rgba(96, 165, 250, 0.25);
        }
        .bridge-packet {
          position: absolute;
          top: -3px;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 10px #60a5fa;
          transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bridge-packet.is-traveling {
          left: calc(100% - 8px);
        }
        .bridge-label {
          margin-top: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.54rem;
          letter-spacing: 0.08em;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}

/* ── Interactive Preview for 03 / TIPWALL ─────────────────── */
function TipWallPreview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="preview-container tipwall-atmosphere">
      <div className="preview-chrome">
        <div className="chrome-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="chrome-title">TIPWALL // NIMIQ CREATOR WALL</div>
        <div className="chrome-status">
          <span className="live-pill orange" />
          <span>0% FEES · P2P</span>
        </div>
      </div>

      <div className="preview-body">
        {/* Creator Profile */}
        <div className="creator-badge-row">
          <div className="creator-avatar">AD</div>
          <div className="creator-meta">
            <span className="creator-handle">@adejoke.nim</span>
            <span className="creator-title">Full-Stack Protocol Builder</span>
          </div>
          <div className="wallet-verified">
            <span>✓ Non-Custodial</span>
          </div>
        </div>

        {/* Goal Progress Bar */}
        <div className="tip-goal-card">
          <div className="goal-top">
            <span className="goal-name">Fundraising: Audio Gear & Testnet Node</span>
            <span className="goal-pct">{isHovered ? "88%" : "74%"}</span>
          </div>
          <div className="goal-track">
            <div className="goal-fill" style={{ width: isHovered ? "88%" : "74%" }} />
          </div>
          <div className="goal-sub">
            <span>{isHovered ? "4,400 / 5,000 NIM" : "3,700 / 5,000 NIM"}</span>
            <span>Direct on-chain payout</span>
          </div>
        </div>

        {/* Live Incoming Tip Event (Appears on hover!) */}
        <div className={`incoming-tip-notification ${isHovered ? "is-visible" : ""}`}>
          <div className="tip-icon">✨</div>
          <div className="tip-info">
            <div className="tip-author">
              <strong>@satoshi_fan</strong> tipped <strong>+250 NIM</strong>
            </div>
            <div className="tip-comment">&ldquo;Keep shipping genuine Bitcoin & multi-chain tools!&rdquo;</div>
          </div>
          <span className="tip-tag">JUST NOW</span>
        </div>

        {/* Tip History Rows */}
        <div className="tip-history">
          <div className="tip-item">
            <span>@dev3_cohort</span>
            <span className="tip-note">&ldquo;Great hackathon demo!&rdquo;</span>
            <span className="tip-amt">+500 NIM</span>
          </div>
          <div className="tip-item">
            <span>@anon.eth</span>
            <span className="tip-note">&ldquo;For open source work&rdquo;</span>
            <span className="tip-amt">+1,000 NIM</span>
          </div>
        </div>

        <div className="preview-action-hint">
          <span>{isHovered ? "⚡ Peer-to-peer tip settled directly into wallet" : "Hover to trigger instant tip notification"}</span>
        </div>
      </div>

      <style jsx>{`
        .tipwall-atmosphere {
          background: #110d0a;
          border-color: rgba(255, 122, 69, 0.25);
        }
        .creator-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.9rem;
          background: rgba(255, 122, 69, 0.05);
          border: 1px solid rgba(255, 122, 69, 0.15);
          margin-bottom: 0.85rem;
        }
        .creator-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff7a45, #ffa940);
          color: #110d0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.75rem;
        }
        .creator-meta {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .creator-handle {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--white);
        }
        .creator-title {
          font-size: 0.64rem;
          color: var(--muted);
        }
        .wallet-verified {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: #ff7a45;
        }
        .tip-goal-card {
          padding: 0.85rem 1rem;
          background: rgba(22, 17, 14, 0.8);
          border: 1px solid rgba(255, 122, 69, 0.15);
          margin-bottom: 0.85rem;
        }
        .goal-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 0.5rem;
          color: var(--white);
        }
        .goal-pct {
          font-family: var(--font-mono);
          color: #ff7a45;
          font-weight: 600;
        }
        .goal-track {
          height: 5px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          overflow: hidden;
        }
        .goal-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff7a45, #ffa940);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .goal-sub {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
          margin-top: 0.45rem;
        }
        .incoming-tip-notification {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 122, 69, 0.15);
          border: 1px solid #ff7a45;
          margin-bottom: 0.85rem;
          opacity: 0;
          transform: translateY(-8px);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .incoming-tip-notification.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .tip-icon { font-size: 1.1rem; }
        .tip-info { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
        .tip-author { font-size: 0.75rem; color: var(--white); }
        .tip-author strong { color: #ff7a45; }
        .tip-comment { font-size: 0.68rem; color: rgba(244, 241, 234, 0.8); }
        .tip-tag {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          color: #ff7a45;
          font-weight: 600;
        }
        .tip-history {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .tip-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          padding: 0.4rem 0.6rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-soft);
          color: var(--muted);
        }
        .tip-note { font-style: italic; color: rgba(244, 241, 234, 0.6); }
        .tip-amt { color: #22c55e; font-family: var(--font-mono); font-weight: 600; }
      `}</style>
    </div>
  );
}

/* ── Interactive Preview for 04 / CLARITYQUEST ─────────────── */
function ClarityQuestPreview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="preview-container clarity-atmosphere">
      <div className="preview-chrome">
        <div className="chrome-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="chrome-title">CLARITYQUEST // CLARINET IN-BROWSER WASM</div>
        <div className="chrome-status">
          <span className="live-pill cyan" />
          <span>LEVEL 12 / 20</span>
        </div>
      </div>

      <div className="preview-body">
        {/* Code Editor Window */}
        <div className="code-editor-box">
          <div className="code-editor-header">
            <span className="file-name">tokens.clar</span>
            <span className="badge-lang">CLARITY 2.4</span>
          </div>
          <pre className="code-lines">
            <code>{`1 | (define-public (mint-badge (recipient principal))
2 |   (let ((badge-id (+ (var-get last-id) u1)))
3 |     (asserts! (is-eq tx-sender contract-owner) (err u401))
4 |     (try! (nft-mint? clarity-badge badge-id recipient))
5 |     (var-set last-id badge-id)
6 |     (ok badge-id)))`}</code>
          </pre>
        </div>

        {/* Clarinet WASM Test Runner Output */}
        <div className="test-runner-box">
          <div className="runner-header">
            <span className="runner-title">CLARINET WASM TEST RUNNER</span>
            <span className={`runner-status ${isHovered ? "passed" : ""}`}>
              {isHovered ? "ALL TESTS PASSING (2/2) ✓" : "IDLE (Ready to run)"}
            </span>
          </div>
          <div className="test-log">
            <div className="log-line">
              <span className="log-icon pass">PASS</span>
              <span>test-mint-sip009-badge (38ms)</span>
            </div>
            <div className="log-line">
              <span className="log-icon pass">PASS</span>
              <span>test-unauthorized-mint-rejection (14ms)</span>
            </div>
          </div>
        </div>

        {/* Reward Unlocked Notification */}
        <div className={`badge-reward-card ${isHovered ? "is-unlocked" : ""}`}>
          <div className="reward-medal">🏆</div>
          <div className="reward-text">
            <strong>SIP-009 Badge Minted</strong>
            <span>Verified on Stacks Mainnet: Contract Clarity Master</span>
          </div>
          <span className="nft-id">#089</span>
        </div>

        <div className="preview-action-hint">
          <span>{isHovered ? "⚡ Clarinet WASM compiled and verified tests in-browser" : "Hover to run Clarinet tests and mint badge"}</span>
        </div>
      </div>

      <style jsx>{`
        .clarity-atmosphere {
          background: #090e13;
          border-color: rgba(56, 189, 248, 0.25);
        }
        .code-editor-box {
          border: 1px solid rgba(56, 189, 248, 0.18);
          background: rgba(6, 10, 15, 0.9);
          margin-bottom: 0.75rem;
        }
        .code-editor-header {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--muted);
        }
        .badge-lang { color: #38bdf8; }
        .code-lines {
          margin: 0;
          padding: 0.75rem 0.9rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          line-height: 1.5;
          color: #e2e8f0;
          overflow-x: auto;
        }
        .test-runner-box {
          padding: 0.65rem 0.85rem;
          background: rgba(12, 19, 26, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.15);
          margin-bottom: 0.75rem;
        }
        .runner-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          margin-bottom: 0.45rem;
        }
        .runner-title { color: var(--muted); }
        .runner-status { color: #94a3b8; }
        .runner-status.passed { color: #38bdf8; font-weight: 600; }
        .test-log { display: flex; flex-direction: column; gap: 0.25rem; font-family: var(--font-mono); font-size: 0.68rem; }
        .log-line { display: flex; align-items: center; gap: 0.5rem; color: rgba(244, 241, 234, 0.8); }
        .log-icon.pass {
          padding: 0.1rem 0.35rem;
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          font-size: 0.52rem;
          font-weight: 700;
        }
        .badge-reward-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid #38bdf8;
          opacity: 0;
          transform: translateY(-6px);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .badge-reward-card.is-unlocked {
          opacity: 1;
          transform: translateY(0);
        }
        .reward-medal { font-size: 1.1rem; }
        .reward-text { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
        .reward-text strong { font-size: 0.76rem; color: var(--white); }
        .reward-text span { font-size: 0.62rem; color: rgba(244, 241, 234, 0.8); }
        .nft-id { font-family: var(--font-mono); font-size: 0.65rem; color: #38bdf8; font-weight: 700; }
      `}</style>
    </div>
  );
}

/* ── Main Project Section Component ──────────────────────── */
export default function ProjectShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const renderPreview = (project: FeaturedProject, isHovered: boolean) => {
    switch (project.id) {
      case "staxiq":
        return <StaxiqPreview isHovered={isHovered} />;
      case "voz":
        return <VozPreview isHovered={isHovered} />;
      case "tipwall":
        return <TipWallPreview isHovered={isHovered} />;
      case "clarityquest":
        return <ClarityQuestPreview isHovered={isHovered} />;
      default:
        return null;
    }
  };

  return (
    <section id="work" className="showcase-section" aria-label="Selected Work">
      <div className="site-grid">
        <div className="showcase-head">
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">One product at a time. Systems built to last.</h2>
          <p className="section-intro">
            Instead of a dense wall of thumbnails, each flagship product is presented with its own architecture, case study, and interactive product simulation.
          </p>
        </div>

        {/* List of full sections */}
        <div className="project-sections-list">
          {FEATURED_PROJECTS.map((project) => {
            const isHovered = hoveredProject === project.id;
            return (
              <article
                key={project.id}
                className="project-row"
                style={{
                  "--accent-color": project.atmosphere.accent,
                  "--ambient-glow": project.atmosphere.ambientGlow,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Background Ambient Glow */}
                <div className="atmosphere-glow" aria-hidden="true" />

                <div className="project-layout">
                  {/* Left Column: Story, Role, Stack, Links */}
                  <div className="project-narrative">
                    <div className="project-index-row">
                      <span className="project-num">{project.number} /</span>
                      <span className="project-badge">{project.role}</span>
                      <span className="project-year">{project.year}</span>
                    </div>

                    <h3 className="project-title">{project.name}</h3>

                    <p className="project-tagline">{project.tagline}</p>

                    <div className="project-case-study">
                      <p>{project.caseStudy}</p>
                    </div>

                    <div className="project-stack-wrap">
                      <span className="stack-label">Stack:</span>
                      <div className="stack-pills">
                        {project.stack.map((tech) => (
                          <span key={tech} className="tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-links">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn link-primary"
                      >
                        Live site
                        <span className="arrow" aria-hidden="true">↗</span>
                      </a>
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-btn link-secondary"
                        >
                          GitHub source
                          <span className="arrow" aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Strong Visual & Interactive Mockup */}
                  <div className="project-preview-wrapper">
                    {renderPreview(project, isHovered)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .showcase-section {
          position: relative;
          padding: 8rem 0 6rem;
          border-top: 1px solid var(--border-soft);
        }

        .showcase-head {
          margin-bottom: 5rem;
        }

        .project-sections-list {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .project-row {
          position: relative;
          border: 1px solid var(--border);
          background: rgba(14, 18, 22, 0.65);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.4s ease, transform 0.3s ease;
        }

        .project-row:hover {
          border-color: var(--accent-color);
        }

        .atmosphere-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 75% 50%, var(--ambient-glow) 0%, transparent 65%);
          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }

        .project-row:hover .atmosphere-glow {
          opacity: 1;
        }

        .project-layout {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 1.15fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 4.5rem);
          padding: clamp(2.5rem, 4vw, 4rem);
        }

        .project-narrative {
          display: flex;
          flex-direction: column;
        }

        .project-index-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          margin-bottom: 1rem;
        }

        .project-num {
          color: var(--accent-color);
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .project-badge {
          padding: 0.2rem 0.55rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--muted);
          text-transform: uppercase;
          font-size: 0.58rem;
          letter-spacing: 0.08em;
        }

        .project-year {
          color: #667276;
        }

        .project-title {
          margin: 0;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 650;
          letter-spacing: -0.04em;
          color: var(--white);
          line-height: 1;
        }

        .project-tagline {
          margin: 1rem 0 0;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--accent-color);
          line-height: 1.5;
        }

        .project-case-study {
          margin-top: 1.25rem;
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.75;
          max-width: 52ch;
        }

        .project-stack-wrap {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .stack-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
        }

        .stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tech-pill {
          padding: 0.25rem 0.55rem;
          border: 1px solid var(--border-soft);
          background: rgba(255, 255, 255, 0.02);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(244, 241, 234, 0.8);
          letter-spacing: 0.03em;
        }

        .project-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2.2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-soft);
        }

        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .link-primary {
          padding: 0.65rem 1.15rem;
          background: var(--accent-color);
          color: #0b0e10;
        }

        .link-primary:hover {
          background: var(--white);
          transform: translateY(-2px);
        }

        .link-secondary {
          padding: 0.65rem 1rem;
          border: 1px solid var(--border);
          color: var(--white);
        }

        .link-secondary:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        /* ── Shared Preview Wrapper Styles ── */
        .project-preview-wrapper {
          position: relative;
          width: 100%;
        }

        .preview-container {
          border: 1px solid var(--border);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .preview-chrome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          background: rgba(6, 8, 10, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .chrome-dots {
          display: flex;
          gap: 5px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .chrome-title {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 600;
          color: rgba(244, 241, 234, 0.7);
          letter-spacing: 0.1em;
        }

        .chrome-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.55rem;
          color: var(--muted);
          text-transform: uppercase;
        }

        .live-pill {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00f076;
          box-shadow: 0 0 6px #00f076;
        }

        .live-pill.blue { background: #60a5fa; box-shadow: 0 0 6px #60a5fa; }
        .live-pill.orange { background: #ff7a45; box-shadow: 0 0 6px #ff7a45; }
        .live-pill.cyan { background: #38bdf8; box-shadow: 0 0 6px #38bdf8; }

        .preview-body {
          padding: 1.25rem;
        }

        .preview-action-hint {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 1rem;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        @media (max-width: 960px) {
          .project-layout {
            grid-template-columns: 1fr;
            padding: 2rem 1.5rem;
          }

          .project-sections-list {
            gap: 3.5rem;
          }
        }
      `}</style>
    </section>
  );
}
