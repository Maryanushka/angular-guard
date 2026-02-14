/** @type {import('tailwindcss').Config} */
colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        ghostWhite: '#F4F4F9',
        munsell: '#EC0B43',
        darkGreen: '#123633',
        pesianGreen: '#00A194',
        transparent: 'transparent',
        current: 'currentColor',
        battleshipGray: '#999999',
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        stone: colors.stone,
        sky: colors.sky,
        blue: colors.blue,
        cayan: colors.cayan,
        neutral: colors.trueGray,
        gray: colors.coolGray,
        slate: colors.blueGray,
      },
    },
  },
  safelist: ['bg-dark-50', 'bg-light-blue-300'],
  plugins: [],
};
