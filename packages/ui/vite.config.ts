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
  plugins: [
    react(),
    VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: { enabled: true },
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: './src/service-worker.ts',
        swDest: 'dist/service-worker.js',
        injectionPoint: 'self.__WB_MANIFEST',
      },
      workbox: { 
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        cleanupOutdatedCaches: true,
      },
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
