import { Router } from 'express';
import { authRoutes } from './auth';
import { enterpriseRoutes } from './enterprise';
import { userRoutes } from './user';
import { authMiddleware } from '../utils/middleware';

const routes = Router();

routes.use('/auth', authRoutes);

routes.use('/enterprise', authMiddleware, enterpriseRoutes);

routes.use('/user', authMiddleware, userRoutes);

export default routes;