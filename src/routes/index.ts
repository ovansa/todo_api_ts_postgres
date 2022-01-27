import { Router } from 'express';
import {
  addTodo,
  deleteTodo,
  getTodos,
  getTodoById,
  updateTodo,
} from '../controllers/index.controllers';

const router = Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.post('/todos', addTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;
