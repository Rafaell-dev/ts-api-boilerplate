import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { LoginController } from '../../controllers/auth/loginController';

const authRoutes = Router();

authRoutes.use('/login', asyncHandler(LoginController.manipular));

export { authRoutes };