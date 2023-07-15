/** @type {import('tailwindcss').Config} */
import tremor from './tremor.config';
import ui from '@headlessui/tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      // tremor - charts ui library
      colors: {
        tremor: tremor['light-tremor'],
        'dark-tremor': tremor['dark-tremor'],
      },
      boxShadow: {
        ...tremor.boxShadow,
      },
      borderRadius: {
        ...tremor.borderRadius,
      },
      fontSize: {
        ...tremor.fontSize,
      },
    },
  },
  safelist: tremor.safelist,
  plugins: [ui],
};
