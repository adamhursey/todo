import express from 'express';
import TodoContoller from '../todosControllers/todos';
import db from '../db/db';

const router = express.Router();

router.get('/api/v1/todos', TodoContoller.getAllTodos);
router.get('/api/v1/todos/:id', TodoContoller.getTodo);
router.post('/api/v1/todos', TodoContoller.createTodo);
router.delete('/api/v1/todos/:id', TodoContoller.deleteTodo);
router.put('/api/v1/todos/:id', TodoContoller.updateTodo);

export default router;
