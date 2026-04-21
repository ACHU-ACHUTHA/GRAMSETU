/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        earth: {
          50: "#fdf8f0",
          100: "#f9edd8",
          200: "#f2d9b0",
          300: "#e8bf80",
          400: "#d9a050",
          500: "#c97f2a",
          600: "#a8641f",
          700: "#834c1b",
          800: "#6b3d1a",
          900: "#59341a",
        },
        leaf: {
          50: "#f0f9f0",
          100: "#dcf0dc",
          200: "#bbe0bb",
          300: "#8ec88e",
          400: "#5faa5f",
          500: "#3d8c3d",
          600: "#2d6e2d",
          700: "#255725",
          800: "#1f451f",
          900: "#1a3a1a",
        },
        saffron: {
          400: "#ff9933",
          500: "#e8871a",
        }
      },
      fontFamily: {
        display: ["'Yatra One'", "serif"],
        body: ["'Hind'", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
