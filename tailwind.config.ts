import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand — muted deep forest green
        forest: {
          50:  '#f0f6f2',
          100: '#d9ede2',
          200: '#b2dbc5',
          300: '#7ec3a2',
          400: '#4da87e',
          500: '#2e8b5a',  // main accent
          600: '#1f6b44',
          700: '#185235',
          800: '#123d28',
          900: '#0c2a1c',
        },
        // Neutral surface tones — warm gray with subtle green cast
        ink: {
          50:  '#f3f5f3',
          100: '#e7ebe7',
          200: '#cfd5cf',
          300: '#acb4ac',
          400: '#878f87',
          500: '#6a716a',
          600: '#545b54',
          700: '#424842',
          800: '#353b35',
          900: '#1d211d',
        },
        // Secondary accent — desaturated slate blue
        slate: {
          400: '#7896b0',
          500: '#5778a0',
          600: '#415d82',
        },
        // Warm amber for energy category
        ember: {
          400: '#c4925a',
          500: '#a67240',
          600: '#845a30',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        card:    '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-md': '0 4px 12px 0 rgb(0 0 0 / 0.07), 0 1px 3px -1px rgb(0 0 0 / 0.06)',
        'card-dark': '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
