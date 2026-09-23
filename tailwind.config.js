/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          DEFAULT: '#1a472a',
          light: '#2d5a3c',
          dark: '#0f2d1a',
        },
        // "Lakeside" property template (src/components/property/lakeside).
        // Every text/background pair used there is at least 4.5:1.
        lake: {
          paper: '#F4F1EA',
          ink: '#1C2520',
          spruce: '#1F3A2E',
          'spruce-dark': '#162B22',
          moss: '#5E6B55',
          // The design's ember (#B8683A) is 3.7:1 on paper; darkened to 4.9:1
          // because it is used for small caps labels.
          ember: '#9E5528',
          // Ember for labels on the spruce band (6.6:1).
          'ember-light': '#D8B98F',
          line: '#D8D1C2',
          mute: '#5A625B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        'lake-serif': ['var(--font-lake-serif)', 'Georgia', 'serif'],
        'lake-sans': ['var(--font-lake-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
