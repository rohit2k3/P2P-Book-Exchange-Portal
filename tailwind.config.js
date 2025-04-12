/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        secondary: {
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        dark: {
          300: "#cbd5e1",
        },
      },
    },
  },
  plugins: [],
}
