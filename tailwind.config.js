/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ooty': {
          brown: 'var(--ooty-brown)',
          'brown-light': 'var(--ooty-brown-light)',
          gold: 'var(--ooty-gold)',
          beige: 'var(--ooty-beige)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 