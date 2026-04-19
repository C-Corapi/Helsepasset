/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#edfcf7',
          100: '#d2f7ea',
          200: '#a7efd8',
          300: '#73e4c3',
          400: '#3ed6ac',
          500: '#16c18f',
          600: '#0d9d74',
          700: '#0f7d5f',
          800: '#11634d',
          900: '#11513f',
          950: '#042f25',
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
