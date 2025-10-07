import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slasherRed: "#8b0000",
        slasherRedLight: "#a31a1a",
        slasherRedDark: "#5a0000",
        charcoal: "#1a1a1a",
        smoke: "#f5f5f5",
      },
      backgroundImage: {
        "gradient-slasher": "linear-gradient(135deg, #8b0000 0%, #5a0000 100%)",
      },
      boxShadow: {
        glow: "0 0 15px rgba(139, 0, 0, 0.4)",
        soft: "0 4px 12px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
