import axios from 'axios';

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
