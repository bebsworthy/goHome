import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Import manifest and ensure types are correct
const manifest = {
  name: "GoHome - SNCF Train Finder",
  short_name: "GoHome",
  description: "Find your way home with fast SNCF train searches",
  theme_color: "#0088ce",
  background_color: "#ffffff",
  display: "standalone" as const,
  orientation: "portrait-primary" as const,
  start_url: "/",
  scope: "/",
  icons: [
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

// https://vite.dev/config/
export default defineConfig({
  // Add appType to handle client-side routing properly
  appType: 'spa',
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'service-worker.js',
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: false,
        type: 'module',
        navigateFallback: 'index.html',
        navigateFallbackAllowlist: [/^index.html$/]
      },
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        sourcemap: true,
        navigationPreload: true,
        runtimeCaching: process.env.NODE_ENV === 'production' ? [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          }
        ] : []
      }
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
   
});
