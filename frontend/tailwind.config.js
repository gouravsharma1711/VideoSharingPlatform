/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Your project files
    "./node_modules/flowbite/**/*.js" // Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
}

