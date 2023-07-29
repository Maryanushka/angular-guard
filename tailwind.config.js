/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
			colors: {
					transparent: 'transparent',
					current: 'currentColor',
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
	safelist: [
    'bg-dark-50',
    'bg-light-blue-300',
  ],
  plugins: [],
}

