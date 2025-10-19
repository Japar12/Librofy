import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        librofy: {
          primary: "#4F46E5",
          light: "#F8FAFC",
          dark: "#0A0A0A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
