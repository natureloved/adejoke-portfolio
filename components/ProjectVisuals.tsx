"use client";

// The 12 bespoke animated project previews, recovered from the pre-redesign
// Projects section. Colours retuned to the current palette.

// ─── Thumbnail components (preserved bespoke animated previews) ──

function Chrome({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "7px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
    }}>
      <div style={{ display: "flex", gap: 4 }}>
        {["#ff5564", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 9, color: accent, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function VozThumbnail() {
  const bars = [22, 38, 28, 52, 40, 58, 32, 48, 36, 60, 30, 54, 44, 62, 28, 46, 56, 38, 42, 64];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="VOZ — LIVE" accent="#ff8a65" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9, padding: "0 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {bars.map((h, i) => (
            <div key={i} className="viz-bar" style={{ width: 4, height: h, background: i % 3 === 0 ? "#ff8a65" : i % 3 === 1 ? "#c5a7ff" : "rgba(155,89,245,0.3)", borderRadius: 2, animationDelay: `${i * 0.045}s` }} />
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(244,241,234,0.4)", letterSpacing: "0.04em" }}>
          &ldquo;send $50 usdc to sarah via li.fi&rdquo;
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "#27c93f", letterSpacing: "0.1em" }}>PROCESSING — SOLANA</span>
        </div>
      </div>
    </div>
  );
}

function HashPilotThumbnail() {
  const rows = [
    { label: "HASH RATE", value: "847.3 TH/s", color: "#5eead4" },
    { label: "BLOCK", value: "#892,441", color: "rgba(244,241,234,0.45)" },
    { label: "EFFICIENCY", value: "94.2%", color: "#27c93f" },
    { label: "AI SIGNAL", value: "▲ BUY", color: "#ff8a65" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="HASHPILOT — TERMINAL" accent="#c5a7ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        {rows.map((r, i) => (
          <div key={r.label} className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 9, animationDelay: `${i * 0.09}s` }}>
            <span style={{ color: "#9aa6aa" }}>{">"} {r.label}</span>
            <span className={r.label === "AI SIGNAL" ? "blink-soft" : undefined} style={{ color: r.color, fontWeight: 600 }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StashFlowThumbnail() {
  const goals = [
    { label: "Emergency Fund", pct: 82, color: "#5eead4" },
    { label: "Vacation Trip", pct: 45, color: "#c5a7ff" },
    { label: "MacBook Pro", pct: 100, color: "#ff8a65" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="STASHFLOW — GOALS" accent="#5eead4" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 9 }}>
        {goals.map((g, i) => (
          <div key={g.label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, color: "rgba(244,241,234,0.45)" }}>
              <span>{g.label}</span>
              <span style={{ color: g.color }}>{g.pct}%</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div className="fill-bar" style={{ height: "100%", width: `${g.pct}%`, background: g.color, borderRadius: 2, animationDelay: `${i * 0.12}s` }} />
            </div>
          </div>
        ))}
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8, color: "#27c93f", marginTop: 1, animationDelay: "0.4s" }}>
          ↑ Yield earned: $127.40
        </div>
      </div>
    </div>
  );
}

function StaxiqThumbnail() {
  const protocols = [
    { name: "ALEX Protocol", tvl: "$124.3M", change: "+2.3%", up: true },
    { name: "Velar DEX", tvl: "$89.1M", change: "+5.1%", up: true },
    { name: "Bitflow", tvl: "$67.8M", change: "-0.8%", up: false },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="STAXIQ — BITCOIN L2" accent="#ff8a65" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 14px", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 7.5, color: "#9aa6aa", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 4, marginBottom: 2 }}>
          <span>PROTOCOL</span><span>TVL</span><span>24H</span>
        </div>
        {protocols.map((p, i) => (
          <div key={p.name} className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: `${i * 0.1}s` }}>
            <span style={{ color: "rgba(244,241,234,0.65)" }}>{p.name}</span>
            <span style={{ color: "rgba(244,241,234,0.4)" }}>{p.tvl}</span>
            <span style={{ color: p.up ? "#27c93f" : "#ff8a65" }}>{p.change}</span>
          </div>
        ))}
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#c5a7ff", marginTop: 3, animationDelay: "0.35s" }}>
          ⬡ Powered by Stacks Blockchain
        </div>
      </div>
    </div>
  );
}

function RunesRumbleThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="RUNES RUMBLE — LIVE" accent="#c5a7ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 8 }}>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8.5, color: "rgba(244,241,234,0.55)", letterSpacing: "0.04em" }}>
          DOG•GO•TO•THE•MOON (RUNE)
        </div>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8, color: "#9aa6aa", animationDelay: "0.1s" }}>
          Will price exceed $0.05 by Friday?
        </div>
        <div className="row-stagger" style={{ display: "flex", height: 22, borderRadius: 3, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", animationDelay: "0.2s" }}>
          <div style={{ width: "64%", background: "rgba(155,89,245,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 8.5, color: "#c5a7ff" }}>
            YES 64%
          </div>
          <div style={{ flex: 1, background: "rgba(255,138,101,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 8.5, color: "rgba(255,138,101,0.65)" }}>
            NO 36%
          </div>
        </div>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#9aa6aa", animationDelay: "0.3s" }}>
          Pool: 2.4 BTC · <span className="blink-soft">Closes in 11h 32m</span>
        </div>
      </div>
    </div>
  );
}

function TonPilotThumbnail() {
  const messages = [
    { from: "user", text: "/stake 100 TON to LP" },
    { from: "bot", text: "✓ Staked to Dedust. APY: 18.4%" },
    { from: "user", text: "/balance" },
    { from: "bot", text: "💎 3,421 TON (~$18,491)" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="TONPILOT — BOT" accent="#5eead4" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 12px", gap: 4 }}>
        {messages.map((m, i) => (
          <div key={i} className="row-stagger" style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", animationDelay: `${i * 0.15}s` }}>
            <div style={{ fontFamily: "monospace", fontSize: 8.5, padding: "3px 8px", borderRadius: m.from === "user" ? "7px 7px 2px 7px" : "7px 7px 7px 2px", background: m.from === "user" ? "rgba(0,212,255,0.13)" : "rgba(255,255,255,0.04)", color: m.from === "user" ? "#5eead4" : "rgba(244,241,234,0.55)", border: `1px solid ${m.from === "user" ? "rgba(0,212,255,0.22)" : "rgba(255,255,255,0.05)"}`, maxWidth: "80%" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipWallThumbnail() {
  const tips = [
    { from: "anon.nim", amount: "+250 NIM", note: '"keep building 🔥"' },
    { from: "sarah_web3", amount: "+1,000 NIM", note: '"love the podcast"' },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="TIPWALL — @RASTADEV" accent="#ff8a65" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, color: "rgba(244,241,234,0.45)" }}>
            <span>Goal: New Studio Mic</span>
            <span style={{ color: "#ff8a65" }}>68%</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div className="fill-bar" style={{ height: "100%", width: "68%", background: "linear-gradient(90deg, #ff8a65, #c5a7ff)", borderRadius: 2 }} />
          </div>
        </div>
        {tips.map((t, i) => (
          <div key={t.from} className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: `${0.15 + i * 0.15}s` }}>
            <span style={{ color: "rgba(244,241,234,0.65)" }}>{t.from} <span style={{ color: "#9aa6aa" }}>{t.note}</span></span>
            <span style={{ color: "#27c93f", fontWeight: 600 }}>{t.amount}</span>
          </div>
        ))}
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#9aa6aa", animationDelay: "0.45s" }}>
          ⬡ Signed by wallet · 0 platform fees
        </div>
      </div>
    </div>
  );
}

function DeadmanVaultThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="DEADMAN VAULT — ARMED" accent="#c5a7ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        <svg viewBox="0 0 200 24" style={{ width: "100%", height: 22 }} aria-hidden>
          <polyline className="ekg-line" pathLength={240} points="0,12 30,12 40,12 46,4 52,20 58,8 64,12 110,12 120,12 126,4 132,20 138,8 144,12 200,12" fill="none" stroke="#c5a7ff" strokeWidth="1.5" />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5 }}>
          <span style={{ color: "#9aa6aa" }}>{">"} VAULT LOCKED</span>
          <span style={{ color: "#5eead4", fontWeight: 600 }}>4,200 USDCx</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5 }}>
          <span style={{ color: "#9aa6aa" }}>{">"} NEXT HEARTBEAT</span>
          <span className="blink-soft" style={{ color: "#ff8a65", fontWeight: 600 }}>6d 11h 04m</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: "#27c93f", letterSpacing: "0.1em" }}>OWNER ALIVE · 2 HEIRS SET</span>
        </div>
      </div>
    </div>
  );
}

function ClarityQuestThumbnail() {
  const code = [
    { text: "(define-public (transfer", color: "rgba(244,241,234,0.6)" },
    { text: "  (amount uint) (to principal))", color: "#9aa6aa" },
    { text: "  (ok (stx-transfer? amount", color: "rgba(244,241,234,0.6)" },
    { text: "    tx-sender to)))", color: "#9aa6aa" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="CLARITYQUEST — λ 12/20" accent="#5eead4" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 3 }}>
        {code.map((l, i) => (
          <div key={i} className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8.5, color: l.color, whiteSpace: "pre", animationDelay: `${i * 0.08}s` }}>
            {l.text}
            {i === code.length - 1 && <span className="cursor-blink" style={{ color: "#5eead4" }}>▌</span>}
          </div>
        ))}
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontFamily: "monospace", fontSize: 8, animationDelay: "0.45s" }}>
          <span style={{ color: "#27c93f" }}>✓ 4/4 tests passed · +180 XP</span>
          <span style={{ color: "#c5a7ff" }}>⚒️ BUILDER</span>
        </div>
      </div>
    </div>
  );
}

function ProofOfRestThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="PROOF OF REST — SESSION" accent="#ff8a65" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "#9aa6aa" }}>{">"} FOCUS ⏾</span>
          <span className="blink-soft" style={{ fontFamily: "monospace", fontSize: 15, color: "#ff8a65", fontWeight: 600, letterSpacing: "0.05em" }}>41:12</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div className="fill-bar" style={{ height: "100%", width: "69%", background: "linear-gradient(90deg, #ff8a65, #c5a7ff)", borderRadius: 2 }} />
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.1s" }}>
          <span style={{ color: "#9aa6aa" }}>{">"} STAKED</span>
          <span style={{ color: "#5eead4", fontWeight: 600 }}>25 MON</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.2s" }}>
          <span style={{ color: "#9aa6aa" }}>{">"} STREAK</span>
          <span style={{ color: "#27c93f", fontWeight: 600 }}>🌱 TOUCHED GRASS ×6</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#c5a7ff" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: "#c5a7ff", letterSpacing: "0.1em" }}>RESTGUARDIAN · SIMULATING TX</span>
        </div>
      </div>
    </div>
  );
}

function ExpatShipThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="EXPATSHIP — QUOTE" accent="#5eead4" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "monospace", fontSize: 9 }}>
          <span style={{ color: "rgba(244,241,234,0.65)" }}>🇳🇬 LOS</span>
          <div style={{ flex: 1, position: "relative", height: 10 }}>
            <div style={{ position: "absolute", top: 4, left: 0, right: 0, borderTop: "1px dashed rgba(0,212,255,0.4)" }} />
            <span className="row-stagger" style={{ position: "absolute", top: -3, left: "55%", fontSize: 9, color: "#5eead4" }}>✈</span>
          </div>
          <span style={{ color: "rgba(244,241,234,0.65)" }}>🇬🇧 LON</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.1s" }}>
          <span style={{ color: "#9aa6aa" }}>Rate (duty incl.)</span>
          <span style={{ color: "#27c93f", fontWeight: 600 }}>£184.50</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.2s" }}>
          <span style={{ color: "#9aa6aa" }}>Est. delivery</span>
          <span style={{ color: "rgba(244,241,234,0.6)" }}>5–7 days</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", gap: 3, animationDelay: "0.3s" }}>
          {[1, 1, 1, 0.25].map((o, i) => (
            <div key={i} style={{ flex: 1, background: "#5eead4", opacity: o, borderRadius: 2 }} />
          ))}
        </div>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#ff8a65", animationDelay: "0.4s" }}>
          ▸ In customs · commercial invoice ready
        </div>
      </div>
    </div>
  );
}

function TaskyThumbnail() {
  const alerts = [
    { tag: "BOUNTY", text: "Solidity audit · $2,500", color: "#ff8a65" },
    { tag: "AIRDROP", text: "zkSync quest live now", color: "#5eead4" },
    { tag: "HACKATHON", text: "ETHGlobal — 3d left", color: "#c5a7ff" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="TASKY — @TASKYNOTIFY_BOT" accent="#c5a7ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 12px", gap: 5 }}>
        {alerts.map((a, i) => (
          <div key={a.tag} className="row-stagger" style={{ display: "flex", alignItems: "center", gap: 6, animationDelay: `${i * 0.13}s` }}>
            <span style={{ fontFamily: "monospace", fontSize: 7, letterSpacing: "0.08em", color: a.color, border: `1px solid ${a.color}`, borderRadius: 2, padding: "1px 4px", flexShrink: 0 }}>{a.tag}</span>
            <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "rgba(244,241,234,0.6)" }}>{a.text}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#27c93f" }} />
          <span className="blink-soft" style={{ fontFamily: "monospace", fontSize: 8, color: "#27c93f", letterSpacing: "0.08em" }}>SCANNING FEEDS · 3 NEW MATCHES</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectThumbnail({ id }: { id: string }) {
  const thumbnails: Record<string, React.ReactNode> = {
    voz: <VozThumbnail />, hashpilot: <HashPilotThumbnail />, stashflow: <StashFlowThumbnail />,
    staxiq: <StaxiqThumbnail />, "runes-rumble": <RunesRumbleThumbnail />, "ton-pilot": <TonPilotThumbnail />,
    tipwall: <TipWallThumbnail />, "deadman-vault": <DeadmanVaultThumbnail />, clarityquest: <ClarityQuestThumbnail />,
    "proof-of-rest": <ProofOfRestThumbnail />, expatship: <ExpatShipThumbnail />, tasky: <TaskyThumbnail />,
  };
  return <div className="thumbnail-wrap">{thumbnails[id] ?? null}</div>;
}
