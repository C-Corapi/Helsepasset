/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6f4',
          100: '#d8e9e6',
          200: '#b7d7d1',
          300: '#93c2ba',
          400: '#73b0a5',
          500: '#5ca395',
          600: '#4d8b80',
          700: '#3d6c63',
          800: '#2e524b',
          900: '#203733',
          950: '#142421',
        },
        accent: {
          50:  '#fff7ed',
          100: '#ffecd5',
          200: '#fed6aa',
          300: '#fdb373',
          400: '#fb8a3b',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
