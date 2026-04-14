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
        body: 'var(--body, #f1f5f9)',
        surface: 'var(--surface, #fff)',
        text: 'var(--text, #0f172a)',
        accent: 'var(--accent, #0891b2)',
        'accent-dark': 'var(--accent-dark, #0e7490)',
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
