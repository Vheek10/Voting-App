import { type Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["McLaren", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        elgvotes: {
          primary: "#8b5cf6",
          secondary: "#ec4899",
          accent: "#f59e0b",
          neutral: "#3d4451",
          "base-100": "#f9fafb",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
      "dark", // optional fallback theme
    ],
  },
};

export default config;
