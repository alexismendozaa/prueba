import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Sequelize } from 'sequelize';  // Asegúrate de tener Sequelize importado
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();
const app = express();

// Configuración de la base de datos usando Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Base de datos
  process.env.DB_USER,    // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST,  // Host (Endpoint de RDS)
    dialect: 'postgres',        // Dialecto PostgreSQL
    port: 5432                  // Puerto de PostgreSQL
  }
);

app.use(cors());
app.use(express.json());

sequelize.authenticate()  // Verifica la conexión
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error en la conexión a la base de datos:', err));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Auth Service corriendo en el puerto ${PORT}`));
