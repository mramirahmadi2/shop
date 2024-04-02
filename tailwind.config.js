/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#e2e8f0', // تعریف رنگ سفید کمی تیره‌تر
      },
    },
  },
  plugins: [],
}
