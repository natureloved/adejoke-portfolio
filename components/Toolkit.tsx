import { Icon } from "./ui";

/**
 * A strip of the tools actually used across the work below. Deliberately short:
 * a longer list reads as padding rather than evidence.
 */
type Tool = { label: string; mark?: string; icon?: string };

const TOOLS: Tool[] = [
  { label: "TypeScript", icon: "i-code" },
  { label: "Next.js", mark: "N" },
  { label: "React", mark: "⚛" },
  { label: "Tailwind", mark: "T" },
  { label: "Bitcoin L2", mark: "₿" },
  { label: "Solidity", mark: "S" },
  { label: "Canton", icon: "i-layers" },
  { label: "Base", mark: "B" },
  { label: "Prisma", mark: "P" },
  { label: "WASM", mark: "W" },
];

export default function Toolkit() {
  return (
    <div className="container toolkit">
      <p className="toolkit-label">The toolkit</p>
      <ul>
        {TOOLS.map((t) => (
          <li className="tool" key={t.label}>
            {"mark" in t && t.mark ? (
              <span className="next-mark" aria-hidden="true">
                {t.mark}
              </span>
            ) : (
              <Icon name={t.icon ?? "i-code"} />
            )}
            {t.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
