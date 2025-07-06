import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { EnterpriseController } from '../../controllers/enterprise/enterpriseController';

const enterpriseRoutes = Router();

enterpriseRoutes.post('/create', asyncHandler(EnterpriseController.create));

enterpriseRoutes.put('/:id', asyncHandler(EnterpriseController.update));

enterpriseRoutes.get('/list', asyncHandler(EnterpriseController.list));

enterpriseRoutes.get('/:id', asyncHandler(EnterpriseController.getById));


export { enterpriseRoutes };