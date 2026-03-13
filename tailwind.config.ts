import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FDF8F0",
          dark: "#F5EDE0",
        },
        sage: {
          light: "#A8C686",
          DEFAULT: "#7C9A6E",
          dark: "#5C7A4E",
        },
        bark: {
          light: "#5A4233",
          DEFAULT: "#3D2B1F",
        },
        rose: {
          light: "#D4A999",
          DEFAULT: "#C4917B",
          dark: "#A87563",
        },
        golden: {
          light: "#E4C87A",
          DEFAULT: "#D4A853",
        },
        meadow: "#A8C686",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
