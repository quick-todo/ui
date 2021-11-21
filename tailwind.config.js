module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      container: {
        screen: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1024px",
          '2xl': "1024px"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}