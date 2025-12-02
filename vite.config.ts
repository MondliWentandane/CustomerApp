import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // Explicitly set Vite dev server port
    proxy: {
      '/api': {
        // Render backend
        target: 'https://backend-89ej.onrender.com',
        changeOrigin: true,
        secure: true, // Set to true for HTTPS
        // The proxy will forward /api/* to https://backend-89ej.onrender.com/api/*
        // So /api/auth/signin becomes https://backend-89ej.onrender.com/api/auth/signin
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, _res) => {
            console.error('❌ Proxy error:', err.message);
            console.error('❌ Failed request:', req.method, req.url);
            console.log('💡 Make sure Render backend is accessible: https://backend-89ej.onrender.com');
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            const targetUrl = `${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`;
            console.log('🔄 Proxying:', req.method, req.url, '→', targetUrl);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            const status = proxyRes.statusCode;
            const emoji = status >= 200 && status < 300 ? '✅' : status === 404 ? '❌' : '⚠️';
            console.log(`${emoji} Response:`, status, req.url);
            if (status === 404) {
              console.log('💡 404 - Check if the backend route exists:', req.url);
            }
          });
        },
      },
    },
  },
})

