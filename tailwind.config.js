/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f3f8f3',
          100: '#e3efe3',
          200: '#c7dfc8',
          300: '#9cc59f',
          400: '#6ba36f',
          500: '#4a854f',
          600: '#386b3d',
          700: '#2e5532',
          800: '#27442b',
          900: '#213825',
        },
        earth: {
          50: '#faf6f1',
          100: '#f2e9dd',
          200: '#e4d1ba',
          300: '#d2b18d',
          400: '#bf8f64',
          500: '#b07549',
          600: '#9a5f3d',
          700: '#804b34',
          800: '#693e2f',
          900: '#573529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.06)',
        card: '0 8px 30px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
