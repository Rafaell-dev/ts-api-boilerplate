import { Router } from "express";
import { authRoutes } from "./auth";
import { enterpriseRoutes } from "./enterprise";
import { authMiddleware } from "../utils/middleware";

const routes = Router();

routes.use("/auth", authRoutes)

routes.use("/enterprise", authMiddleware, enterpriseRoutes);

export default routes;