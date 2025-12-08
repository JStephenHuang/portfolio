import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      manrope: ["var(--font-manrope)"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        ui: ["0.8125rem", { lineHeight: "1.5" }], // 13px - nav, canvas items
        body: ["1rem", { lineHeight: "1.75" }], // 16px - body text
        subtitle: ["1.125rem", { lineHeight: "1.5", fontWeight: "600" }], // 18px - h2
        title: ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }], // 24px - h1
      },
    },
  },
  plugins: [typography],
};
export default config;
