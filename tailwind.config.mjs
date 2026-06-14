/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        night: "#050711",
        ink: "#0a1020",
        cyan: {
          glow: "#22d3ee",
        },
        violet: {
          glow: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px rgba(168, 85, 247, 0.18)",
        violet: "0 0 55px rgba(139, 92, 246, 0.22)",
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "aurora": "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.20), transparent 28%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.22), transparent 30%), radial-gradient(circle at 55% 80%, rgba(124, 58, 237, 0.14), transparent 34%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
