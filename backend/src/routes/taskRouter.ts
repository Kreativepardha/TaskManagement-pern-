import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  searchTasks,
} from '../controllers/taskController';

const router = Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

router.get('/search', searchTasks);

export { router as taskRouter };
