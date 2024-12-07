/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],

  theme: {
    extend: {
      screens: {
        '<430': { max: '429px' }, // Custom breakpoint for less than 430px
      },

      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards', // Custom animation class
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    
      colors: {
        primary: {
          DEFAULT: '#F6F6F6',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#D6E4F0',
          foreground: 'hsl(var(--secondary-foreground))',
        },
      },
      }
      
  },
  plugins: [],
   
    "compilerOptions": {
      // ...
      "baseUrl": ".",
      "paths": {
        "@/*": [
          "./src/*"
        ]
      }
      // ...
   
  }
}
