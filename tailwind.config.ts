import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070a0f",
        panel: "#101620",
        line: "#263242",
        signal: "#8bd3dd",
        gold: "#e7c76f",
        moss: "#9ecf93",
        rose: "#e68aa7"
      },
      boxShadow: {
        glow: "0 0 50px rgba(139, 211, 221, 0.16)"
      }
    }
  },
  plugins: [typography]
};

export default config;
