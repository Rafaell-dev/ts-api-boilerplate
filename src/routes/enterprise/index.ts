import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { EnterpriseController } from '../../controllers/enterprise/enterpriseController';

const enterpriseRoutes = Router();

enterpriseRoutes.post('/create', asyncHandler(EnterpriseController.create));

export { enterpriseRoutes };