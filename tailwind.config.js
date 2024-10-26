/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    colors:{
      'primary':'#e72929',
      'primary-light':'#f8d7da',
      'text-hover':'#e72929',
      'white':'#ffff'
    },
    container:{
      center:true,
      padding:{
        DEFAULT:'1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
    fontSize: {
      'xs'  : '0.625rem',
      'sm'  : '0.75rem', // 12px
      'md'  : '0.8125rem', // 13px
      'base': '0.875rem', // 14px
      'lg'  : '1rem', // 16px
      'xl'  : '1.125rem', // 18px
      '2xl' : '1.25rem', // 20px
      '3xl' : '1.5rem', // 24px
      '3.5xl': '1.625rem', // 26px
      '3.75xl' : '1.75rem', // 28px
      '4xl' : '2rem', // 32px
      '5xl' : '2.25rem', // 36px
      '6xl' : '2.5rem',
      '7xl' : '3rem',
      '8xl' : '4rem',
      '9xl' : '6rem',
      '10xl': '8rem'
    },
    fontFamily: {
      sans: `"Poppins"`,
      serif: `"IBM Plex Sans"`,
    },
    extend: {
      boxShadow: {
        'tableBoxShadow': '0px 0px 10px 1px rgba(0, 0, 0, 0.1)',
        'inputBoxShadow': '0px 0px 19.3px 1px rgba(0, 0, 0, 0.05)',
        'cardBoxShadow' : '0px 1.12px 19.01px 2.01px rgba(0, 91, 174, 0.07);',
        'sidebarBoxShadow': '0px 1.12px 19.01px 2.01px rgba(0, 91, 174, 0.07);',
        'notificationShadow': '0px 4px 15px 2px rgba(0, 0, 0, 0.2);'
      },
    },
  },
  plugins: [],
}

