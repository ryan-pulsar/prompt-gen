const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3B82F6',
        'custom-green': '#10B981',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#3B82F6',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#10B981',
              foreground: '#ffffff',
            },
            focus: '#3B82F6',
          },
        },
      },
    }),
  ],
}