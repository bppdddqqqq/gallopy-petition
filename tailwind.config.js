/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true,
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Helvetica", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        'red': {
          '600': '#661616',
          '400': '#B22828',
          '100': '#FFFBFB',
          '200': '#FFECEC',
          '300': '#FED0D0'
        }
      },
      minWidth: {
        sm: "504px",
        md: "792px",
        lg: "1000px",
        xl: "1464px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.3xl"),
          textAlign: "center",
          color: theme("colors.red.400"),
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.bold"),
          lineHeight: theme("lineHeight.none"),
        },
        h2: {
          fontSize: theme("fontSize.2xl"),
          color: theme("colors.red.400"),
          fontWeight: theme("fontWeight.bold"),
          textAlign: "center",
        },
        h3: {
          fontSize: theme("fontSize.lg"),
        },
        p: { fontSize: theme("fontSize.md") },
      })
    }),
  ],
}
