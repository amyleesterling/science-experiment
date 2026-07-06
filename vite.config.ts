import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Standalone wall-display build. Deployed to
// amyleesterling.github.io/science-experiment/ — paths must be prefixed.
// In dev (npm run dev) we still want '/' so the iframe preview works.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/science-experiment/' : '/',
  plugins: [react(), tailwindcss()],
}))
