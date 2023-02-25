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
      transitionProperty: {
        background: 'background',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(-999px)' },
          to: { transform: 'translateX(0px)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { transform: 100 },
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.1s linear',
        'slide-out': 'slideIn 0.3s ease-in-out reverse',
        'fade-out': 'fadeIn 0.2s linear reverse',
      },
    },
  },
  plugins: [],
};
