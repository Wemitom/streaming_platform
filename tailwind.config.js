/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        deskVector: 'url(/images/bgDesk.png)',
        phoneVector: 'url(/images/bgPhone.svg)'
      },
      colors: {
        primary: '#481372',
        header: '#48466D',
        footer: '#D9D9D9'
      },
      screens: {
        sidebar: '1280px'
      },
      transitionProperty: {
        background: 'background',
        border: 'border'
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(-999px)' },
          to: { transform: 'translateX(0px)' }
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { transform: 100 }
        }
      },
      fontSize: {
        custom13: '13px',
        custom12: '12px'
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.1s linear',
        'slide-out': 'slideIn 0.3s ease-in-out reverse',
        'fade-out': 'fadeIn 0.2s linear reverse'
      },
      height: {
        area: '4.6875rem'
      },
      minHeight: {
        area: '4.6875rem'
      },
      boxShadow: {
        boxContainer: '7px 7px 12px rgba(0, 0, 0, 0.25)'
      },
      borderRadius: {
        5: '5px'
      }
    }
  },
  plugins: []
};
