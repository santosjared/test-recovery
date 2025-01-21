import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTask, taskDone } from '../controllers/tasks.controller.js';

const tasksRoutes = Router();

tasksRoutes.get('/tasks', getTasks);
tasksRoutes.post('/tasks', createTask);
tasksRoutes.put('/tasks/:id', updateTask);
tasksRoutes.delete('/tasks/:id', deleteTask);
tasksRoutes.get('/tasks/:id', getTask);
tasksRoutes.patch('/tasks/:id', taskDone);

export default tasksRoutes;