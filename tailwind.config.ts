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
        ink: {
          DEFAULT: '#0B0F14',
        },
        cream: '#F5F1E8',
        sand:  '#EFE7D3',
        border: 'rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans:      ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        serif:     ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        display:   ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-kalam)',   'Caveat', 'cursive'],
        handwrite: ['var(--font-kalam)',   'Caveat', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        microcaps: '0.16em',
      },
      boxShadow: {
        'soft':       '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)',
        'card':       '0 10px 30px -10px rgba(15,23,42,0.10), 0 2px 6px rgba(15,23,42,0.04)',
        'elevated':   '0 30px 60px -20px rgba(15,23,42,0.18), 0 10px 20px -10px rgba(15,23,42,0.08)',
        'premium':    '0 50px 100px -30px rgba(15,23,42,0.25), 0 16px 32px -16px rgba(15,23,42,0.10)',
        'glow-gold':  '0 20px 60px -10px rgba(201,168,76,0.35)',
        'glow-navy':  '0 20px 60px -10px rgba(30,58,95,0.35)',
        'inset-light':'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
      },
      animation: {
        'drawerLink':   'drawerLinkIn 0.4s ease both',
        'gradient-x':   'gradient-x 12s ease infinite',
        'shimmer':      'shimmer 2.4s linear infinite',
        'marquee':      'marquee 28s linear infinite',
        'marquee-slow': 'marquee 42s linear infinite',
        'float-slow':   'float 8s ease-in-out infinite',
        'spotlight':    'spotlight 6s ease-in-out infinite',
        'fade-up':      'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'underline':    'underline 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        drawerLinkIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':      { 'background-position': '100% 50%' },
        },
        shimmer: {
          '0%':   { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        spotlight: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)',   opacity: '0.45' },
          '50%':      { transform: 'translate(-45%, -55%) scale(1.1)', opacity: '0.65' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        underline: {
          from: { 'background-size': '0% 100%' },
          to:   { 'background-size': '100% 100%' },
        },
      },
      backgroundImage: {
        'mesh-cream':
          'radial-gradient(at 18% 22%, rgba(201,168,76,0.08) 0px, transparent 60%), radial-gradient(at 82% 80%, rgba(30,58,95,0.06) 0px, transparent 65%)',
        'mesh-navy':
          'radial-gradient(at 30% 10%, rgba(201,168,76,0.14) 0px, transparent 60%), radial-gradient(at 80% 100%, rgba(255,255,255,0.04) 0px, transparent 60%)',
        'fade-section-top':
          'linear-gradient(to bottom, rgba(250,250,248,0) 0%, rgba(250,250,248,1) 100%)',
        'fade-section-bottom':
          'linear-gradient(to bottom, rgba(250,250,248,1) 0%, rgba(250,250,248,0) 100%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
