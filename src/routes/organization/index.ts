import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { OrganizationController } from '../../controllers/organization/organizationController';

const organizationRoutes = Router();

organizationRoutes.post('/create', asyncHandler(OrganizationController.create));

organizationRoutes.patch('/:id', asyncHandler(OrganizationController.update));

organizationRoutes.get('/:id', asyncHandler(OrganizationController.getByID))

export { organizationRoutes };