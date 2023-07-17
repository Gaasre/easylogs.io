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
        // flowbite-svelte
        primary: { 50: '#FFF5F2', 100: '#FFF1EE', 200: '#FFE4DE', 300: '#FEF4DF', 400: '#FDE7C0', 500: '#F9D49F', 600: '#F4C085', 700: '#EDA35E', 800: '#CB7E44', 900: '#AA5E2F'},
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