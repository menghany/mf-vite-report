import { defineConfig,  } from 'vite'
import { federation } from '@module-federation/vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  react(),
  federation({
    name: 'fo_preview',
    filename: 'foPreview.js',
    manifest: true,
    exposes: {
      './FoPreview': './src/FoPreview.tsx',
    },
    shared: {
      'react': {
        singleton: true,
      },
      'react-dom': {
        singleton: true,
      },
    },
  }),
],
  preview: {
    port: 5173,
  },
  server:{
    port: 5173,
  },
  build:{
    target: 'chrome89',
  }
})
