import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { EnterpriseController } from "../../controllers/enterprise/enterprise.controller";

const enterpriseRoutes = Router();

enterpriseRoutes.post("/create", asyncHandler(EnterpriseController.create))

export { enterpriseRoutes };