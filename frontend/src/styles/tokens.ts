export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: '50%',
} as const

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.3)',
  md: '0 4px 12px rgba(0,0,0,0.4)',
  lg: '0 8px 24px rgba(0,0,0,0.5)',
} as const

export const zIndex = {
  sidebar: 1200,
  topBar: 1300,
  chatPanel: 1100,
  modal: 1400,
  tooltip: 1500,
} as const

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
  h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
  body1: { fontSize: '0.938rem', fontWeight: 400, lineHeight: 1.6 },
  body2: { fontSize: '0.813rem', fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.5 },
  overline: { fontSize: '0.688rem', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.08em', textTransform: 'uppercase' as const },
} as const

export const layout = {
  sidebarWidth: 240,
  sidebarCollapsedWidth: 64,
  topBarHeight: 56,
  chatPanelWidth: 360,
} as const
