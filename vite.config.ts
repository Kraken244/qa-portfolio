import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base keeps the build portable across Vercel, Netlify and GitHub Pages.
  base: './',
  plugins: [react()],
})
