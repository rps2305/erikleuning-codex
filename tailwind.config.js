export default {
  content: [
    './src/pages/**/*.html',
    './src/partials/**/*.html',
    './src/js/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0d7ea3',
          light: '#3aa6c4',
          dark: '#0a5d78'
        },
        accent: '#0f766e'
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 118, 110, 0.08)'
      }
    }
  },
  plugins: []
};
