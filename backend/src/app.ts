import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma';
import authRoutes from './routes/auth.routes'
import { authMiddleware } from './middleware/auth.middleware';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/health', (_, res) => {
    res.json({status: 'ok'});
});

app.get('/db-test', async (_, res) => {
  const users = await prisma.user.findMany();
  res.json({users});
});

app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes);

app.get('/profile', authMiddleware, async (req, res) => {
  res.json({
    message: 'Protected data',
    userId: req.userId });
});



export default app;