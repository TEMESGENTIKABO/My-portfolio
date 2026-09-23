import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08090C",
          800: "#0E1015",
          700: "#14161D",
          600: "#1C1F2A",
        },
        paper: { DEFAULT: "#F3F1EA", dim: "#ACB0BA", faint: "#6E7480" },
        accent: { DEFAULT: "#E0A63F", soft: "#F4CE85" },
        line: "rgba(243,241,234,0.09)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
