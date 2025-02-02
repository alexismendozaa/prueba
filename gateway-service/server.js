require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Definir proxies para cada microservicio
app.use('/api/auth', createProxyMiddleware({ target: process.env.AUTH_SERVICE_URL, changeOrigin: true }));
app.use('/api/users', createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
app.use('/api/recipes', createProxyMiddleware({ target: process.env.RECIPE_SERVICE_URL, changeOrigin: true }));
app.use('/api/comments', createProxyMiddleware({ target: process.env.COMMENT_SERVICE_URL, changeOrigin: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});
