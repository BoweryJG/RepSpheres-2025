import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e2c3', // Teal/cyan color from the Netlify site
      light: '#33e8cf',
      dark: '#00b09a',
    },
    secondary: {
      main: '#7c5dfa', // Purple color from the Netlify site
      light: '#957dfb',
      dark: '#6247c8',
    },
    error: {
      main: '#ff4d6a',
      light: '#ff7086',
      dark: '#c93e55',
    },
    warning: {
      main: '#ffb840',
      light: '#ffc66b',
      dark: '#cc9333',
    },
    info: {
      main: '#3498db',
      light: '#5baddf',
      dark: '#2979af',
    },
    success: {
      main: '#2ecc71',
      light: '#57d68a',
      dark: '#24a35a',
    },
    background: {
      default: '#0a0e1a', // Very dark blue for space theme
      paper: '#111827',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
        },
        contained: {
          background: 'linear-gradient(90deg, #00e2c3 0%, #7c5dfa 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(90deg, #00ccaf 0%, #6b4fe0 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 14, 26, 0.8)',
          backdropFilter: 'blur(8px)',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
