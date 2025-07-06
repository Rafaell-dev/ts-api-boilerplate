import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { UserController } from '../../controllers/user/userController';

const userRoutes = Router();

userRoutes.post('/create', asyncHandler(UserController.create));

userRoutes.put('/:id', asyncHandler(UserController.update));

userRoutes.get('/list', asyncHandler(UserController.list));

userRoutes.get('/:id', asyncHandler(UserController.getById));

export { userRoutes };
