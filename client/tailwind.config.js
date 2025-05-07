/** @type {import('tailwindcss').Config} */
import { colors } from './src/lib/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EF9651',
          light: '#F5B17A',
          dark: '#EA7300',
          muted: '#EF9651/80',
        },
        secondary: {
          DEFAULT: '#8B4513',
          light: '#A0522D',
          dark: '#654321',
          muted: '#8B4513/80',
        },
        background: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          dark: '#0A0A0A',
        },
        text: {
          DEFAULT: '#FFFFFF',
          light: '#F5F5F5',
          dark: '#CCCCCC',
          muted: '#FFFFFF/80',
        },
        accent: {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
          dark: '#B8860B',
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['MedievalSharp', 'serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [],
} 