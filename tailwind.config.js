/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kiosk: {
          teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
          },
          amber: {
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          ayush: {
            50: '#f0fdf4',
            100: '#dcfce7',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
          }
        }
      },
      minHeight: {
        'touch': '60px',
        'touch-lg': '72px',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanLine 2s ease-in-out infinite',
        'wave': 'soundWave 1.2s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%, 100%': { top: '5%' },
          '50%': { top: '90%' },
        },
        soundWave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        }
      }
    },
  },
  plugins: [],
}
