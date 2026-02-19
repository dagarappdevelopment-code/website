import { createTheme } from '@mui/material/styles'
import { typography, radii } from './tokens'

const palette = {
  primary: {
    main: '#6C5CE7',
    light: '#A29BFE',
    dark: '#4A3DB8',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#00D2D3',
    light: '#55E6C1',
    dark: '#009B9C',
    contrastText: '#000000',
  },
  background: {
    default: '#0B0D17',
    paper: '#141625',
  },
  surface: {
    main: '#1A1D2E',
    light: '#242842',
    dark: '#0F1120',
  },
  text: {
    primary: '#E8E8ED',
    secondary: '#8F92A1',
    disabled: '#5A5D6E',
  },
  divider: '#2A2D3E',
  success: {
    main: '#00B894',
    light: '#55E6C1',
    dark: '#008C6E',
  },
  warning: {
    main: '#FDCB6E',
    light: '#FFEAA7',
    dark: '#E17055',
  },
  error: {
    main: '#FF6B6B',
    light: '#FF8A8A',
    dark: '#EE5A24',
  },
  info: {
    main: '#74B9FF',
    light: '#A4D4FF',
    dark: '#0984E3',
  },
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    ...palette,
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    body1: typography.body1,
    body2: typography.body2,
    caption: typography.caption,
    overline: typography.overline,
  },
  shape: {
    borderRadius: radii.md,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.background.default,
          scrollbarWidth: 'thin',
          scrollbarColor: `${palette.divider} transparent`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: radii.md,
          padding: '8px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: palette.divider,
          '&:hover': {
            borderColor: palette.primary.main,
            backgroundColor: 'rgba(108,92,231,0.08)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          border: `1px solid ${palette.divider}`,
          borderRadius: radii.lg,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.divider}`,
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          color: palette.text.secondary,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minWidth: 'auto',
          padding: '8px 16px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.paper,
          borderRight: `1px solid ${palette.divider}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: palette.divider,
            },
            '&:hover fieldset': {
              borderColor: palette.text.secondary,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: radii.sm,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.surface?.main,
          border: `1px solid ${palette.divider}`,
          fontSize: '0.75rem',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: radii.sm,
          backgroundColor: palette.divider,
        },
      },
    },
  },
})

export default theme
