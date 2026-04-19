/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f4fbf7',
          100: '#e8f5ed',
          200: '#d0eadb',
          300: '#b1dcc4',
          400: '#8dcca6',
          500: '#6eba85',
          600: '#57a56f',
          700: '#44875a',
          800: '#376c49',
          900: '#2f583e',
          950: '#183123',
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
