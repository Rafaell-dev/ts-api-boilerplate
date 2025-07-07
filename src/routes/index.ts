import { Router } from 'express';
import { authRoutes } from './auth';
import { enterpriseRoutes } from './enterprise';
import { userRoutes } from './user';
import { authMiddleware } from '../utils/middleware';
import { organizationRoutes } from './organization';

const routes = Router();

routes.use('/auth', authRoutes);

routes.use('/enterprise', authMiddleware, enterpriseRoutes);

routes.use('/user', authMiddleware, userRoutes);

routes.use('/organization', authMiddleware, organizationRoutes);

export default routes;