/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vortex: {
          dark: '#0a0a0f',
          panel: '#10121d',
          card: '#161928',
          border: '#23273e',
          borderActive: '#3b4267',
          gold: '#c9a24b',
          goldLight: '#e6b84d',
          goldGlow: 'rgba(201, 162, 75, 0.25)',
          normal: '#10b981',
          normalBg: 'rgba(16, 185, 129, 0.12)',
          suspicious: '#f59e0b',
          suspiciousBg: 'rgba(245, 158, 11, 0.12)',
          critical: '#ef4444',
          criticalBg: 'rgba(239, 68, 68, 0.15)',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        pulseCritical: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.45' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(201, 162, 75, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(201, 162, 75, 0.6)' },
        }
      },
      animation: {
        'pulse-critical': 'pulseCritical 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 4s linear infinite',
        'radar': 'radarSweep 3s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
