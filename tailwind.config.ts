import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slasherRed: "#8b0000", // 👈 nome da cor
      },
    },
  },
  plugins: [],
} satisfies Config;
