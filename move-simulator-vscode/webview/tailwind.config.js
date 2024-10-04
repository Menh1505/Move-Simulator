/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sidebar': { 'max': '700px' },
      'mini': { 'max': '450px' },


    },
  },
  plugins: [],
}
