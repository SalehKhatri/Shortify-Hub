/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': [ 'Arial','Helvetica', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}

