import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getStats
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateTask } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Apply auth protection middleware to all task routes
router.use(protect);

router.get('/stats', getStats);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;
