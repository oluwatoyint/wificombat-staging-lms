import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spin: "spin 1.5s linear infinite",
      },
      colors: {
        "black-50": "#F2F2F3",
        "black-100": "#E5E5E6",
        "black-200": "#CBCBCD",
        "black-300": "#B1B1B4",
        "black-400": "#96969C",
        "black-500": "#131314",
        "black-550": "#495057",
        "black-600": "#636369",
        "black-700": "#4B4B4E",
        "black-800": "#323234",
        "purple-50": "#FBE5FF",
        "purple-200": "#F099FF",
        "purple-300": "#E866FF",
        "purple-500": "#BC00DD",
        "blue-50": "#E6F6FE",
        "blue-200": "#9DDCFB",
        "blue-300": "#6BCAFA",
        "blue-500": "#0784C3",
        "yellow-50": "#FFF8E5",
        "yellow-300": "#FFD466",
        "yellow-500": "#FFB700",
        "yellow-600": "#CC9200",
        "primary-gray": "#D9D9D9",
        "modal-bg": "#26002C80",
        // primary: "var(--primary-color)", // Dynamic primary color
        primary: {
          DEFAULT: "var(--primary-color)", // Base color
          40: "var(--primary-40)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
      },

      screens: {
        md: "912px",
        576: "576px",
        680: "680px",
        768: "768px",
      },

      userSelect: {
        none: "none",
      },
      fontFamily: {
        merriweather: "'Merriweather', serif",
      },
    },
  },
  plugins: [],
};
export default config;
