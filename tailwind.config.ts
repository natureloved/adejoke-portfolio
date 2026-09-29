import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        white: "var(--white)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        green: "var(--green)",
        "green-dark": "var(--green-dark)",
        lime: "var(--lime)",
        line: "var(--line)",
        pale: "var(--pale)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Instrument Serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
