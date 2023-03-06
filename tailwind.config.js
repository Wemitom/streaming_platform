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
        slideInLeft: {
          from: { transform: 'translateX(-500px)' },
          to: { transform: 'translateX(0px)' }
        },
        slideOutLeft: {
          from: { transform: 'translateX(0px)' },
          to: { transform: 'translateX(-500px)' }
        },
        slideInRight: {
          from: { transform: 'translateX(200%)' },
          to: { transform: 'translateX(0px)' }
        },
        slideOutRight: {
          from: { transform: 'translateX(0px)' },
          to: { transform: 'translateX(200%)' }
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 100 }
        },
        fadeOut: {
          from: { opacity: 100 },
          to: { opacity: 0 }
        }
      },
      fontSize: {
        custom13: '13px',
        custom12: '12px'
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.3s ease-in-out',
        'slide-out-left': 'slideOutLeft 0.3s ease-in-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-in-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in-out forwards',
        'fade-in': 'fadeIn 0.1s linear',
        'fade-out': 'fadeOut 0.2s ease-in-out forwards'
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
