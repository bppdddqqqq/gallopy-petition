/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ["Helvetica", 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl'), marginBottom: theme('margin.2'), marginTop: theme('margin.4') },
        'h2': { fontSize: theme('fontSize.xl'), marginBottom: theme('margin.1'), marginTop: theme('margin.2') },
        'h3': { fontSize: theme('fontSize.lg'), marginBottom: theme('margin.1'), marginTop: theme('margin.1') },
        'p': { marginBottom: theme('margin.1')}
      })
    })
  ]
}
