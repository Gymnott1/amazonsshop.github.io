module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#f06292",
        secondary: "#fdd835",
        accent: "#4fc3f7",
        dark: "#333333",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}