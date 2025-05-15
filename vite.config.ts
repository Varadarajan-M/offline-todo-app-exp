import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.png',
      ],  
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      manifest: {
        name: 'Todo List',
        short_name: 'Todos',
        description: 'An offline app to store your todos',
        icons: [
          {
            src: './icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'favicon',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon',
          },
          {
            src: './icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: './icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'icon',
          },
          {
            src: './icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        theme_color: '#181818',
        background_color: '#e8eac2',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
      },
    }),
  ]
});
