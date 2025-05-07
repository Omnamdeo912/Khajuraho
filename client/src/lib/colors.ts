export const colors = {
  primary: {
    DEFAULT: '#EA7300', // Orange
    light: '#FF8C00',
    dark: '#CC6600',
    muted: '#FFA54F',
  },
  secondary: {
    DEFAULT: '#74512D', // Brown
    light: '#8B4513',
    dark: '#5C4033',
    muted: '#A67C52',
  },
  background: {
    DEFAULT: '#F5F5F5',
    dark: '#1A1A1A',
    light: '#FFFFFF',
  },
  text: {
    DEFAULT: '#333333',
    light: '#666666',
    dark: '#000000',
    white: '#FFFFFF',
  },
  accent: {
    DEFAULT: '#8B4513', // Terracotta
    light: '#A0522D',
    dark: '#654321',
  },
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
} as const;

export type ColorKey = keyof typeof colors;
export type ColorVariant = 'DEFAULT' | 'light' | 'dark' | 'muted'; 