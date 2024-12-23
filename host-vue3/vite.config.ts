import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [

  vue(),
  react({
    include: ['**/[_]*[rR]eact*/**', '**/[_]*[rR]eact*.*'],
  }),
    federation({
    name: 'cockpit',
    remotes: {
      fo_preview: {
        type: 'module',
        name: 'fo_preview',
        entry: 'http://localhost:5173/foPreview.js',
      },
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
    port: 4173,
  },
  server:{
   port: 4173 
  },
  build:{
    target: 'chrome89',
  }
})
