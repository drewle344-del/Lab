// setupProxy.js - Proxy API requests to Express server (for Vite dev)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    })
  );
};
