/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#1a1a1a',
          'secondary': '#f5f5f5',
          'accent': '#8b8b8b',
          'terra': '#C84C35',
          'sand': '#F8F5F2',
          'stone': '#2C2C2C',
          'taupe': '#9A8C7E'
        },
        fontFamily: {
          'sans': ['Helvetica Neue', 'sans-serif'],
          'display': ['Monument Extended', 'sans-serif'],
        },
        fontSize: {
          'huge': 'clamp(2rem, 8vw, 8rem)',
        },
      },
    },
    plugins: [],
  }