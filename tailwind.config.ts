import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050505",
          card: "#0C0C0C",
          elevated: "#111111",
        },
        accent: {
          DEFAULT: "#D9FF00",
          dim: "#A8C700",
          glow: "rgba(217,255,0,0.25)",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#A0A0A0",
          faint: "#6B6B6B",
        },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #050505), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(217,255,0,0.15), transparent)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(217,255,0,0.18)",
        "glow-sm": "0 0 24px rgba(217,255,0,0.22)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 1.5s",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
