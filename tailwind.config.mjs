/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f7f5',
          100: '#dbede7',
          200: '#badbd1',
          300: '#8dc2b4',
          400: '#63a898',
          500: '#4d8b80',
          600: '#3d7068',
          700: '#345e57',
          800: '#2d4d48',
          900: '#27423d',
          950: '#142624',
        },
        accent: {
          50:  '#fff7ed',
          100: '#ffedd4',
          200: '#fed8a8',
          300: '#fdba71',
          400: '#fb9338',
          500: '#e87722',
          600: '#d45e0f',
          700: '#b04610',
          800: '#8d3814',
          900: '#733013',
          950: '#3e1507',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
