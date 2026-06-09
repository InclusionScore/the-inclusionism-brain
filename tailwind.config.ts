import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#ffffff",
        panel: "#070707",
        line: "#262626",
        signal: "#0080fb",
        red: "#e4300f",
        gold: "#f4f0df",
        smoke: "#b9b9b9"
      },
      boxShadow: {
        glow: "0 0 60px rgba(0, 128, 251, 0.22)",
        redglow: "0 0 46px rgba(228, 48, 15, 0.18)"
      }
    }
  },
  plugins: [typography]
};

export default config;
