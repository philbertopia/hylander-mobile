import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hyGreen: "#12b76a",
        hyDeepGreen: "#087443",
        hyPurple: "#7c3aed",
        hyDeepPurple: "#4c1d95",
        hyPink: "#ec4899",
        hyHotPink: "#be185d",
        hyInk: "#0b0b0f"
      },
      fontFamily: {
        rounded: ["Comic Sans MS", "Arial Rounded MT Bold", "Trebuchet MS", "Arial", "sans-serif"]
      },
      boxShadow: {
        sticker: "4px 4px 0 #12b76a",
        black: "4px 4px 0 #000000"
      }
    }
  },
  plugins: []
};

export default config;

