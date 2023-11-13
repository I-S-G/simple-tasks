import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa" 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
  ],
})
