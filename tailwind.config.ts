import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#2563eb",
        accent: "#f59e0b",
        bg: "#0b1020",
        surface: "#0f172a",
        muted: "#94a3b8"
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px"
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.25)"
      }
    },
  },
  plugins: [],
};
export default config;
