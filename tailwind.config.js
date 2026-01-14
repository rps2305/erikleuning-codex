module.exports = {
  content: [
    './*.html',
    './assets/**/*.{js,css}',
    './docs/**/*.md',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        body: 'var(--body)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
