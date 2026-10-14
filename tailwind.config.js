/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4e9',
          200: '#fecdce',
          300: '#fca5a5',
          400: '#f8719d',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
        rosewood: {
          50: '#fdf4f5',
          100: '#fbe8ea',
          200: '#f7d5d8',
          300: '#efb3b8',
          400: '#e3858f',
          500: '#d05967',
          600: '#b83b4c',
          700: '#9b2e3c',
          800: '#812834',
          900: '#6d2630',
        },
        gold: {
          100: '#fef9e7',
          200: '#fcf0c4',
          300: '#fae39b',
          400: '#f5d166',
          500: '#e6b933',
          600: '#cca025',
          700: '#a37c1d',
        },
        ivory: {
          50: '#fffdf9',
          100: '#fcf8ee',
          200: '#f7eedb',
          300: '#f0e1c2',
        }
      },
      fontFamily: {
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.8, filter: 'drop-shadow(0 0 15px rgba(244, 114, 182, 0.6))' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 30px rgba(244, 114, 182, 0.9))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
