/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F291E",
          foreground: "#F5F5F0",
        },
        secondary: {
          DEFAULT: "#F5F5F0",
          foreground: "#0F291E",
        },
        accent: {
          DEFAULT: "#CCFF00",
          foreground: "#0F291E",
        },
        muted: {
          DEFAULT: "#E6E6E1",
          foreground: "#5C5C58",
        },
        destructive: {
          DEFAULT: "#FF4D00",
          foreground: "#FFFFFF",
        },
        background: "#F5F5F0",
        foreground: "#0F291E",
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        none: '0px',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(15,41,30,1)',
        'brutal-hover': '6px 6px 0px 0px rgba(15,41,30,1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};