import express from 'express';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import morgan from 'morgan';
import 'dotenv/config'
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', usersRoutes)
app.use('/api', authRoutes)
app.use('/api', authMiddleware, tasksRoutes)

export default app;