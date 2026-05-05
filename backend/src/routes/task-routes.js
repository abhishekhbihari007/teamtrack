import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getDashboardStats } from '../controllers/tasks.js';
import { protect } from '../middleware/check-auth.js';

const router = express.Router();

// All task routes are protected
router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/stats', getDashboardStats);

router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
