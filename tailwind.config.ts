import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/app/globals.css'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#111827',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#374151',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F8FAFC',
          foreground: '#64748B',
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
        success: {
          DEFAULT: '#16A34A',
          foreground: '#FFFFFF',
        },
        danger: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e5e7eb',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 16px -4px rgb(0 0 0 / 0.06)',
        'card-hover':
          '0 8px 28px -6px rgb(0 0 0 / 0.08), 0 2px 8px -2px rgb(0 0 0 / 0.04)',
        search: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 8px 32px -8px rgb(0 0 0 / 0.08)',
        premium: '0 1px 2px 0 rgb(0 0 0 / 0.03), 0 8px 24px -6px rgb(0 0 0 / 0.06)',
        elevated: '0 16px 48px -12px rgb(0 0 0 / 0.12)',
      },
      backgroundImage: {
        'hero-subtle':
          'radial-gradient(circle at 80% 20%, rgba(249,115,22,0.05) 0%, transparent 50%)',
        'section-grid':
          'linear-gradient(to right, rgba(229,231,235,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,231,235,0.4) 1px, transparent 1px)',
        'hero-pattern':
          'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)',
        'road-lines':
          'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)',
        'brand-mesh':
          'radial-gradient(at 40% 20%, rgba(249,115,22,0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(234,88,12,0.2) 0px, transparent 50%)',
        'section-dots':
          'radial-gradient(circle, rgba(249,115,22,0.12) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
        dots: '24px 24px',
      },
      maxWidth: {
        '8xl': '90rem', // 1440px
        '9xl': '96rem', // 1536px — site container (7xl = 1280px)
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow:
              '0 0 0 1px rgba(249,115,22,0.08), 0 20px 40px -12px rgba(0,0,0,0.08), 0 0 40px -12px rgba(249,115,22,0.12)',
          },
          '50%': {
            boxShadow:
              '0 0 0 1px rgba(249,115,22,0.15), 0 24px 48px -12px rgba(0,0,0,0.1), 0 0 56px -8px rgba(249,115,22,0.22)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
