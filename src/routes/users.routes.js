import express from 'express';
import { getUser,createUser,updateUser,deleteUser,getUserById, activeInactive,getTasks } from '../controllers/users.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const userRouter = express.Router();

userRouter.get('/users', authMiddleware, getUser);
userRouter.post('/users', createUser);
userRouter.put('/users/:id', authMiddleware, updateUser);
userRouter.delete('/users/:id', authMiddleware, deleteUser);
userRouter.get('/users/:id', authMiddleware, getUserById);
userRouter.patch('/users/:id', authMiddleware, activeInactive);
userRouter.get('/:id/tasks', authMiddleware, getTasks);

export default userRouter;