const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Rutas
const commentRoutes = require('./src/routes/commentRoutes');
app.use('/api/comments', commentRoutes);

module.exports = app;
