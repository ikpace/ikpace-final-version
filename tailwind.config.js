/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3D7C',
          light: '#4A6FA5',
          dark: '#0F2654'
        },
        secondary: {
          DEFAULT: '#FF7A00',
          light: '#FFA651',
          dark: '#CC6200'
        },
        accent: {
          green: '#00C853',
          yellow: '#FFD600'
        },
        neutral: {
          dark: '#333333',
          gray: '#F5F5F5',
          light: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
