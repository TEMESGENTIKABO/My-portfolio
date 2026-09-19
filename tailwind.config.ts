import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0B0E",
          800: "#101218",
          700: "#161922",
          600: "#1E2230",
        },
        paper: { DEFAULT: "#ECEAE4", dim: "#A6ABB5", faint: "#6E7480" },
        accent: { DEFAULT: "#E0A63F", soft: "#EFC878" },
        line: "rgba(236,234,228,0.09)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
