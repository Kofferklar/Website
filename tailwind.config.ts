import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A5F',
          foreground: '#FFFFFF',
          50:  '#EEF3FA',
          100: '#D4E0F0',
          200: '#A9C1E1',
          300: '#7EA2D2',
          400: '#5383C3',
          500: '#1E3A5F',
          600: '#182F4C',
          700: '#122439',
          800: '#0C1926',
          900: '#060D13',
        },
        accent: {
          DEFAULT: '#C9A84C',
          foreground: '#1A1A1A',
          50:  '#FBF6E9',
          100: '#F5EAC8',
          200: '#EBD591',
          300: '#E1C05A',
          400: '#D7AB46',
          500: '#C9A84C',
          600: '#A88A3C',
          700: '#876C2D',
          800: '#664E1E',
          900: '#45300F',
        },
        background: '#FAFAF8',
        foreground: '#1A1A1A',
        muted: {
          DEFAULT: '#F2F2F0',
          foreground: '#6B7280',
        },
        border: 'rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
