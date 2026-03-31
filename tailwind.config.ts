import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        orange: "var(--orange)",
        purple: "var(--purple)",
        cyan: "var(--cyan)",
        white: "var(--white)",
        muted: "var(--muted)",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "Bebas Neue", "cursive"],
        "dm-mono": ["var(--font-dm-mono)", "DM Mono", "monospace"],
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "33%": { transform: "translateY(-22px) scale(1.02)" },
          "66%": { transform: "translateY(12px) scale(0.98)" },
        },
        gradShift: {
          "0%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
          "100%": { backgroundPosition: "0% center" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.8s ease both",
        float: "float 8s ease-in-out infinite",
        "grad-shift": "gradShift 5s ease infinite",
        marquee: "marquee 20s linear infinite",
        blink: "blink 1.2s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
