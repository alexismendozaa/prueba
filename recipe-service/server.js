require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas
const recipeRoutes = require('./src/routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Recipe Service running on port ${PORT}`);
});
