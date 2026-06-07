import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1C2F3E',
      light: '#2A4459',
      dark: '#0F1A27',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C08B3E',
      light: '#D4A55A',
      dark: '#9B6E2C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F4EF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C2F3E',
      secondary: '#607182',
    },
    divider: '#E2DDD8',
  },
  typography: {
    fontFamily: '"Barlow", "Inter", sans-serif',
    h1: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Barlow", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Barlow", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Barlow", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    overline: {
      fontFamily: '"Barlow", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.12em',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '12px 28px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E2DDD8',
          borderRadius: '6px !important',
          marginBottom: 12,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 0 12px 0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 24px',
          minHeight: 64,
          '&.Mui-expanded': {
            minHeight: 64,
          },
        },
        content: {
          margin: '20px 0',
          fontFamily: '"Barlow", sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          color: '#1C2F3E',
          '&.Mui-expanded': {
            margin: '20px 0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 24px 24px',
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.9375rem',
          lineHeight: 1.75,
          color: '#607182',
        },
      },
    },
  },
});
