/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          neon: {
            purple: '#bc13fe',
            cyan: '#12f7ff',
            pink: '#f900bf',
            blue: '#05d9e8',
          },
          dark: {
            bg: '#0a0b1e',
            card: '#161b33',
            border: '#2c3e50',
          }
        },
        boxShadow: {
            'neon-purple': '0 0 15px #bc13fe',
            'neon-cyan': '0 0 15px #12f7ff',
        },
        animation: {
            'glow-slow': 'glow 3s ease-in-out infinite alternate',
        },
        keyframes: {
            glow: {
                '0%': { opacity: 0.5, transform: 'scale(1)' },
                '100%': { opacity: 1, transform: 'scale(1.05)' },
            }
        }
      },
    },
    plugins: [],
  }
