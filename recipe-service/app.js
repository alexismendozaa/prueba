const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Rutas
const recipeRoutes = require('./src/routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

module.exports = app;
