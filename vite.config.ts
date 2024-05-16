import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          kakaoApiKey: process.env.VITE_KAKAO_KEY,
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Running_Planet',
        short_name: 'RunPle',
        start_url: '/',
        scope: ".",
        lang: 'ko-KR',
        display: 'fullscreen',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      }
    })
  ]
})
