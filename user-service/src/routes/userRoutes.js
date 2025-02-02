import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { verifyAuthToken } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', verifyAuthToken, getUserProfile);
router.put('/profile', verifyAuthToken, updateUserProfile);

export default router;
