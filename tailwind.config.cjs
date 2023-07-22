const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require('flowbite/plugin')
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F6FAFE",
          100: "#E9F2FC",
          200: "#D3E6F8",
          300: "#BDD9F5",
          400: "#A3C9F0",
          500: "#84B8EC",
          600: "#60A3E6",
          700: "#2E86DE",
          800: "#1E6EBD",
          900: "#16528D",
          950: "#103B65"
        },
        warning: '#faca15',
        info: '#76a9fa',
        success: '#31c48d',
        error: '#f98080',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '8rem',
          '2xl': '12rem',
        },
      },
    }
  }
};

module.exports = config;