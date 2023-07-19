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
        primary: { 50: '#FFF5F2', 100: '#FFF1EE', 200: '#FFE4DE', 300: '#FFD5CC', 400: '#FFBCAD', 500: '#FE795D', 600: '#EF562F', 700: '#EB4F27', 800: '#CC4522', 900: '#A5371B'},
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