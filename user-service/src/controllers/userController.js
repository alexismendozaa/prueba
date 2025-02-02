import User from '../models/User.js';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo perfil', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.name = req.body.name || user.name;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    await user.save();
    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando perfil', error });
  }
};

export const verifyAuthToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No autenticado' });

    const token = authHeader.split(' ')[1];
    const { data } = await axios.post('http://auth-service:4000/api/auth/validate', { token });

    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
