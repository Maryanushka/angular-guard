import Aura from '@primeuix/themes/aura/index';
import { definePreset } from '@primeuix/themes';

/**
 * Tailwind colors:
 * - pesianGreen: #00A194 (primary brand)
 * - munsell: #EC0B43 (accent / danger-ish)
 * - darkGreen: #123633
 * - ghostWhite: #F4F4F9
 * - battleshipGray: #999999
 */
const brand = {
	pesianGreen: '#00A194',
	munsell: '#EC0B43',
	darkGreen: '#123633',
	ghostWhite: '#F4F4F9',
	battleshipGray: '#999999',
};

// Primary scale derived from pesianGreen (#00A194).
const primaryScale = {
	50: '#E6F7F6',
	100: '#B3EBE7',
	200: '#80DFD9',
	300: '#4DD3CA',
	400: '#26C4B8',
	500: '#00A194',
	600: '#008F84',
	700: '#007D73',
	800: '#006B63',
	900: '#005952',
	950: '#003D38',
};

export const appThemePreset = definePreset(Aura, {
	semantic: {
		primary: primaryScale,

		// Optional: provide extra semantic palettes so components can use them consistently
		// (especially useful if you later map severity colors).
		// If your version doesn’t support these keys, it’ll just ignore them.
		colorScheme: {
			light: {
				// Main brand usage
				primary: {
					color: '{primary.500}',
					inverseColor: '#ffffff',
					hoverColor: '{primary.600}',
					activeColor: '{primary.700}',
				},

				// Surfaces / backgrounds
				surface: {
					0: '#ffffff',
					50: brand.ghostWhite, // page background
					100: '#EEF2F2', // subtle panels
					200: '#E5EAEA', // dividers
					300: '#D7DEDE',
					400: '#B6C2C2',
					500: '#93A3A3',
					600: '#6E8080',
					700: '#4B5F5F',
					800: '#2C3E3E',
					900: brand.darkGreen, // deep surface
					950: '#0B1F1D',
				},

				// Text colors
				text: {
					color: brand.darkGreen,
					secondaryColor: '#3A5C59',
					mutedColor: brand.battleshipGray,
					inverseColor: '#ffffff',
				},

				// Borders / outlines
				border: {
					color: '#D7DEDE',
					hoverColor: '#B6C2C2',
				},

				// Focus ring (matches brand)
				focusRing: {
					color: '{primary.300}',
					shadow: '0 0 0 3px rgba(0, 161, 148, 0.25)',
				},

				// Highlight / selection
				highlight: {
					background: '{primary.50}',
					color: brand.darkGreen,
				},

				// Link color
				link: {
					color: '{primary.600}',
					hoverColor: '{primary.700}',
				},

				// Accent (your munsell)
				// You can use this for "danger" mapping in your app styles or severity overrides.
				accent: {
					color: brand.munsell,
					hoverColor: '#D10A3B',
					activeColor: '#B80833',
					inverseColor: '#ffffff',
				},
			},

			dark: {
				primary: {
					color: '{primary.400}',
					inverseColor: '{primary.950}',
					hoverColor: '{primary.300}',
					activeColor: '{primary.200}',
				},

				surface: {
					0: '#0B1F1D',
					50: '#0F2624',
					100: '#13302D',
					200: '#1A3D39',
					300: '#24514D',
					400: '#2E6661',
					500: '#3A7C76',
					600: '#4F9690',
					700: '#71B3AE',
					800: '#A0D0CC',
					900: brand.ghostWhite,
					950: '#ffffff',
				},

				text: {
					color: brand.ghostWhite,
					secondaryColor: '#A0D0CC',
					mutedColor: '#7E9D9A',
					inverseColor: brand.darkGreen,
				},

				border: {
					color: '#1A3D39',
					hoverColor: '#24514D',
				},

				focusRing: {
					color: '{primary.300}',
					shadow: '0 0 0 3px rgba(38, 196, 184, 0.22)',
				},

				highlight: {
					background: '{primary.950}',
					color: brand.ghostWhite,
				},

				link: {
					color: '{primary.300}',
					hoverColor: '{primary.200}',
				},

				accent: {
					color: brand.munsell,
					hoverColor: '#FF2E67',
					activeColor: '#FF4A7B',
					inverseColor: '#ffffff',
				},
			},
		},
	},
});
