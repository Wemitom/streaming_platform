/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        deskVector: 'url(/images/bgDesk.svg)',
        phoneVector: 'url(/images/bgPhone.svg)'
      },
      colors: {
        primary: '#481372',
        header: '#48466D',
        footer: '#D9D9D9',
        chat: '#FF852D'
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
          from: { transform: 'translateX(-200%)' },
          to: { transform: 'translateX(0px)' }
        },
        slideOutLeft: {
          from: { transform: 'translateX(0px)' },
          to: { transform: 'translateX(-200%)' }
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
        },
        fadeInBackdrop: {
          from: { backdropFilter: 'blur(16px) opacity(0)', opacity: 0 },
          to: { backdropFilter: 'blur(16px) opacity(1)', opacity: 100 }
        },
        fadeOutBackdrop: {
          from: { backdropFilter: 'blur(16px) opacity(1)', opacity: 100 },
          to: { backdropFilter: 'blur(16px) opacity(0)', opacity: 0 }
        }
      },
      fontSize: {
        custom13: '13px',
        custom12: '12px'
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.3s ease-in-out forwards',
        'slide-out-left': 'slideOutLeft 0.3s ease-in-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-in-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in-out forwards',
        'fade-in': 'fadeIn 0.1s linear forwards',
        'fade-out': 'fadeOut 0.2s ease-in-out forwards',
        'fade-in-backdrop': 'fadeInBackdrop 0.2s linear forwards',
        'fade-out-backdrop': 'fadeOutBackdrop 0.2s ease-in-out forwards'
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
