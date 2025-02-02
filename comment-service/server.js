require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas
const commentRoutes = require('./src/routes/commentRoutes');
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
    console.log(`Comment Service running on port ${PORT}`);
});
