/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        allternit: {
          orange: '#D97757',
          'orange-light': '#E8997A',
          'orange-dark': '#B86242',
          beige: '#D4B08C',
          brown: '#8F6F56',
          dark: '#0A0A0F',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
