// api-gateway/src/app.js
require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(express.json());
app.use(morgan("dev")); // Untuk logging di konsol gateway

// --- PATCH DIMULAI DI SINI ---
app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL, // Misalnya http://localhost:3001
    changeOrigin: true,
    // Ini memberitahu proxy untuk MEREWRITE path.
    // '^/api/users': '/api/users' berarti:
    // Jika path dimulai dengan /api/users, ganti dengan /api/users (efektif tidak menghapus prefix)
    pathRewrite: {
      "^/(.*)": "/api/users/$1",
      "^/": "/api/users",
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `[GW-User] Proxying ${req.method} ${req.url} to ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(
        `[GW-User] Received response from ${req.method} ${req.url}: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      console.error(
        `[GW-User] Proxy error for ${req.method} ${req.url}:`,
        err.code,
        err.message
      );
    },
  })
);
// --- PATCH BERAKHIR DI SINI ---

app.use(
  "/api/customers",
  createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/(.*)": "/api/customers/$1", // Tambahkan ini juga untuk konsistensi
      "^/": "/api/customers", // Tambahkan ini juga untuk konsistensi
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `[GW-Customer] Proxying ${req.method} ${req.url} to ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(
        `[GW-Customer] Received response from ${req.method} ${req.url}: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      console.error(
        `[GW-Customer] Proxy error for ${req.method} ${req.url}:`,
        err.code,
        err.message
      );
    },
  })
);

app.use(
  "/api/products",
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/(.*)": "/api/products/$1", // Tambahkan ini juga untuk konsistensi
      "^/": "/api/products", // Tambahkan ini juga
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `[GW-Product] Proxying ${req.method} ${req.url} to ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(
        `[GW-Product] Received response from ${req.method} ${req.url}: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      console.error(
        `[GW-Product] Proxy error for ${req.method} ${req.url}:`,
        err.code,
        err.message
      );
    },
  })
);

app.use(
  "/api/transactions",
  createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/(.*)": "/api/transactions/$1", // Tambahkan ini juga untuk konsistensi
      "^/": "/api/transactions", // Tambahkan ini juga
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `[GW-Transaction] Proxying ${req.method} ${req.url} to ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(
        `[GW-Transaction] Received response from ${req.method} ${req.url}: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      console.error(
        `[GW-Transaction] Proxy error for ${req.method} ${req.url}:`,
        err.code,
        err.message
      );
    },
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway for E-commerce Microservices");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(
    `Frontend can access all services via http://localhost:${PORT}/api/...`
  );
});
