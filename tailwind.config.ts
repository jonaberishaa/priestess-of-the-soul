import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFFFCFF',
        'cream-warm': '#F5F0E8',
        brown: '#201616',
        'brown-light': '#5C4A3A',
        burgundy: '#B31B1B',
        'burgundy-dark': '#8A1515',
        gold: '#97845B',
        'gold-light': '#C4B08A',
        stone: '#8C8070',
      },
      fontFamily: {
        heading: ['"Bodoni Moda"', 'Georgia', 'serif'],
        body: ['Merriweather', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      maxWidth: {
        content: '100rem',
      },
    },
  },
  plugins: [],
};

export default config;
