/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* Helsepasset palette — mapped from CSS custom properties */
        sand:       'hsl(var(--hp-sand))',
        ink:        'hsl(var(--hp-ink))',
        card:       { DEFAULT: 'hsl(var(--hp-card))', ink: 'hsl(var(--hp-card-ink))' },
        forest:     { DEFAULT: 'hsl(var(--hp-forest))', contrast: 'hsl(var(--hp-forest-contrast))' },
        mint:       { DEFAULT: 'hsl(var(--hp-mint))', contrast: 'hsl(var(--hp-mint-contrast))' },
        peach:      { DEFAULT: 'hsl(var(--hp-peach))', contrast: 'hsl(var(--hp-peach-contrast))' },
        muted:      { DEFAULT: 'hsl(var(--hp-muted))', ink: 'hsl(var(--hp-muted-ink))' },
        sage:       { DEFAULT: 'hsl(var(--hp-sage))', ink: 'hsl(var(--hp-sage-ink))' },
        danger:     { DEFAULT: 'hsl(var(--hp-danger))', contrast: 'hsl(var(--hp-danger-contrast))' },
        edge:       'hsl(var(--hp-edge))',
        field:      'hsl(var(--hp-field))',
        focus:      'hsl(var(--hp-focus))',
      },
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        'hp-rise': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hp-drift': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-7px)' },
        },
      },
      animation: {
        'hp-rise':  'hp-rise 0.55s ease-out both',
        'hp-drift': 'hp-drift 5.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
