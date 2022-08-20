/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        n900: '#111111',
        primary: '#16ABF8',
        danger: '#ED4C5C',
        warning: '#F8A541',
        success: '#00A790',
        info: '#428BC1',
        purple: '#8942C1',
        secondary: '#888888',
        'bg-primary': '#F4F4F4',
      },
    },
  },
  plugins: [],
};
