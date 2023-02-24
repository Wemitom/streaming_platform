/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a2b44',
        primaryBorder: '#161a25',
        secondary: '#764b75',
      },
    },
  },
  plugins: [],
};
