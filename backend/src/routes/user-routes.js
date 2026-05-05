import express from 'express';
import { getUsers, updateUserRole } from '../controllers/users.js';
import { protect, authorize } from '../middleware/check-auth.js';

const router = express.Router();

// Protected routes
router.get('/', protect, getUsers);
router.put('/:id/role', protect, authorize, updateUserRole);

export default router;
