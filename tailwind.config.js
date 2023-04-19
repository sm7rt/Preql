const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      // Background color
      pattern: /bg-*/,
    },
    {
      // Text color
      pattern: /text-(.*)-([0-9]*)/,
    },
  ],
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      colors: {
        aquamarine: {
          // TODO: Need to add the full range of aquamarine
          200: '#DFFDEB',
          300: '#CEFCE1',
          50: '#F7FEFA',
          500: '#A7FBCC',
        },
        primary: '#7B61FF',
        purple: {
          200: '#D4CEFF',
          50: '#F6F5FF',
          500: '#7B61FF',
          900: '#372B72',
        },
        secondary: '#A7FBCC',
        wfbase: {
          0: '#FFFFFF',
          100: '#F8F7FA',
          1000: '#14131A',
          200: '#F3F2F7',
          300: '#EAE9F0',
          400: '#D9D7E0',
          50: '#FAFAFC',
          500: '#B3B1C0',
          600: '#878496',
          700: '#5C5968',
          800: '#3D3A48',
          900: '#212029',
        },
      },
      fontFamily: {
        primary: ['Poppins', 'Helvetica', 'Arial'] /* Poppins: font-primary */,
      },
      fontSize: {
        12: ['12px', '18px'],
        14: ['14px', '21px'],
        16: ['16px', '24px'],
        18: ['18px', '27px'],
        20: ['20px', '28px'],
        22: ['22px', '35.2px'],
        24: ['24px', '33.6px'],
        32: ['32px', '41.6px'],
        40: ['40px', '48px'],
        48: ['48px', '57.6px'],
        56: ['56px', '67.2px'],
      },
    },
  },
};
