import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const colors = {
  neutral: {
    secondary: '#4F4F4F',
  },
  outline: 'rgba(0, 0, 0, 0.12)',
  primary: {
    400: '#765AFF',
    50: '#EFE8FF',
  },
  secondary: {
    100: '#BFFBE5',
    200: '#8FF9D6',
    900: '#009061',
  },
  wfAccents: {
    greenLight: '#D1FFD9',
  },
  wfBase: {
    0: '#FFFFFF',
    100: '#F8F7FA',
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
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    error: {
      main: red.A400,
    },
    primary: {
      main: colors.primary[400],
    },
    secondary: {
      main: colors.secondary[100],
    },
  },
  typography: {
    body2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: '3rem',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '0.18px',
      lineHeight: 1,
    },
    h6: {
      fontSize: '20px',
      fontWeight: 500,
      letterSpacing: '0.15px',
      lineHeight: '24px',
    },
  },
});

export default theme;
