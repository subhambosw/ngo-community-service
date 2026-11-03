/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['"Silkscreen"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#000000',
          900: '#060607',
          800: '#0c0c0e',
          700: '#141417',
          600: '#1e1e23',
          500: '#2b2b32',
          400: '#52525b',
          300: '#a1a1aa',
          200: '#e4e4e7',
          100: '#f4f4f5',
        },
        brand: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#ffffff',
          600: '#71717a',
          700: '#52525b',
          800: '#27272a',
          900: '#18181b',
        },
        dark: {
          900: '#000000',
          800: '#0c0c0e',
          700: '#16161a',
          600: '#23232a',
        }
      }
    },
  },
  plugins: [],
}
