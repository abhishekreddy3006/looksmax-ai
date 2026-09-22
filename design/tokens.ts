/**
 * Design Tokens — Refine
 * Premium wellness + editorial + Apple simplicity
 * Warm off-white + charcoal + terracotta clay
 */

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700' as const,
    letterSpacing: -0.64,
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.28,
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.11,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.12,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0.16,
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.26,
  },
  numeric: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
} as const;

export const lightColors = {
  background: '#FDFCFB',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSubtle: '#F6F3F0',
  textPrimary: '#1A1C1E',
  textSecondary: '#6B6E70',
  textMuted: '#9CA0A3',
  border: '#E8E2DE',
  borderStrong: '#D5CFCB',
  accent: '#C17C60',
  accentSoft: '#F2E6E0',
  accentStrong: '#A8654A',
  success: '#6B8F7B',
  successSoft: '#E4EDE7',
  warning: '#C9A86A',
  warningSoft: '#F5ECD8',
  danger: '#C46B6B',
  dangerSoft: '#F2DFDF',
  info: '#7A8FA6',
  infoSoft: '#E2E8EE',
  overlay: 'rgba(26,28,30,0.6)',
} as const;

export const darkColors = {
  background: '#121415',
  surface: '#1C1F22',
  surfaceElevated: '#23272A',
  surfaceSubtle: '#2A2E31',
  textPrimary: '#F5F3F0',
  textSecondary: '#A8ADB0',
  textMuted: '#7A7F83',
  border: '#2E3336',
  borderStrong: '#3A4044',
  accent: '#D49A7F',
  accentSoft: '#3A2A24',
  accentStrong: '#E8B49A',
  success: '#8FB89F',
  successSoft: '#2A3A30',
  warning: '#D4B87A',
  warningSoft: '#3A3320',
  danger: '#D68A8A',
  dangerSoft: '#3A2A2A',
  info: '#8FA6C0',
  infoSoft: '#2A333A',
  overlay: 'rgba(0,0,0,0.7)',
} as const;

export interface Colors {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderStrong: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  info: string;
  infoSoft: string;
  overlay: string;
}


export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;

export const animation = {
  duration: {
    micro: 200,
    transition: 300,
    entrance: 500,
    breathing: 1000,
  },
  easing: {
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
} as const;
