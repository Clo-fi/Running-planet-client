import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Running-Planet',
        short_name: 'RunPle',
        start_url: '/',
        scope: ".",
        lang: 'ko-KR',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        description: 'Running Planet with PWA!',
        icons: [
          {
            'src': '/logo/favicon-16x16.png',
            'sizes': '16x16',
            'type': 'image/png',
          },
          {
            'src': '/logo/favicon-32x32.png',
            'sizes': '32x32',
            'type': 'image/png',
          },
          {
            'src': '/logo/android-chrome-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'any maskable'
          },
          {
            'src': '/logo/android-chrome-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'any'
          },
        ]
      }
    })
  ],
  optimizeDeps: {
    include: ['styled-components']
  }
})
