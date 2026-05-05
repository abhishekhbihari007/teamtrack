import express from 'express';
import { getMe, login, logout, signup } from '../controllers/auth.js';
import { protect } from '../middleware/check-auth.js';

const router = express.Router();

// Register and login routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;
