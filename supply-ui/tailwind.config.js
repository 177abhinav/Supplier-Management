/** @type {import('tailwindcss').Config} */
import animatePlugin from 'tailwind-animate';

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    animatePlugin, // ✅ Added tailwind-animate plugin
  ],
}
