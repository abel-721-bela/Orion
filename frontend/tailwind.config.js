/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'orion': {
                    'dark': '#0a0e1a',
                    'darker': '#060911',
                    'accent': '#6366f1',
                    'accent-light': '#818cf8',
                    'accent-dark': '#4f46e5',
                },
                'urgency': {
                    'low': '#10b981',
                    'medium': '#f59e0b',
                    'high': '#f97316',
                    'critical': '#ef4444',
                }
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            },
            backdropBlur: {
                'xs': '2px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
                'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
